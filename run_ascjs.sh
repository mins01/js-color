# before: npm install -g ascjs

ascjs src/Color.js src/Color.cjs

# npm install terser -g
npx terser src/Color.js -o dist/Color.min.js
npx terser src/Color.cjs -o dist/Color.min.cjs
