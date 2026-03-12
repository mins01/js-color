# before: npm install -g ascjs
# ascjs src/Color.js src/Color.cjs

# before: npm install terser -g
npx terser src/colorRegExps.js -o ../dist/v1/colorRegExps.js --compress
npx terser src/namedColors.js -o ../dist/v1/namedColors.js --compress
npx terser src/ColorConverter.js -o ../dist/v1/ColorConverter.js --compress
npx terser src/ColorExporter.js -o ../dist/v1/ColorExporter.js --compress
npx terser src/ColorParser.js -o ../dist/v1/ColorParser.js --compress
npx terser src/Color.js -o ../dist/v1/Color.js --compress
npx terser src/jsColor.js -o ../dist/v1/jsColor.js --compress
#npx terser src/Color.cjs -o ../dist/v1/Color.cjs
#npx terser src/Color.cjs -o ../dist/v1/Color.cjs

# test
node test/test.Color.js
node test/test.ColorConverter.js
node test/test.ColorExporter.js
node test/test.ColorParser.js
# node test/test.ColorToMethods.js







