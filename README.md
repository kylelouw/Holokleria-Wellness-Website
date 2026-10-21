# Holokleria-Wellness-Website

Element names:
mainb - main body
aboutcf - about card front

Fix font
Fix cards
Add social media content - footer

## Scroll reveal animation

Add the `slide-in` class to a complete content unit—such as a section heading,
card, or related panel—to reveal it from the bottom as it enters the viewport.
Use the same pattern across sections rather than animating individual text
elements. The shared `js/main.js` observer reveals each element once. The
animation is disabled for visitors who prefer reduced motion, and content
remains visible when JavaScript is unavailable.

```html
<h2 class="slide-in">A heading that slides into view</h2>
```

## Client-provided accounts

Before completing the contact form and online store setup, the client needs to provide:

- **Formspree:** A client-owned account and the form endpoint (or collaborator access) so contact submissions can be configured.
- **Shopify:** A client-owned Shopify store and collaborator access so the storefront can be connected and configured.
- **Social media:** The Facebook and Instagram page URLs once the client has created them, so the footer links can be updated.

Do not request or store the client's account passwords in this repository.
