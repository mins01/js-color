import Color from "../src/Color.js";

const assert = (label, result, expected) => {
  const a = JSON.stringify(result);
  const b = JSON.stringify(expected);
  const pass = a === b;
  console.log(pass ? '[PASS]' : '[FAIL]', label);
  if (!pass) {
    console.log('  expected:', b);
    console.log('  got:     ', a);
  }
};

// === constructor ===
{
  const c = new Color(201, 121, 31, 0.5);
  assert('constructor(r,g,b,a)', c.toRgba(), { r: 201, g: 121, b: 31, a: 0.5 });
}
{
  const c = new Color();
  assert('constructor() defaults', c.toRgba(), { r: 0, g: 0, b: 0, a: 1 });
}
{
  const c = new Color({ r: 100, g: 150, b: 200, a: 0.8 });
  assert('constructor(object)', c.toRgba(), { r: 100, g: 150, b: 200, a: 0.8 });
}
{
  const c = new Color({ r: 100, g: 150, b: 200 });
  assert('constructor(object) no alpha', c.toRgba(), { r: 100, g: 150, b: 200, a: 1 });
}

// === clamp ===
{
  const c = new Color(300, -10, 128.7, 1.5);
  assert('clamp values', c.toRgba(), { r: 255, g: 0, b: 129, a: 1 });
}

// === clone ===
{
  const c1 = new Color(201, 121, 31, 0.5);
  const c2 = c1.clone();
  assert('clone', c2.toRgba(), { r: 201, g: 121, b: 31, a: 0.5 });
  assert('clone is not same ref', c1 !== c2, true);
}

// === equals ===
{
  const c1 = new Color(201, 121, 31, 0.5);
  const c2 = new Color(201, 121, 31, 0.5);
  const c3 = new Color(201, 121, 31, 0.6);
  assert('equals true', c1.equals(c2), true);
  assert('equals false', c1.equals(c3), false);
}

// === from ===
{
  const c = Color.from({r:201.1,g:121.1,b:31,a:0.5});
  assert('from', c.toRgba(), { r: 201, g: 121, b: 31, a: 0.5 });
  assert('from real', c.toRealRgba(), { r: 201.1, g: 121.1, b: 31, a: 0.5 });
}
// === fromRgba ===
{
  const c = Color.fromRgba(201, 121, 31, 0.5);
  assert('fromRgba', c.toRgba(), { r: 201, g: 121, b: 31, a: 0.5 });
}
{
  const c1 = new Color(50, 100, 150, 0.3);
  const c2 = Color.fromRgba(c1);
  assert('fromRgba(object)', c2.toRgba(), { r: 50, g: 100, b: 150, a: 0.3 });
}

// === fromString ===
{
  const c = Color.fromString('#c9791f');
  assert('fromString hex', c.toRgba(), { r: 201, g: 121, b: 31, a: 1 });
}
{
  const c = Color.fromString('rgba(201, 121, 31, 0.5)');
  assert('fromString rgba', c.toRgba(), { r: 201, g: 121, b: 31, a: 0.5 });
}
{
  const c = Color.fromString('rgb(201, 121, 31, 0.5)');
  assert('fromString rgb with alpha', c.toRgba(), { r: 201, g: 121, b: 31, a: 0.5 });
}
{
  const c = Color.fromString('hsl(31.76, 73.28%, 45.49%)');
  assert('fromString hsl', [c.r, c.g, c.b], [201, 121, 31]);
}
{
  const c = Color.fromString('hsla(31.76, 73.28%, 45.49%, 0.5)');
  assert('fromString hsla', { rgb: [c.r, c.g, c.b], a: c.a }, { rgb: [201, 121, 31], a: 0.5 });
}
{
  const c = Color.fromString('cmyk(0%, 40%, 85%, 21%)');
  assert('fromString cmyk', [c.r, c.g, c.b], [201, 121, 30]);
}
{
  const c = Color.fromString('cmyka(0%, 40%, 85%, 21%, 0.5)');
  assert('fromString cmyka', { rgb: [c.r, c.g, c.b], a: c.a }, { rgb: [201, 121, 30], a: 0.5 });
}
{
  assert('fromString invalid', Color.fromString('not a color'), null);
}

// === set ===
{
  const c = new Color();
  c.set(Color.from({ r: 201, g: 121, b: 31, a: 0.5 }));
  assert('set string', c.toRgba(), { r: 201, g: 121, b: 31, a: 0.5 });  
  c.set({ r: 201, g: 121, b: 31, a: 0.5 });
  assert('set object', c.toRgba(), { r: 201, g: 121, b: 31, a: 0.5 });
  c.set([201, 121, 31, 0.5]);
  assert('set array', c.toRgba(), { r: 201, g: 121, b: 31, a: 0.5 });  
  c.set('rgb(201, 121, 31, 0.5)');
  assert('set string', c.toRgba(), { r: 201, g: 121, b: 31, a: 0.5 });
}
// === setRgba ===
{
  const c = new Color();
  c.setRgba(201, 121, 31, 0.5);
  assert('setRgba', c.toRgba(), { r: 201, g: 121, b: 31, a: 0.5 });
}
{
  const c = new Color(0, 0, 0, 0.8);
  c.setRgba(100, 100, 100);
  assert('setRgba a=null keeps alpha', c.a, 0.8);
}

// === setHsla ===
{
  const c = new Color();
  c.setHsla(0, 1, 0.5);
  assert('setHsla red', c.toRgb(), { r: 255, g: 0, b: 0 });
}
{
  const c = new Color();
  c.setHsla(120, 1, 0.5, 0.7);
  assert('setHsla green with alpha', { rgb: c.toRgb(), a: c.a }, { rgb: { r: 0, g: 255, b: 0 }, a: 0.7 });
}

// === setCmyk / setCmyka ===
{
  const c = new Color();
  c.setCmyk(0, 0, 0, 0);
  assert('setCmyk white', c.toRgb(), { r: 255, g: 255, b: 255 });
}
{
  const c = new Color();
  c.setCmyk(1, 0, 0, 0);
  assert('setCmyk cyan', c.toRgb(), { r: 0, g: 255, b: 255 });
}
{
  const c = new Color();
  c.setCmyka(0, 1, 1, 0, 0.3);
  assert('setCmyka red with alpha', { rgb: c.toRgb(), a: c.a }, { rgb: { r: 255, g: 0, b: 0 }, a: 0.3 });
}

// === setHsva ===
{
  const c = new Color();
  c.setHsva(0, 1, 1);
  assert('setHsva red', c.toRgb(), { r: 255, g: 0, b: 0 });
}
{
  const c = new Color();
  c.setHsva(120, 1, 1, 0.4);
  assert('setHsva green with alpha', { rgb: c.toRgb(), a: c.a }, { rgb: { r: 0, g: 255, b: 0 }, a: 0.4 });
}

// === toNumber / toRgbNumber / toRgbaNumber / toArgbNumber ===
{
  const c = new Color(201, 121, 31, 0.5);
  assert('toRgbNumber', c.toRgbNumber(), ((201 << 16) | (121 << 8) | 31) >>> 0);
  assert('toRgbaNumber', c.toRgbaNumber(), ((201 << 24) | (121 << 16) | (31 << 8) | 128) >>> 0);
  assert('toArgbNumber', c.toArgbNumber(), ((128 << 24) | (201 << 16) | (121 << 8) | 31) >>> 0);
  assert('toNumber === toRgbNumber', c.toNumber(), c.toRgbNumber());
}

// === valueOf / Symbol.toPrimitive ===
{
  const c = new Color(201, 121, 31, 0.5);
  assert('valueOf', +c, c.toRgbNumber());
  assert('toPrimitive string', `${c}`, c.toString());
  assert('toPrimitive default', '' + c, c.toString());
}

// === toJSON ===
{
  const c = new Color(201, 121, 31, 0.5);
  assert('toJSON', JSON.stringify(c), JSON.stringify({r:201,g:121,b:31,a:0.5,realR:201,realG:121,realB:31}));
}


// === toUint8ClampedArray ===
{
  const c = new Color(201, 121, 31, 0.5);
  const arr = c.toUint8ClampedArray();
  assert('toUint8ClampedArray', [arr[0], arr[1], arr[2], arr[3]], [201, 121, 31, 128]);
}

// === toString / toRgbString / toRgbaString ===
{
  const c = new Color(201, 121, 31, 0.5);
  assert('toRgbString', c.toRgbString(), 'rgb(201, 121, 31)');
  assert('toRgbaString', c.toRgbaString(), 'rgba(201, 121, 31, 0.5)');
  assert('toString default', c.toString(), 'rgba(201, 121, 31, 0.5)');
  assert('toString("hex")', c.toString('hex'), '#c9791f');
  assert('toString("hsl")', c.toString('hsl'), c.toHslString());
  assert('toString("cmyk")', c.toString('cmyk'), c.toCmykString());
}

// === toHexString / toHexaString ===
{
  const c = new Color(201, 121, 31, 0.5);
  assert('toHexString', c.toHexString(), '#c9791f');
  assert('toHexaString', c.toHexaString(), '#c9791f80');
}

// === toRgb / toRgba ===
{
  const c = new Color(201, 121, 31, 0.5);
  assert('toRgb', c.toRgb(), { r: 201, g: 121, b: 31 });
  assert('toRgba', c.toRgba(), { r: 201, g: 121, b: 31, a: 0.5 });
}

// === toRealRgb / toRealRgba ===
{
  const c = new Color(201.5, 121.3, 31.2, 0.5);
  assert('toRealRgb', c.toRealRgb(), { r: 201.5, g: 121.3, b: 31.2 });
  assert('toRealRgba', c.toRealRgba(), { r: 201.5, g: 121.3, b: 31.2, a: 0.5 });
}

// === toHsl / toHsla / toHslString / toHslaString ===
{
  const c = new Color(201, 121, 31, 0.5);
  const hsl = c.toHsl();
  assert('toHsl has h,s,l', 'h' in hsl && 's' in hsl && 'l' in hsl, true);
  const hsla = c.toHsla();
  assert('toHsla has a', hsla.a, 0.5);
  assert('toHslString format', c.toHslString().startsWith('hsl('), true);
  assert('toHslaString format', c.toHslaString().startsWith('hsla('), true);
}

// === toHsv / toHsva / toHsvString / toHsvaString ===
{
  const c = new Color(201, 121, 31, 0.5);
  const hsv = c.toHsv();
  assert('toHsv has h,s,v', 'h' in hsv && 's' in hsv && 'v' in hsv, true);
  const hsva = c.toHsva();
  assert('toHsva has a', hsva.a, 0.5);
  assert('toHsvString format', c.toHsvString().startsWith('hsv('), true);
  assert('toHsvaString format', c.toHsvaString().startsWith('hsva('), true);
}

// === setHsba / toHsb / toHsba / toHsbString / toHsbaString ===
{
  const c = new Color();
  c.setHsba(0, 1, 1);
  assert('setHsba red', c.toRgb(), { r: 255, g: 0, b: 0 });
}
{
  const c = new Color();
  c.setHsba(120, 1, 1, 0.4);
  assert('setHsba green with alpha', { rgb: c.toRgb(), a: c.a }, { rgb: { r: 0, g: 255, b: 0 }, a: 0.4 });
}
{
  const c = new Color(201, 121, 31, 0.5);
  const hsb = c.toHsb();
  assert('toHsb has h,s,b', 'h' in hsb && 's' in hsb && 'b' in hsb, true);
  assert('toHsb no v key', 'v' in hsb, false);
  const hsba = c.toHsba();
  assert('toHsba has a', hsba.a, 0.5);
  assert('toHsbString format', c.toHsbString().startsWith('hsb('), true);
  assert('toHsbaString format', c.toHsbaString().startsWith('hsba('), true);
}
{
  const c = new Color();
  c.setHsva(0, 1, 1);
  const { b } = c.toHsb();
  assert('toHsb b equals toHsv v', b, c.toHsv().v);
}

// === toCmyk / toCmyka / toCmykString / toCmykaString ===
{
  const c = new Color(201, 121, 31, 0.5);
  const cmyk = c.toCmyk();
  assert('toCmyk has c,m,y,k', 'c' in cmyk && 'm' in cmyk && 'y' in cmyk && 'k' in cmyk, true);
  const cmyka = c.toCmyka();
  assert('toCmyka has a', cmyka.a, 0.5);
  assert('toCmykString format', c.toCmykString().startsWith('cmyk('), true);
  assert('toCmykaString format', c.toCmykaString().startsWith('cmyka('), true);
}
