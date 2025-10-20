# Vercel Deployment Fix

## Issue
Vercel deployment started failing on 2025-10-20 with the error:
```
Build Failed
An unexpected error happened when running this build.
```

The build logs showed that `npm install` was hanging/timing out with deprecated package warnings.

## Root Cause
The `vercel` CLI package (v33.0.0) in devDependencies was:
1. Outdated and using many deprecated packages
2. Causing `npm install` to hang/timeout during the build process
3. Not actually needed for Vercel deployment (only for local development)

## Solution
Removed the unnecessary `vercel` CLI dependency from `package.json`:

### Before
```json
"devDependencies": {
  "vercel": "^33.0.0"
}
```

### After
```json
"devDependencies": {}
```

Also updated `.vercelignore` to exclude:
- `package-lock.json`
- `node_modules`

## Why This Works
1. **No External Dependencies Required**: The serverless functions in `/api` only require local data files:
   - `api/boxoffice.js` → `api-server/data/boxoffice.js`
   - `api/movies.js` → `api-server/data/movies.js`
   - `api/genres.js` → `api-server/data/genres.js`

2. **Vercel CLI Not Needed for Deployment**: 
   - Vercel CLI is only for local development (`vercel dev`)
   - Vercel's platform handles deployment automatically
   - Serverless functions are detected and deployed without the CLI

3. **Fast Installation**: 
   - `npm install` now completes in <1 second
   - No deprecated packages to download
   - No timeout issues

## Testing
```bash
# Test API modules load correctly
node -e "require('./api/boxoffice.js'); console.log('OK')"
node -e "require('./api/movies.js'); console.log('OK')"
node -e "require('./api/genres.js'); console.log('OK')"

# Test npm install
npm install  # Should complete in <1 second

# Test build script
npm run build  # Should run successfully
```

## For Local Development
If you need to run the API locally for development:

### Option 1: Use Vercel CLI (install globally)
```bash
npm install -g vercel
vercel dev
```

### Option 2: Use a simple Node.js server
```bash
# Create a simple server for testing
node -e "
const http = require('http');
const boxoffice = require('./api/boxoffice.js');
http.createServer(async (req, res) => {
  await boxoffice(req, res);
}).listen(3000, () => console.log('API running on http://localhost:3000'));
"
```

## Future Prevention
- Keep dependencies minimal for serverless functions
- Avoid adding build tools as dependencies if not needed for deployment
- Use `.vercelignore` to exclude unnecessary files
- Test deployments after adding new dependencies
