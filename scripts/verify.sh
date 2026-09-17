#!/bin/bash
# Pre-commit verification script
# Run this before pushing to GitHub to catch issues early

set -e

echo "🔍 Verifying project for deployment..."
echo ""

cd "$(dirname "$0")/.."
PROJECT_DIR=$(pwd)

# 1. Check required files exist
echo "1️⃣ Checking required files..."
REQUIRED_FILES=(
  "package.json"
  "next.config.ts"
  "tsconfig.json"
  ".github/workflows/deploy.yml"
  "public/CNAME"
  "public/profile.jpg"
  "public/favicon.svg"
  "src/lib/data.ts"
  "src/lib/articles.ts"
  "src/app/page.tsx"
  "src/app/blog/page.tsx"
  "content/articles/behavioral-economics-intro.md"
)

MISSING=0
for f in "${REQUIRED_FILES[@]}"; do
  if [ -f "$f" ]; then
    echo "  ✅ $f"
  else
    echo "  ❌ $f (MISSING)"
    MISSING=$((MISSING+1))
  fi
done

if [ $MISSING -gt 0 ]; then
  echo ""
  echo "❌ $MISSING required file(s) missing. Aborting."
  exit 1
fi

# 2. Verify CNAME content
echo ""
echo "2️⃣ Verifying CNAME..."
CNAME_CONTENT=$(cat public/CNAME | tr -d '[:space:]')
if [ "$CNAME_CONTENT" = "zafarimoghaddam.ir" ]; then
  echo "  ✅ CNAME = zafarimoghaddam.ir"
else
  echo "  ❌ CNAME = '$CNAME_CONTENT' (expected 'zafarimoghaddam.ir')"
  exit 1
fi

# 3. Verify next.config has output: export
echo ""
echo "3️⃣ Verifying next.config.ts..."
if grep -q 'output: "export"' next.config.ts; then
  echo "  ✅ output: export is set"
else
  echo "  ❌ output: export NOT found in next.config.ts"
  exit 1
fi
if grep -q 'unoptimized: true' next.config.ts; then
  echo "  ✅ images.unoptimized is true"
else
  echo "  ❌ images.unoptimized NOT found (needed for static export)"
  exit 1
fi

# 4. Verify overflow-x hidden is set (جلوگیری از اسکرول افقی)
echo ""
echo "4️⃣ Verifying overflow-x hidden in CSS..."
if grep -q 'overflow-x: hidden' src/app/globals.css; then
  echo "  ✅ overflow-x: hidden is set"
else
  echo "  ⚠️  overflow-x: hidden NOT found — ممکن است اسکرول افقی ایجاد شود"
fi

# 5. Install dependencies
echo ""
echo "5️⃣ Installing dependencies..."
bun install 2>&1 | tail -3

# 6. Run build
echo ""
echo "6️⃣ Running build..."
rm -rf out .next
if bun run build 2>&1 | tail -20; then
  if [ -d "out" ] && [ -f "out/index.html" ]; then
    echo "  ✅ Build succeeded, out/index.html exists"
  else
    echo "  ❌ Build completed but out/index.html not found"
    exit 1
  fi
else
  echo "  ❌ Build failed"
  exit 1
fi

# 7. Check CNAME is in output
echo ""
echo "7️⃣ Verifying CNAME in build output..."
if [ -f "out/CNAME" ]; then
  echo "  ✅ out/CNAME exists: $(cat out/CNAME)"
else
  echo "  ⚠️  out/CNAME not found (will need manual fix)"
fi

# 8. Check at least one article is generated
echo ""
echo "8️⃣ Verifying blog articles generated..."
ARTICLE_COUNT=$(ls out/blog/ 2>/dev/null | grep -v "^$\|index.html\|__next" | wc -l | tr -d ' ')
if [ "$ARTICLE_COUNT" -ge 5 ]; then
  echo "  ✅ $ARTICLE_COUNT articles generated"
else
  echo "  ⚠️  Only $ARTICLE_COUNT articles found (expected ≥5)"
fi

echo ""
echo "🎉 All checks passed! Ready to commit and push."
echo ""
echo "Next steps:"
echo "  git add ."
echo "  git commit -m \"<your message>\""
echo "  git push origin main"
