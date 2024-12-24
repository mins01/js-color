// import Color from "../Color.js";
import jsColor from "js-color";
const Color = jsColor.Color;

let v = '', r = null , c = null;

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

v = '#123';r = Color.parseHex(v); c = Color.toHex(r); console.assert(c === '#112233',c+' != #112233');
v = '#fFf';r = Color.parseHex(v); c = Color.toHex(r); console.assert(c === '#ffffff',c+' != #ffffff');
v = '#z23';r = Color.parseHex(v); c = Color.toHex(r); console.assert(c === null,c+' !== null');

v = '#1234';r = Color.parseHex(v); c = Color.toHex(r); console.assert(c === '#11223344',c+' != #11223344');
v = '#fFfF';r = Color.parseHex(v); c = Color.toHex(r); console.assert(c === '#ffffffff',c+' != #ffffffff');
v = '#z234';r = Color.parseHex(v); c = Color.toHex(r); console.assert(c === null,c+' !== null');


v = 'rgb( 0 , 12 , 123)';r = Color.vaildRgb(v); console.assert(r === v.replace(/\s{2,}/g,' ').toLowerCase(),r+' !== '+v);
v = 'rgb(0 12 123)';r = Color.vaildRgb(v); console.assert(r === v.replace(/\s{2,}/g,' ').toLowerCase(),r+' !== '+v);
v = 'rgb( 12 , 123)';r = Color.vaildRgb(v); console.assert(r === null ,v+' !== null');
v = 'rgba( 0 , 12 , 123, .0)';r = Color.vaildRgba(v); console.assert(r === v.replace(/\s{2,}/g,' ').toLowerCase(),r+' !== '+v);
v = 'rgba( 12 , 123)';r = Color.vaildRgba(v); console.assert(r === null ,v+' !== null');




// s = '#123'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#z23'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#000'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#999'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#AAA'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#fff'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));

// s = '#1234'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#z234'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#0000'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#9999'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#AAAA'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#ffff'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));

// s = '#123456'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#z23456'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#000000'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#999999'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#AAAAAA'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#ffffff'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));

// s = '#12345678'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#z2345678'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#00000000'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#99999999'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#AAAAAAAA'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));
// s = '#ffffffff'; c = Color.parseHex(s); console.log(s,c,c?.r?.toString(16));



// s = '#123'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#z23'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#000'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#999'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#AAA'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#fff'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));

// s = '#1234'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#z234'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#0000'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#9999'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#AAAA'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#ffff'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));

// s = '#123456'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#z23456'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#000000'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#999999'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#AAAAAA'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#ffffff'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));

// s = '#12345678'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#z2345678'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#00000000'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#99999999'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#AAAAAAAA'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
// s = '#ffffffff'; c = Color.parse(s); console.log(s,c,c?.r?.toString(16));
