# Contact

Purpose: submit a public message and guide users to account support for follow-up. Route: `/contact`. No original client HTML reference.

## Source and data

- `app/(shop)/contact/page.tsx`
- `components/store/contact/contactPage/contactPage.tsx`
- `components/store/contact/contactMessageForm/contactMessageForm.tsx`

Existing `ContactMessageForm` validation and service submission stay unchanged. The page links the current about route and explains support in the account. It uses supplied content, not invented address/business details.

## Preserved order and layout

Breadcrumb → introduction/H1 and about link → contact form. Mobile is one column; desktop `lg+` keeps the `.9fr / 1.1fr` split and existing spacing. No new sections and no redesign. Existing pending/error/success behavior, labels and input rules remain authoritative.

Keep page-specific title/description/canonical, one H1, bounded container and natural RTL wrapping. Production indexing remains blocked by staging gates. Form functionality requires the configured API; no live message is sent as part of presentation QA.
