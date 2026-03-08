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
