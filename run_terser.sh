# before: npm install -g ascjs
# ascjs src/Color.js src/Color.cjs

# before: npm install terser -g
npx terser src/colorRegExps.js -o dist/colorRegExps.js --compress
npx terser src/namedColors.js -o dist/namedColors.js --compress
npx terser src/ColorConverter.js -o dist/ColorConverter.js --compress
npx terser src/ColorExporter.js -o dist/ColorExporter.js --compress
npx terser src/ColorParser.js -o dist/ColorParser.js --compress
npx terser src/Color.js -o dist/Color.js --compress
npx terser src/jsColor.js -o dist/jsColor.js --compress
#npx terser src/Color.cjs -o dist/Color.cjs
#npx terser src/Color.cjs -o dist/Color.cjs

# test
node test/test.Color.js
node test/test.ColorConverter.js
node test/test.ColorExporter.js
node test/test.ColorParser.js
# node test/test.ColorToMethods.js







