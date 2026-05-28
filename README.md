# Robin Clinic

Static one-page brochure website for `robinclinic.co.uk`.

## Scripts

- `npm run dev` — serve `src/` locally at `http://localhost:5173`
- `npm test` — run static content/build checks
- `npm run build` — build the GitHub Pages output into `dist/`

## Deployment

GitHub Actions runs tests and builds the site on pull requests and pushes to `main`. Pushes to `main` deploy `dist/` to GitHub Pages.

The custom domain is configured in GitHub Pages settings and mirrored by `CNAME` in this repository:

```text
robinclinic.co.uk
```

## DNS

For the apex domain, point `robinclinic.co.uk` at GitHub Pages with these A records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www.robinclinic.co.uk`, use a CNAME record pointing to:

```text
charlesbannister.github.io
```
