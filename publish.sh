npm run prepublish
npm version patch
export TAG=$(git describe --tags --abbrev=0)
git tag -m "$TAG" $TAG
git push --follow-tags
