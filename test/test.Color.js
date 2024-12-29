// import Color from "../lib/Color.js";
// import ColorParser from "../lib/ColorParser.js";
import jsColor,{Color,ColorParser} from "../lib/jsColor.js";


console.log('Color version: ',jsColor.version);


console.log('# Start: Test for Color #')

let v = '', r = null , c = null;

console.log('TEST: Color.from');
v = [0,128,255]; r = Color.from(v[0],v[1],v[2]); console.assert(r?.toHex() === '#0080ff',v+'=>'+r?.toHex())
v = [0,128,255,0.1]; r = Color.from(v[0],v[1],v[2],v[3]); console.assert(r?.toHexa() === '#0080ff1a',v+'=>'+r?.toHexa())
v = '#0080FF'; r = Color.from(v); console.assert(r?.toHex() === '#0080ff'.toLowerCase(),v+'=>'+r?.toHex())
v = '#0080FF80'; r = Color.from(v); console.assert(r?.toHexa() === '#0080ff80'.toLowerCase(),v+'=>'+r?.toHexa())
v = 'rgb(0,128,255)'; r = Color.from(v); console.assert(r?.toHex() === '#0080ff'.toLowerCase(),v+'=>'+r?.toHex())
v = 'rgb(0,128,255,0.1)'; r = Color.from(v); console.assert(r?.toHexa() === '#0080ff1a'.toLowerCase(),v+'=>'+r?.toHexa())
v = 'rgba(0,128,255,0.1)'; r = Color.from(v); console.assert(r?.toHexa() === '#0080ff1a'.toLowerCase(),v+'=>'+r?.toHexa())

console.log('TEST: new Color()');
v = new Color(); console.assert(v.toHex()==='#000000','=>'+v?.toHex())
v = new Color(0,128,255); console.assert(v.toHex()==='#0080ff','=>'+v?.toHex())
v = new Color(0,128,255,0.3); console.assert(v.toHexa()==='#0080ff4d','=>'+v?.toHex())
v = new Color({r:0,g:128,b:255}); console.assert(v.toHex()==='#0080ff','=>'+v?.toHex())
    console.assert(v.g === 128, '=>'+JSON.stringify(v));
    v.set({r:0,g:100,b:255,a:0.2}); console.assert(v.g === 100 && v.a === 0.2, '=>'+JSON.stringify(v));
    v.set('#0080ff'); console.assert(v.g === 128 && v.a === 1, '=>'+JSON.stringify(v));
    v.set('#0080ff80'); console.assert(v.g === 128 && v.a !== null, '=>'+JSON.stringify(v));
    try{v.set({r:0,g:100,b:500,a:0.2});console.assert(false,'=>'+JSON.stringify(v))}catch(e){ console.assert(true,'=>'+JSON.stringify(v))}
    try{v.set(1,2,3,4);console.assert(false,'=>'+JSON.stringify(v))}catch(e){ console.assert(true,'=>'+JSON.stringify(v))}

console.log('TEST: ToMethod');
v = new Color(0,128,255,0.3);
r = v.toHexa(); console.assert(ColorParser.validHexa(r) !== null, v.toString()+'=>'+r);
r = v.toHex(); console.assert(ColorParser.validHex(r) !== null, v.toString()+'=>'+r);
r = v.toRgba(); console.assert(ColorParser.validRgba(r) !== null, v.toString()+'=>'+r);
r = v.toRgb(); console.assert(ColorParser.validRgb(r) !== null, v.toString()+'=>'+r);
r = v.toHsla(); console.assert(ColorParser.validHsla(r) !== null, v.toString()+'=>'+r);
r = v.toHsl(); console.assert(ColorParser.validHsl(r) !== null, v.toString()+'=>'+r);

console.log('# End: Test for Color #')