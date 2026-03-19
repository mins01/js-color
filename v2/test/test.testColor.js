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
  // const h = 106.73076923076923
  // const s = 0.7536231884057971
  // const l = 0.27058823529411763
  const h = 108
  const s = 0.7953125
  const l = 0.14218750000000002


  const c = new Color();
  console.log(c.setHsla(h,s,l));
  const hsl = c.toHsl()
  console.log(hsl.h-h,hsl.s-s,hsl.l-l)
  console.log(c.toRgb())
  console.log(c.toRealRgb())
  console.log(c.toHsl())


}
