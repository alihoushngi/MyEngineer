# Careers

Purpose: display real active job opportunities and receive applications. Routes: `/careers`, `/careers/[id]`. No original client HTML reference.

## Source and data

- `app/(shop)/careers/page.tsx`
- `app/(shop)/careers/[id]/page.tsx`
- `components/store/content/careersAndFormsPages/careersAndFormsPages.tsx`
- `components/store/content/careerApplyForm/careerApplyForm.tsx`
- `services/content-service/content-service.ts`

Listings use `listCareers`; details use `getCareer` and unknown IDs return not-found. Existing application fields, upload/submission and validation remain unchanged.

## Preserved order and layout

Listing: breadcrumb → H1/intro → load failure, honest empty state, or job grid. Grid is one column on phones, two from `sm`, three from `xl`.

Detail: breadcrumb → optional image → job type → H1 → location/salary when provided → backend description → application form. Existing `max-w-3xl` reading width and responsive media remain. No sections added/removed/redesigned.

Listing cards have H2 job titles. Decorative repeated images use empty alt; sizes match responsive columns. Details prioritize the cover and reserve its ratio. Metadata derives from actual job content. No JobPosting claims, salary or business facts are invented. Live application submissions are not triggered during visual QA.
