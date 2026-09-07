import { MapPinIcon } from "lucide-react";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { EngineerServiceAreaForm } from "@/components/store/engineer/engineerServiceAreaForm/engineerServiceAreaForm";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";
import { type City, type Province } from "@/types/store/registration.types";

type EngineerServiceAreasPageProps = {
  workspace: EngineerWorkspace;
  provinces: readonly Province[];
  cities: readonly City[];
};

export function EngineerServiceAreasPage({
  workspace,
  provinces,
  cities,
}: EngineerServiceAreasPageProps) {
  const area = workspace.serviceArea;

  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.serviceAreas}
        description="استان و شهر اصلی ارائه خدمت. شعاع جغرافیایی در محصول فعلی تعریف نشده است."
      />

      <div className="flex items-start gap-4 rounded-3xl border border-primary/10 bg-primary-subtle/50 p-5 sm:p-6">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <MapPinIcon aria-hidden="true" className="size-5" />
        </span>

        <div className="min-w-0">
          <p className="type-body font-semibold text-foreground">
            شهر اصلی فعلی: {area.cityName}، {area.provinceName}
          </p>

          {area.nearbyCities.length > 0 ? (
            <p className="mt-2 type-body-sm leading-relaxed text-foreground-muted">
              شهرهای مجاور:{" "}
              {area.nearbyCities.map((city) => city.name).join("، ")}
            </p>
          ) : null}
        </div>
      </div>

      <EngineerServiceAreaForm
        area={area}
        provinces={provinces}
        cities={cities}
      />
    </div>
  );
}
