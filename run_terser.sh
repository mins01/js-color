# before: npm install -g ascjs
# ascjs src/Color.js src/Color.cjs

# before: npm install terser -g
npx terser src/colorRegExps.js -o dist/colorRegExps.js --compress
npx terser src/ColorConverter.js -o dist/ColorConverter.js --compress
npx terser src/Color.js -o dist/Color.js --compress
npx terser src/index.js -o dist/index.js --compress
#npx terser src/Color.cjs -o dist/Color.cjs
#npx terser src/Color.cjs -o dist/Color.cjs

# test
node test/test.Color.js 1
node test/test.Color.js 2
#node test/test.Color.cjs 1
#node test/test.Color.cjs 2