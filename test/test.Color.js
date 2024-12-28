import ColorJs from "../src/Color.js";
import ColorParser from "../src/ColorParser.js";
import ColorMinJs from "../dist/Color.js";

// import jsColor from "js-color";
// const Color = jsColor.Color;
let Color = null;
if(globalThis.process){
    if(process.argv[2]??false){
        const arg2 = process.argv[2];
        if(arg2==1){ 
            Color = ColorJs 
            console.log('Test by Color.js');
        }
        else if(arg2==2){ 
            Color = ColorMinJs 
            console.log('Test by Color.min.js');
        }else{
            Color = ColorJs
            console.log('Test by Color.js');
        }
    }else{
        Color = ColorJs
        console.log('Test by Color.js');
    }
}else{
    Color = ColorJs
    console.log('Test by Color.js');
}

console.log('Version',Color.version);


console.log('# Test Color')

let v = '', r = null , c = null;
console.log('TEST: Color.validColor');



console.log('TEST: Color.parseColor');



console.log('TEST: Color.toColor');

console.log('TEST: Color.validHex');


console.log('TEST: Color.parseHex+toHex');


// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb
/* Absolute values */
console.log('TEST: Color.validRgb + Color.validRgba');



console.log('TEST: Color.parseRgb + Color.parseRgba');


console.log('TEST: Color.toRgb + Color.toRgba');

console.log('TEST: Color.parse');


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

console.log('TEST: Color.validHsl(),Color.validHsla()');


console.log('TEST: Color.parseHsl(),Color.parseHsla()');


console.log('TEST: Color.toHex(),toRgb(),toRgba(),toHsl(),toHsla() with disallowDecimal(default)');

console.log('TEST: ColorExporter.toHex(),toRgb(),toRgba(),toHsl(),toHsla() with allowDecimal');

