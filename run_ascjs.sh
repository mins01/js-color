# before: npm install -g ascjs

ascjs src/Color.js src/Color.cjs

# npm install terser -g
npx terser src/colorRegExps.js -o dist/colorRegExps.js
npx terser src/ColorConverter.js -o dist/ColorConverter.js
npx terser src/Color.js -o dist/Color.js
#npx terser src/Color.cjs -o dist/Color.cjs
#npx terser src/Color.cjs -o dist/Color.cjs

# test
node test/test.Color.js 1
node test/test.Color.js 2
#node test/test.Color.cjs 1
#node test/test.Color.cjs 2