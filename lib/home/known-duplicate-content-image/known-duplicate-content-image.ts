// ponytail: hide only API image paths verified byte-identical on 2026-10-24; remove entries after backend media is replaced.
const duplicateImagePaths = new Set([
  "/public/front/upload/services/1/1.jpg",
  "/public/front/upload/services/2/2.jpg",
  "/public/front/upload/services/8/8.jpg",
  "/public/front/upload/services/9/9.jpg",
  "/public/front/upload/services/10/10.jpg",
  "/public/front/upload/services/11/11.jpg",
  "/public/front/upload/services/12/12.jpg",
  "/public/front/upload/services/13/13.jpg",
  "/public/front/upload/services/15/15.jpg",
  "/public/front/upload/services/16/16.jpg",
  "/public/front/upload/users/48/profile/48.jpg",
  "/public/front/upload/users/68/profile/68.jpg",
  "/public/front/upload/users/84/profile/84.jpg",
  "/public/front/upload/users/85/profile/85.jpg",
  "/public/front/upload/users/102/profile/102.jpg",
  "/public/front/upload/users/134/profile/134.jpg",
  "/front/upload/testimonials/1/1.jpg",
  "/front/upload/testimonials/2/2.jpg",
]);

export function isKnownDuplicateContentImage(
  src: string | null | undefined,
): boolean {
  if (!src) return false;

  const sourcePath = src.split(/[?#]/, 1)[0] ?? "";
  return [...duplicateImagePaths].some((path) => sourcePath.endsWith(path));
}
