import ColorParser from "../src/ColorParser.js";

const assert = (label, result, expected) => {
  const pass = JSON.stringify(result) === JSON.stringify(expected);
  console.log(pass ? '[PASS]' : '[FAIL]', label);
  if (!pass) {
    console.log('  expected:', JSON.stringify(expected));
    console.log('  got:     ', JSON.stringify(result));
  }
};

// --- hex3 ---
assert('#f00', ColorParser.parse('#f00'), { type: 'hex', value: { r: 255, g: 0, b: 0 } });
assert('#abc', ColorParser.parse('#abc'), { type: 'hex', value: { r: 170, g: 187, b: 204 } });

// --- hex4 ---
assert('#f00a', ColorParser.parse('#f00a'), { type: 'hexa', value: { r: 255, g: 0, b: 0, a: 170 / 255 } });
assert('#abcd', ColorParser.parse('#abcd'), { type: 'hexa', value: { r: 170, g: 187, b: 204, a: 221 / 255 } });

// --- hex6 ---
assert('#ff0000', ColorParser.parse('#ff0000'), { type: 'hex', value: { r: 255, g: 0, b: 0 } });
assert('#c9791f', ColorParser.parse('#c9791f'), { type: 'hex', value: { r: 201, g: 121, b: 31 } });

// --- hex8 ---
assert('#ff000080', ColorParser.parse('#ff000080'), { type: 'hexa', value: { r: 255, g: 0, b: 0, a: 128 / 255 } });
assert('#c9791f1f', ColorParser.parse('#c9791f1f'), { type: 'hexa', value: { r: 201, g: 121, b: 31, a: 31 / 255 } });

// --- rgb ---
assert('rgb(255, 0, 0)', ColorParser.parse('rgb(255, 0, 0)'), { type: 'rgb', value: { r: 255, g: 0, b: 0 } });
assert('rgb(201, 121, 31)', ColorParser.parse('rgb(201, 121, 31)'), { type: 'rgb', value: { r: 201, g: 121, b: 31 } });

// --- rgb with alpha ---
assert('rgb(255, 0, 0, 0.5)', ColorParser.parse('rgb(255, 0, 0, 0.5)'), { type: 'rgba', value: { r: 255, g: 0, b: 0, a: 0.5 } });

// --- rgba ---
assert('rgba(255, 0, 0, 1)', ColorParser.parse('rgba(255, 0, 0, 1)'), { type: 'rgba', value: { r: 255, g: 0, b: 0, a: 1 } });
assert('rgba(201, 121, 31, 0.123)', ColorParser.parse('rgba(201, 121, 31, 0.123)'), { type: 'rgba', value: { r: 201, g: 121, b: 31, a: 0.123 } });

// --- hsl ---
assert('hsl(120, 50%, 50%)', ColorParser.parse('hsl(120, 50%, 50%)'), { type: 'hsl', value: { h: 120, s: 0.5, l: 0.5 } });
assert('hsl(31.76, 73.28%, 45.49%)', ColorParser.parse('hsl(31.76, 73.28%, 45.49%)'), { type: 'hsl', value: { h: 31.76, s: 0.7328, l: 0.4549 } });

// --- hsl with alpha ---
assert('hsl(120, 50%, 50%, 0.8)', ColorParser.parse('hsl(120, 50%, 50%, 0.8)'), { type: 'hsla', value: { h: 120, s: 0.5, l: 0.5, a: 0.8 } });

// --- hsla ---
assert('hsla(31.76, 73.28%, 45.49%, 0.123)', ColorParser.parse('hsla(31.76, 73.28%, 45.49%, 0.123)'), { type: 'hsla', value: { h: 31.76, s: 0.7328, l: 0.4549, a: 0.123 } });

// --- cmyk ---
assert('cmyk(0%, 40%, 85%, 21%)', ColorParser.parse('cmyk(0%, 40%, 85%, 21%)'), { type: 'cmyk', value: { c: 0, m: 0.4, y: 0.85, k: 0.21 } });

// --- cmyka ---
assert('cmyka(0%, 40%, 85%, 21%, 0.123)', ColorParser.parse('cmyka(0%, 40%, 85%, 21%, 0.123)'), { type: 'cmyka', value: { c: 0, m: 0.4, y: 0.85, k: 0.21, a: 0.123 } });

// --- whitespace ---
assert('spaces', ColorParser.parse('  rgb( 255 , 0 , 0 )  '), { type: 'rgb', value: { r: 255, g: 0, b: 0 } });

// --- case insensitive ---
assert('uppercase HEX', ColorParser.parse('#FF0000'), { type: 'hex', value: { r: 255, g: 0, b: 0 } });
assert('uppercase RGB', ColorParser.parse('RGB(255, 0, 0)'), { type: 'rgb', value: { r: 255, g: 0, b: 0 } });

// --- invalid ---
assert('invalid string', ColorParser.parse('not a color'), null);
assert('empty string', ColorParser.parse(''), null);
assert('partial hex', ColorParser.parse('#gg0000'), null);
