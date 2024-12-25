import Color from "../Color.js";
// import jsColor from "js-color";
// const Color = jsColor.Color;

let v = '', r = null , c = null;

console.log('START');
console.log('Color.validColor');
v = {r:0,g:128,b:255};r = Color.validColor(v); console.assert(r !== null,r+' !== '+v);
v = {r:0,g:128,b:255,a:0.1};r = Color.validColor(v);  console.assert(r !== null,r+' !== '+v);
v = new Color({r:0,g:128,b:255,a:0.1});r = Color.validColor(v); console.assert(r !== null,r+' !== '+v);
v = {r:0,g:128,a:0.1};r = Color.validColor(v); console.assert(r === null,r+' !== '+v);
console.log('END');


console.log('START');
console.log('Color.parseColor');
v = {r:0,g:128,b:255};r = Color.parseColor(v); console.assert(r !== null,r+' !== '+v);
v = {r:0,g:128,b:255,a:0.1};r = Color.parseColor(v); console.assert(r !== null,r+' !== '+v);
v = new Color({r:0,g:128,b:255,a:0.1});r = Color.parseColor(v); console.assert(r !== null,r+' !== '+v);
v = {r:0,g:128,a:0.1};r = Color.parseColor(v); console.assert(r === null,r+' !== '+v);
console.log('END');


console.log('START');
console.log('Color.toColor');
v = {r:0,g:128,b:255};r = Color.toColor(v); console.assert(r !== null,r+' !== '+v);
v = {r:0,g:128,b:255,a:0.1};r = Color.toColor(v); console.assert(r !== null,r+' !== '+v);
v = new Color({r:0,g:128,b:255,a:0.1});r = Color.toColor(v); console.assert(r !== null,r+' !== '+v);
v = {r:0,g:128,a:0.1};r = Color.toColor(v); console.assert(r === null,r+' !== '+v);
console.log('END');


console.log('START');
console.log('Color.vaildHex');
v = '#123';r = Color.vaildHex(v); console.assert(r === v.replace(/\s/g,'').toLowerCase(),r+' !== '+v);
v = '#aBc';r = Color.vaildHex(v); console.assert(r === v.replace(/\s/g,'').toLowerCase(),r+' !== '+v);
v = '#z23';r = Color.vaildHex(v); console.assert(r === null ,v+' !== null');

v = '#1234';r = Color.vaildHex(v); console.assert(r === v.replace(/\s/g,'').toLowerCase(),r+' !== '+v);
v = '#aBcD';r = Color.vaildHex(v); console.assert(r === v.replace(/\s/g,'').toLowerCase(),r+' !== '+v);
v = '#z234';r = Color.vaildHex(v); console.assert(r === null ,v+' !== null');

v = '#123456';r = Color.vaildHex(v); console.assert(r === v.replace(/\s/g,'').toLowerCase(),r+' !== '+v);
v = '#aBcDeF';r = Color.vaildHex(v); console.assert(r === v.replace(/\s/g,'').toLowerCase(),r+' !== '+v);
v = '#z23456';r = Color.vaildHex(v); console.assert(r === null ,v+' !== null');

v = '#1234567';r = Color.vaildHex(v); console.assert(r === null ,r+' !== '+v);
v = '#aBcDeFa';r = Color.vaildHex(v); console.assert(r === null ,r+' !== '+v);
v = '#z234567';r = Color.vaildHex(v); console.assert(r === null ,v+' !== null');

v = '#12345678';r = Color.vaildHex(v); console.assert(r === v.replace(/\s/g,'').toLowerCase(),r+' !== '+v);
v = '#aBcDeFaB';r = Color.vaildHex(v); console.assert(r === v.replace(/\s/g,'').toLowerCase(),r+' !== '+v);
v = '#z2345678';r = Color.vaildHex(v); console.assert(r === null ,v+' !== null');
console.log('END');

console.log('START');
console.log('Color.parseHex+toHex');
v = '#123';r = Color.parseHex(v); c = Color.toHex(r); console.assert(c === '#112233',c+' != #112233');
v = '#fFf';r = Color.parseHex(v); c = Color.toHex(r); console.assert(c === '#ffffff',c+' != #ffffff');
v = '#z23';r = Color.parseHex(v); c = Color.toHex(r); console.assert(c === null,c+' !== null');

v = '#1234';r = Color.parseHex(v); c = Color.toHex(r); console.assert(c === '#11223344',c+' != #11223344');
v = '#fFfF';r = Color.parseHex(v); c = Color.toHex(r);console.assert(c === '#ffffffff',c+' != #ffffffff');
v = '#z234';r = Color.parseHex(v); c = Color.toHex(r); console.assert(c === null,c+' !== null');
console.log('END');

// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb
/* Absolute values */
console.log('START');
console.log('Color.vaildRgb + Color.vaildRgba');
v = 'rgb(0, 128, 255)';r = Color.vaildRgb(v);  console.assert(r !== null ,v+ '=>' +r);
v = 'rgb(0 128 255)';r = Color.vaildRgb(v);  console.assert(r !== null ,v+ '=>' +r);
v = 'rgb(0%  50% 100%)';r = Color.vaildRgb(v);  console.assert(r !== null ,v+ '=>' +r);
v = 'rgb(0%, 50%, 100%)';r = Color.vaildRgb(v);  console.assert(r !== null ,v+ '=>' +r);
v = 'rgb(0%, 50%, 100% , 0.0028)';r = Color.vaildRgb(v);  console.assert(r !== null ,v+ '=>' +r);
v = 'rgba(0, 128, 255 , 0.5)';r = Color.vaildRgba(v);  console.assert(r !== null ,v+ '=>' +r);
v = 'rgba(0 128 255 / .5)';r = Color.vaildRgba(v);  console.assert(r !== null ,v+ '=>' +r);
v = 'rgba(0%  50% 100% / 50%)';r = Color.vaildRgba(v);  console.assert(r !== null ,v+ '=>' +r);
v = 'rgba(0%, 50%, 100% , 50%)';r = Color.vaildRgba(v);  console.assert(r !== null ,v+ '=>' +r);
v = 'rgba(1e2, .5e1, .5e0, +.25e2%)';r = Color.vaildRgba(v);  console.assert(r !== null ,v+ '=>' +r);
console.log('END');


console.log('START');
console.log('Color.parseRgb + Color.parseRgba');
v = 'rgb(0, 128, 255)';r = Color.parseRgb(v); console.assert(r !== null ,v+ '=>' +r);
v = 'rgb(0 128 255)';r = Color.parseRgb(v); console.assert(r !== null ,v+ '=>' +r);
v = 'rgb(0%  50% 100%)';r = Color.parseRgb(v); console.assert(r !== null ,v+ '=>' +r);
v = 'rgb(0%, 50%, 100%)';r = Color.parseRgb(v); console.assert(r !== null ,v+ '=>' +r);
v = 'rgb(0%, 50%, 100% , 0.0028)';r = Color.parseRgb(v); console.assert(r !== null ,v+ '=>' +r);
v = 'rgba(0, 128, 255 , 0.5)';r = Color.parseRgba(v); console.assert(r !== null ,v+ '=>' +r);
v = 'rgba(0 128 255 / .5)';r = Color.parseRgba(v); console.assert(r !== null ,v+ '=>' +r);
v = 'rgba(0%  50% 100% / 50%)';r = Color.parseRgba(v); console.assert(r !== null ,v+ '=>' +r);
v = 'rgba(0%, 50%, 100% , 50%)';r = Color.parseRgba(v); console.assert(r !== null ,v+ '=>' +r);
v = 'rgba(1e2, .5e1, .5e0, +.25e2%)';r = Color.parseRgba(v); console.assert(r !== null ,v+ '=>' +r);
v = 'xzxc asd asda sd';r = Color.parseRgba(v); console.assert(r === null ,v+ '=>' +r);
console.log('END');

console.log('START');
console.log('Color.toRgb + Color.toRgba');
v = 'rgba(0, 128, 255 , 0.5)';r = Color.parseRgba(v); c = Color.toRgb(r); console.assert(r !== null ,v+ '=>' +r);
v = 'rgb(0, 128, 255 )';r = Color.parseRgba(v); c = Color.toRgb(r); console.assert(r !== null ,v+ '=>' +r);
v = 'rgba(0, 128 )';r = Color.parseRgba(v); c = Color.toRgba(r); console.assert(r === null ,v+ '=>' +r);
console.log('END');

console.log('START');
console.log('Color.parse');
v = [0,128,255]; r = Color.parse(v[0],v[1],v[2]); console.assert(r.g === 128,v+'=>'+r)
v = [0,128,255,0.1]; r = Color.parse(v[0],v[1],v[2],v[3]); console.assert(r.g === 128,v+'=>'+r)
v = '#0080FF'; r = Color.parse(v); console.assert(r.g === 128,v+'=>'+r)
v = '#0080FF80'; r = Color.parse(v); console.assert(r.g === 128,v+'=>'+r)
v = 'rgb(0,128,255)'; r = Color.parse(v); console.assert(r.g === 128,v+'=>'+r)
v = 'rgb(0,128,255,0.1)'; r = Color.parse(v); console.assert(r.g === 128,v+'=>'+r)
v = 'rgba(0,128,255,0.1)'; r = Color.parse(v); console.assert(r.g === 128,v+'=>'+r)
console.log('END');

console.log('START');
console.log('Color.from');
v = [0,128,255]; r = Color.from(v[0],v[1],v[2]); console.assert(r?.toHex() === '#0080ff',v+'=>'+r?.toHex())
v = [0,128,255,0.1]; r = Color.from(v[0],v[1],v[2],v[3]); console.assert(r?.toHex() === '#0080ff1a',v+'=>'+r?.toHex())
v = '#0080FF'; r = Color.from(v); console.assert(r?.toHex() === '#0080FF'.toLowerCase(),v+'=>'+r?.toHex())
v = '#0080FF80'; r = Color.from(v); console.assert(r?.toHex() === '#0080FF80'.toLowerCase(),v+'=>'+r?.toHex())
v = 'rgb(0,128,255)'; r = Color.from(v); console.assert(r?.toHex() === '#0080ff'.toLowerCase(),v+'=>'+r?.toHex())
v = 'rgb(0,128,255,0.1)'; r = Color.from(v); console.assert(r?.toHex() === '#0080ff1a'.toLowerCase(),v+'=>'+r?.toHex())
v = 'rgba(0,128,255,0.1)'; r = Color.from(v); console.assert(r?.toHex() === '#0080ff1a'.toLowerCase(),v+'=>'+r?.toHex())
console.log('END');

console.log('START');
console.log('new Color()');
v = new Color(); console.assert(v.toHex()==='#000000','=>'+v?.toHex())
v = new Color(0,128,255); console.assert(v.toHex()==='#0080ff','=>'+v?.toHex())
v = new Color(0,128,255,0.3); console.assert(v.toHex()==='#0080ff4d','=>'+v?.toHex())
v = new Color({r:0,g:128,b:255}); console.assert(v.toHex()==='#0080ff','=>'+v?.toHex())
    console.assert(v.g === 128, '=>'+JSON.stringify(v));
    v.set({r:0,g:100,b:255,a:0.2}); console.assert(v.g === 100 && v.a === 0.2, '=>'+JSON.stringify(v));
    v.set('#0080ff'); console.assert(v.g === 128 && v.a === null, '=>'+JSON.stringify(v));
    v.set('#0080ff80'); console.assert(v.g === 128 && v.a !== null, '=>'+JSON.stringify(v));
    try{v.set({r:0,g:100,b:500,a:0.2});console.assert(false,'=>'+JSON.stringify(v))}catch(e){ console.assert(true,'=>'+JSON.stringify(v))}
    try{v.set(1,2,3,4);console.assert(false,'=>'+JSON.stringify(v))}catch(e){ console.assert(true,'=>'+JSON.stringify(v))}
console.log('END');