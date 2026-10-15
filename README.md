# Source Tester

A standalone Endgame compatibility checklist for PIXL. Hosted at https://cydpixl.github.io/source-tester/.

- 40 documented Endgame embed endpoints and 13 additional candidates whose Endgame endpoints were not verified.
- Sandbox playback observed first, followed by unverified sandbox tests and then normal/direct tests. Ranking is based on the earlier October 15, 2026 browser checks, not the visitor's network.
- Each test opens in a new tab. Normal and direct modes are also available; normal embeds do not restrict provider pop-ups or redirects.
- Separate manual results and notes for sandbox, normal, and direct modes. Local storage shares updates across this site's tabs without an opener relationship.
- Search, source groups, result filters, and JSON export. No accounts, backend, analytics, media proxy, or service worker.
- The tool does not change or override network filtering. A visitor must inspect and record a filter block themselves. A frame load is not treated as playback success.

Serve the directory with any static HTTP server. GitHub Pages publishes the root of `main`. Relative assets and hash routes support a project-site path without a custom 404 handler.

The iframe sandbox allows scripts, same-origin behavior, and presentation; it omits popup and top-navigation permissions. Source HTML remains on the provider's original origin. Embedded ads can still appear within the frame.

The initial dataset intentionally retains earlier failures and unverified candidates. No browser result is a guarantee of availability, compatibility, or access on another device/network.

Film metadata and poster: TMDB. Source documentation links are included with each entry.
