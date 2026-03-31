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
// {
//   // const h = 106.73076923076923
//   // const s = 0.7536231884057971
//   // const l = 0.27058823529411763
//   const h = 108
//   const s = 0.7953125
//   const l = 0.14218750000000002


//   console.log({h,s,l});
//   const c = new Color();
//   c.setHsla(h,s,l)
//   const hsl = c.toHsl()
//   console.log('diff',hsl.h-h,hsl.s-s,hsl.l-l)
//   console.log(c.toRgb())
//   console.log(c.toRealRgb())
//   console.log(c.toHsl())


// }
// {
//   let h = 108
//   let s = 0.3;
//   let l = 0.4;
//   const c = new Color();
//   for(let i=0,m=20;i<m;i++){
//     h = Math.random()*360;
//     s = Math.random();
//     l = Math.random();
//     c.setHsl(h,s,l);
//     // console.log(c.toRealRgb(),c.toHsl(),c.toHsl(false));
//     assert(`hsl-${i}`,c.toHsl(),{h,s,l})
//   }
// }
// {
//   let h = 108
//   let s = 0.3;
//   let l = 0.4;
//   const c = new Color();
//   for(let i=0,m=20;i<m;i++){
//     h = Math.random()*360;
//     s = Math.random();
//     l = Math.random();
//     let hslString =`hsl(${Math.round(h)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)` 
//     c.setString(hslString);
//     // console.log(c.toRealRgb(),c.toHsl(),c.toHsl(false));
//     assert(`hsl-${i}`,c.toHslString(),hslString)
//   }
// }
{
  // expected: "hsl(318, 0%, 51%)"
  // got:      "hsl(0, 0%, 51%)"

  const c = new Color();
  let i = 0;
  let hslString =`hsl(318, 34%, 99.99%)` 
  c.setString(hslString);
  console.log(c.toRealRgb(),c.toHsl(),c.toHsl(false));
  assert(`hsl-${i}`,c.toHslString(),hslString)
  c.setHsl(318,0.34,0.9999);
  console.log(c.toRealRgb(),c.toHsl(),c.toHsl(false));
  
}


 