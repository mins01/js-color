import Color from "../src/Color.js";

const color1 = new Color(20,60,200,0.004);
console.log('color1',color1);
const color2 = color1.clone()
console.log('color1.clone()',color2);
console.log('Color.fromRgba(color1)',Color.fromRgba(color1));
console.log('#--------------------------------#');
color1.setRgba(200,120,30)
console.log('color1.setRgba(200,120,30)',color1);
color1.setRgba(201,121,31,0.123)
console.log('color1.setRgba(201,120,30,0.2)',color1);
{
  const hsl = color1.toHsl();
  color2.setHsla(hsl.h,hsl.s,hsl.l);
  console.log('color2.setHsla(hsl.h,hsl.s,hsl.l)',color2,hsl);
}
{
  const hsl = color1.toHsl();
  color2.setHsla(hsl.h,hsl.s,hsl.l,color1.a);
  console.log('color2.setHsla(hsl.h,hsl.s,hsl.l)',color2,hsl);
}
{
  const hsl = { h: 31.91489361702127, s: 0.8392857142857145, l: 0.7803921568627451 };
  color2.setHsla(hsl.h,hsl.s,hsl.l,color1.a);
  console.log('color2.setHsla(hsl.h,hsl.s,hsl.l)',color2,hsl);
}
{
  const hsv = color1.toHsv();
  color2.setHsva(hsv.h,hsv.s,hsv.v,color1.a);
  console.log('color2.setHsva(hsv.h,hsv.s,hsv.v,color1.a)',color2,hsv);
}
console.log('#--------------------------------#');
console.log('"1"+color1',"1"+color1);
console.log('+color1',+color1);
console.log('Number(color1)',Number(color1));
console.log('JSON.stringify(color1)',JSON.stringify(color1));
console.log('color1.toUint8ClampedArray()',color1.toUint8ClampedArray());
console.log('color1.toStringRgb()',color1.toStringRgb());
console.log('color1.toStringRgba()',color1.toStringRgba());
console.log('color1.toStringHex()',color1.toStringHex());
console.log('color1.toStringHexa()',color1.toStringHexa());
console.log('color1.toRgb()',color1.toRgb());
console.log('color1.toRgba()',color1.toRgba());
console.log('color1.toHsl()',color1.toHsl());
console.log('color1.toHsla()',color1.toHsla());
console.log('color1.toStringHsl()',color1.toStringHsl());
console.log('color1.toStringHsla()',color1.toStringHsla());
console.log('color1.toHsv()',color1.toHsv());
console.log('color1.toHsva()',color1.toHsva());
console.log('color1.toCmyk()',color1.toCmyk());
console.log('color1.toCmyka()',color1.toCmyka());
console.log('color1.toStringCmyk()',color1.toStringCmyk());
console.log('color1.toStringCmyka()',color1.toStringCmyka());
console.log('color1.equals(color2)',color1.equals(color2),color1,color2);

