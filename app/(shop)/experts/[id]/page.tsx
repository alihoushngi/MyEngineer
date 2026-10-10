import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ExpertProfilePage } from "@/components/store/expert/expertProfilePage/expertProfilePage";
import {
  isDevelopmentExpertPreviewId,
  toExpertSharePath,
} from "@/lib/experts/expert-profile/expert-profile";
import { toRequestExpertOption } from "@/lib/marketplace/to-request-expert-option/to-request-expert-option";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import { listCatalogCities } from "@/services/catalog-service/catalog-service";
import {
  getExpertCardData,
  getExpertProfile,
} from "@/services/expert-service/expert-service";
import {
  getCurrentSavedExpertIds,
  getUserWorkspace,
} from "@/services/user-account-service/user-account-service";
import { isUserAuthenticated } from "@/services/user-auth-service/user-access-service";

type ExpertPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ExpertPageProps): Promise<Metadata> {
  const { id } = await params;
  const expert = await getExpertProfile(id);

  if (!expert) {
    return notFoundMetadata;
  }

  return {
    title: `${expert.name} | ${expert.profession}`,
    description: expert.shortIntroduction ?? expert.profession,
    alternates: {
      canonical: toExpertSharePath(id),
    },
    openGraph: {
      title: expert.name,
      description: expert.shortIntroduction ?? expert.profession,
      type: "profile",
      locale: "fa_IR",
      siteName: "مهندس من",
      ...(expert.avatarSrc
        ? { images: [{ url: expert.avatarSrc, alt: expert.name }] }
        : {}),
    },
  };
}

export default async function ExpertRoutePage({ params }: ExpertPageProps) {
  const { id } = await params;
  const [expert, userAuthenticated, savedIds, cities, card, workspace] =
    await Promise.all([
      getExpertProfile(id),
      isUserAuthenticated(),
      getCurrentSavedExpertIds(),
      listCatalogCities(),
      getExpertCardData(id),
      getUserWorkspace(),
    ]);

  if (!expert) {
    notFound();
  }

  const expertOption = toRequestExpertOption(
    card ?? {
      id: expert.id,
      name: expert.name,
      href: toExpertSharePath(expert.id),
      city: expert.city,
    },
    cities,
  );

  const eligibleReviewRequestId = workspace?.requests.find(
    (request) =>
      request.expertId === expert.id &&
      request.status === "closed" &&
      !request.reviewId,
  )?.id;

  return (
    <ExpertProfilePage
      expert={expert}
      expertOption={expertOption}
      cities={cities}
      isUserAuthenticated={userAuthenticated}
      isSaved={savedIds.includes(expert.id)}
      eligibleReviewRequestId={eligibleReviewRequestId}
      isDevelopmentPreview={
        process.env.NODE_ENV !== "production" &&
        isDevelopmentExpertPreviewId(id)
      }
    />
  );
}
