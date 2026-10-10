# Accessibility

The existing Persian RTL document, skip link, responsive dialogs and keyboard focus behavior are retained. New presentation changes are local to in-scope page content.

## Content requirements

- One meaningful page H1; sections use H2, subgroups/cards use appropriate H3/H4. Heading levels describe hierarchy, not font size.
- Use sections, articles, lists and breadcrumb navigation; decorative icons are `aria-hidden` and decorative media has empty alt. Meaningful portfolio/article/service images have useful Persian alt.
- Links navigate; buttons perform actions. Keep accessible names, visible focus indicators and keyboard operation.
- Keep form labels, errors, `aria-describedby`, validation and pending/error/retry states. Do not alter protected authentication forms.
- Result filters preserve URL state and readable active chips. Empty and failure states explain recovery without fabricated content.
- Existing Accordion/Dialog/Drawer primitives provide interaction semantics; reuse them without changing global primitives.
- Wrap long Persian text, keep reading width and spacing, and provide LTR islands for phone numbers/codes.
- Keep 44px touch targets where local controls are changed. Do not infer contrast from color names: inspect actual foreground/background pairs.
- Respect `prefers-reduced-motion`: avoid required autoplay, remove local movement under reduced motion and keep state independent of animation.

No new general accessibility dependency is added. Global CSS, Header, Footer, Login and Registration remain protected. Automated checks do not substitute for keyboard, screen-reader or real-device review. Executed verification and remaining limits are recorded in [testing and QA](testing-and-qa.md).
