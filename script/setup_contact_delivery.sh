#!/usr/bin/env bash
# Optional: add server-side email delivery (Web3Forms) so visitors don't need an email app.
# The site works without this: the contact form opens a mail draft to support@nccabinetsource.com.
set -euo pipefail
cd "$(dirname "$0")/.."

echo ""
echo "=== Optional: Web3Forms (silent submit from the website) ==="
echo "1. We open web3forms.com — sign up with an email you can check."
echo "2. Create a form; set 'Send submissions to' to: support@nccabinetsource.com"
echo "3. Copy the Access Key."
echo ""

if command -v open >/dev/null 2>&1; then
  open "https://web3forms.com"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "https://web3forms.com"
fi

read -r -p "Paste your Web3Forms Access Key (or press Enter to skip): " KEY
KEY="${KEY// }"
if [[ -z "$KEY" ]]; then
  echo "Skipped. The contact form still works via the visitor's email app."
  exit 0
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI: https://cli.github.com/"
  echo "Or add the secret manually: Repo → Settings → Secrets → Actions"
  echo "Name: VITE_WEB3FORMS_ACCESS_KEY   Value: (your key)"
  exit 1
fi

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || true)
if [[ -z "$REPO" ]]; then
  REPO="ehsh01/nccabinetsource"
fi

gh secret set VITE_WEB3FORMS_ACCESS_KEY --body "$KEY" --repo "$REPO"
echo ""
echo "Secret saved on $REPO. Push to main (or re-run the Deploy workflow) to rebuild the site."
