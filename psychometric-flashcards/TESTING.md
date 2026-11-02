# Verification

Verified on 2026-11-02:

- Five Node tests passed: seed deck validity, all spaced repetition intervals and cap, failed recall reset and exact due boundary, backup validation/round trip, immutable scheduling and local dates.
- Browser at 390 × 844: no horizontal overflow; flip and known answer; progress survives reload.
- Added a word, edited its meaning, and deleted it through the interface.
- English deck and forgotten answer exercised.
- Service worker controlled the page and populated its cache; page reloaded successfully with browser networking disabled.
- Workspace diagnostics reported no errors.

Physical iPhone Safari installation has not been tested. It requires publishing the static files at an HTTPS address and using Safari → Share → Add to Home Screen. No deployment was performed.

Tests run with Node 24.22.1 bundled with VS Code because standalone Node was not installed in this environment. Standard Node LTS works with the supplied npm commands.
