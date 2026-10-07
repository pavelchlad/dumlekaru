This is static HTML + CSS design for the Dum Lekaru project.

## HTML validation

Install dependencies and enable the local pre-push check once after cloning:

```sh
npm ci
git config core.hooksPath .githooks
```

The hook runs `npm run validate:html` before every push. The same check runs in
GitHub Actions for pull requests and pushes to `gh-pages`. It validates all
HTML files and rejects the literal `[...]` truncation marker.
