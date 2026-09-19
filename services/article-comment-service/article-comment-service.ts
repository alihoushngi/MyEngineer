/**
 * Article comments — live GET/POST /articles/{blog}/comments when apiBaseUrl.
 */
import {
  type ArticleComment,
  type SubmitArticleCommentInput,
} from "@/types/store/article.types";
import { env } from "@/lib/env/env";
import { throwApiUnavailable } from "@/lib/api/throw-api-unavailable/throw-api-unavailable";
import { mockArticleComments } from "@/lib/mock-data/article-comments-mock-data/article-comments-mock-data";
import { articleCommentSchema } from "@/lib/validation/article-comment/article-comment.schema";
import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet, httpPost } from "@/lib/api/http-client/http-client";

const UNAVAILABLE_MESSAGE =
  "ارسال نظر هنوز به سرویس متصل نیست. بعداً دوباره تلاش کنید.";

type BackendArticleComment = {
  id: number;
  article_id?: number;
  author_name?: string;
  body?: string;
  status?: string;
  created_at_label?: string;
};

function mapArticleComment(
  comment: BackendArticleComment,
  fallbackArticleId: string,
): ArticleComment {
  return {
    id: String(comment.id),
    articleId:
      comment.article_id != null
        ? String(comment.article_id)
        : fallbackArticleId,
    authorName: comment.author_name?.trim() || "کاربر",
    body: comment.body?.trim() || "",
    createdAtLabel: comment.created_at_label ?? "",
  };
}

export async function listArticleComments(
  articleId: string,
): Promise<readonly ArticleComment[]> {
  if (env.apiBaseUrl) {
    try {
      const envelope = await httpGet<
        ApiEnvelope<readonly BackendArticleComment[]>
      >(`/articles/${encodeURIComponent(articleId)}/comments`, {
        next: { revalidate: 60 },
      });
      return unwrapApiData(envelope).map((comment) =>
        mapArticleComment(comment, articleId),
      );
    } catch {
      return [];
    }
  }

  if (!env.useMockData) {
    return [];
  }

  return mockArticleComments.filter(
    (comment) => comment.articleId === articleId,
  );
}

export async function submitArticleComment(
  input: SubmitArticleCommentInput,
): Promise<ArticleComment> {
  const parsed = await articleCommentSchema.validate(
    {
      authorName: input.authorName,
      phone: input.phone,
      body: input.body,
    },
    { abortEarly: true },
  );

  if (env.apiBaseUrl) {
    const envelope = await httpPost<ApiEnvelope<BackendArticleComment>>(
      `/articles/${encodeURIComponent(input.articleId)}/comments`,
      {
        body: {
          author_name: parsed.authorName,
          phone: parsed.phone,
          body: parsed.body,
        },
      },
    );

    return mapArticleComment(unwrapApiData(envelope), input.articleId);
  }

  if (!env.useMockData) {
    throwApiUnavailable(UNAVAILABLE_MESSAGE);
  }

  return {
    id: `cmt-local-${Date.now()}`,
    articleId: input.articleId,
    authorName: parsed.authorName,
    body: parsed.body,
    createdAtLabel: "همین حالا",
  };
}
