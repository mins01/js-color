import ColorConverter from "../lib/ColorConverter.js";

console.log('# Start: Test for ColorConverter #');

let v , r , args;
args = [179, 133, 224];
v = ColorConverter.rgbToHsl(...args); console.assert(v.h == 270 && v.s == 59 && v.l == 70,JSON.stringify(args)+'=>'+JSON.stringify(v));
args = [179, 133, 224, true];
v = ColorConverter.rgbToHsl(...args); console.assert(Math.round(v.h) == 270 && Math.round(v.s) == 59 && Math.round(v.l) == 70,JSON.stringify(args)+'=>'+JSON.stringify(v));

args = [270, 60, 70];
v = ColorConverter.hslToRgb(...args); console.assert(v.r == 179 && v.g == 133 && v.b == 224,JSON.stringify(args)+'=>'+JSON.stringify(v));
args = [270, 60, 70 , true];
v = ColorConverter.hslToRgb(...args); console.assert(Math.round(v.r) == 179 && Math.round(v.g) == 133 && Math.round(v.b) == 224,JSON.stringify(args)+'=>'+JSON.stringify(v));

// rgb(179, 133, 224);
// hwb(270.33deg 52.16% 12.16%)
args = [179, 133, 224];
v = ColorConverter.rgbToHwb(...args); console.assert(v.h == 270 && v.w == 52 && v.b == 12,JSON.stringify(args)+'=>'+JSON.stringify(v));
args = [179, 133, 224 , true];
v = ColorConverter.rgbToHwb(...args); console.assert(Math.round(v.h)== 270 && Math.round(v.w) == 52 && Math.round(v.b) == 12,JSON.stringify(args)+'=>'+JSON.stringify(v));


args = [270, 52, 12];
v = ColorConverter.hwbToRgb(...args); console.assert(v.r == 179 && v.g == 133 && v.b == 224,JSON.stringify(args)+'=>'+JSON.stringify(v));
args = [270, 52, 12, true];
v = ColorConverter.hwbToRgb(...args); console.assert(Math.round(v.r) == 179 && Math.round(v.g) == 133 && Math.round(v.b) == 224,JSON.stringify(args)+'=>'+JSON.stringify(v));



console.log('# End: Test for ColorConverter #');