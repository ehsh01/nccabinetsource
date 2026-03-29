# Staging & Production Deployment

## Branch Strategy

| Branch    | Purpose                          | Deploys To   |
|-----------|----------------------------------|--------------|
| `staging` | Test changes before going live   | Staging URL  |
| `main`    | Live production site             | Production   |

## Workflow

### 1. Develop & Test on Staging

```bash
# Create/switch to staging branch
git checkout staging

# Make your changes, then commit and push
git add .
git commit -m "Your changes"
git push origin staging
```

Your hosting platform deploys `staging` → staging URL. Test there.

### 2. Promote to Production

When staging looks good:

```bash
# Merge staging into main
git checkout main
git merge staging
git push origin main
```

Your hosting platform deploys `main` → production URL.

### 3. Keep Staging in Sync

After promoting to production:

```bash
git checkout staging
git merge main
git push origin staging
```

## Initial Setup

If you don't have a `staging` branch yet:

```bash
git checkout -b staging
git push -u origin staging
```

## Hosting Configuration

Configure your hosting (Vercel, Netlify, Replit, GitHub Pages, etc.):

- **Production**: Deploy from `main` branch
- **Staging**: Deploy from `staging` branch (or enable preview deployments)

Most platforms auto-detect branches. Connect your repo and set:
- Production branch: `main`
- Staging/Preview: `staging` (or all branches for preview URLs)

---

## GitHub Pages Setup

This project deploys to GitHub Pages when you push to `main`.

### 1. Enable GitHub Pages

1. Go to your repo: **https://github.com/ehsh01/nccabinetsource**
2. **Settings** → **Pages**
3. Under **Build and deployment**:
   - **Source**: GitHub Actions

### 2. Deploy

Push to `main` and the workflow will build and deploy:

```bash
git checkout main
git merge staging   # if promoting from staging
git push origin main
```

### 3. Custom Domain (www.nccabinetsource.com)

The `CNAME` file is set to `www.nccabinetsource.com`. To use your domain:

1. In **Settings** → **Pages** → **Custom domain**, enter `www.nccabinetsource.com`
2. In your DNS provider, add:
   - **CNAME** record: `www` → `ehsh01.github.io`
   - Or **A** records for apex (nccabinetsource.com): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

3. Wait for DNS to propagate (up to 48 hours)
4. GitHub will provision an SSL certificate automatically
