import namedColors from "../lib/namedColors.js";
import ColorExporter from "../lib/ColorExporter.js";
import ColorParser from "../lib/ColorParser.js";

console.log('# Start: Test for ColorParser #');

let v , r , args;
{
  args = [128];   r = ColorParser.validIsNumber(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['128'];   r = ColorParser.validIsNumber(...args); console.assert(r === null,args[0]+'=>'+r);

  args = [0];   r = ColorParser.valid0to255(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [128];   r = ColorParser.valid0to255(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [255];   r = ColorParser.valid0to255(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [-128];    r = ColorParser.valid0to255(...args); console.assert(r === null,args[0]+'=>'+r);
  args = [512];   r = ColorParser.valid0to255(...args); console.assert(r === null,args[0]+'=>'+r);
  args = ['128'];   r = ColorParser.valid0to255(...args); console.assert(r === null,args[0]+'=>'+r);
  
  args = [128];   r = ColorParser.validRed(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [128];   r = ColorParser.validGreen(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [128];   r = ColorParser.validBlue(...args); console.assert(r === args[0],args[0]+'=>'+r);
  
  args = [0];   r = ColorParser.valid0to1(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [0.5];   r = ColorParser.valid0to1(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [1];   r = ColorParser.valid0to1(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [-0.1];    r = ColorParser.valid0to1(...args); console.assert(r === null,args[0]+'=>'+r);
  args = [1.1];   r = ColorParser.valid0to1(...args); console.assert(r === null,args[0]+'=>'+r);
  
  args = [0.5];   r = ColorParser.validAlpha(...args); console.assert(r === args[0],args[0]+'=>'+r);
  

  args = [0];   r = ColorParser.valid0to360(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [180];   r = ColorParser.valid0to360(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [360];   r = ColorParser.valid0to360(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [-1];   r = ColorParser.valid0to360(...args); console.assert(r === null,args[0]+'=>'+r);
  args = [361];    r = ColorParser.valid0to360(...args); console.assert(r === null,args[0]+'=>'+r);

  args = [180];   r = ColorParser.validHue(...args); console.assert(r === args[0],args[0]+'=>'+r);
  
  args = [0];   r = ColorParser.valid0to100(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [50];   r = ColorParser.valid0to100(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [100];   r = ColorParser.valid0to100(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [-1];   r = ColorParser.valid0to100(...args); console.assert(r === null,args[0]+'=>'+r);
  args = [101];    r = ColorParser.valid0to100(...args); console.assert(r === null,args[0]+'=>'+r);
  
  args = [50];   r = ColorParser.validSaturation(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [50];   r = ColorParser.validLightness(...args); console.assert(r === args[0],args[0]+'=>'+r);
  
}

{
  args = [{r:0,g:128,b:255}];   r = ColorParser.validColor(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = [[0,128,255]];   r = ColorParser.validColor(...args); console.assert(r === null,args[0]+'=>'+r);
  args = ['hsl(270, 59%, 70%)'];   r = ColorParser.validColor(...args); console.assert(r === null,args[0]+'=>'+r);

}

{
  args = ['#1'];   r = ColorParser.validHex(...args); console.assert(r === null,args[0]+'=>'+r);
  args = ['#12'];   r = ColorParser.validHex(...args); console.assert(r === null,args[0]+'=>'+r);
  args = ['#123'];   r = ColorParser.validHex(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['#1234'];   r = ColorParser.validHex(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['#12345'];   r = ColorParser.validHex(...args); console.assert(r === null,args[0]+'=>'+r);
  args = ['#123456'];   r = ColorParser.validHex(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['#1234567'];   r = ColorParser.validHex(...args); console.assert(r === null,args[0]+'=>'+r);
  args = ['#12345678'];   r = ColorParser.validHex(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['#123456789'];   r = ColorParser.validHex(...args); console.assert(r === null,args[0]+'=>'+r);
  args = [[0,128,255]];   r = ColorParser.validHex(...args); console.assert(r === null,args[0]+'=>'+r);
}

{
  args = ['rgb(0,128,255)'];   r = ColorParser.validRgb(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['rgb(0,128,255,0.5)'];   r = ColorParser.validRgb(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['rgba(0,128,255)'];   r = ColorParser.validRgb(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['rgba(0,128,255,0.5)'];   r = ColorParser.validRgb(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['rgb(0,0.7,5.5, 0.1)'];   r = ColorParser.validRgb(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['rgb(0, ,255,0.5)'];   r = ColorParser.validRgb(...args); console.assert(r === null,args[0]+'=>'+r);
  args = ['rgb(0,128,255)'];   r = ColorParser.validRgba(...args); console.assert(r === args[0],args[0]+'=>'+r);
}
{
  args = ['hsl(270, 59%, 70%)'];   r = ColorParser.validHsl(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['hsl(270, 59%, 70%, 0.5)'];   r = ColorParser.validHsl(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['hsla(270, 59%, 70%, 0.5)'];   r = ColorParser.validHsl(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['hsl(0.1, 0.1%, 0.1%,0.5)'];   r = ColorParser.validHsl(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['hsl(0.1, 0.1, 0.1,0.5)'];   r = ColorParser.validHsl(...args); console.assert(r === null,args[0]+'=>'+r);
  args = ['hsl(270, , 70%, 0.5)'];   r = ColorParser.validHsl(...args); console.assert(r === null,args[0]+'=>'+r);
  args = ['hsla(270, 59%, 70%, 0.5)'];   r = ColorParser.validHsla(...args); console.assert(r === args[0],args[0]+'=>'+r);
}
{
  args = ['hwb(270, 59%, 70%)'];   r = ColorParser.validHwb(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['hwb(270, 59%, 70%, 0.5)'];   r = ColorParser.validHwb(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['hwba(270, 59%, 70%, 0.5)'];   r = ColorParser.validHwb(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['hwb(0.1, 0.1%, 0.1%,0.5)'];   r = ColorParser.validHwb(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['hwb(0.1, 0.1, 0.1,0.5)'];   r = ColorParser.validHwb(...args); console.assert(r === null,args[0]+'=>'+r);
  args = ['hwb(270, , 70%, 0.5)'];   r = ColorParser.validHwb(...args); console.assert(r === null,args[0]+'=>'+r);
  args = ['hwba(270, 59%, 70%, 0.5)'];   r = ColorParser.validHwba(...args); console.assert(r === args[0],args[0]+'=>'+r);
}
{
  args = ['red'];   r = ColorParser.validNamedColor(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['rgba(0,128,255,0.5)'];   r = ColorParser.validNamedColor(...args); console.assert(r === null,args[0]+'=>'+r);
}
{
  args = [0,128,255,0.5];   r = ColorParser.valid(...args); console.assert(r !== null,args[0]+'=>'+r);
  args = ['rgba(0,128,255,0.5)'];   r = ColorParser.valid(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['hsla(270, 59%, 70%,0.5)'];   r = ColorParser.valid(...args); console.assert(r === args[0],args[0]+'=>'+r);
  args = ['red'];   r = ColorParser.valid(...args); console.assert(r === args[0],args[0]+'=>'+r);
}


{
  args = [{r:0,g:128,b:255} ];   r = ColorParser.parseColor(...args); console.assert(r?.g === 128,args[0]+'=>'+JSON.stringify(r));
  args = [{r:0,g:128,b:255,a:0.5} ];   r = ColorParser.parseColor(...args); console.assert(r?.g === 128,args[0]+'=>'+JSON.stringify(r));
  args = ['hsl(270, 59%, 70%)'];   r = ColorParser.parseColor(...args); console.assert(r === null,args[0]+'=>'+JSON.stringify(r));
}
{
  args = ['#123'];   r = ColorParser.parseHex(...args); console.assert(r?.g === 34,args[0]+'=>'+JSON.stringify(r));
  args = ['#1234'];   r = ColorParser.parseHex(...args); console.assert(r?.g === 34,args[0]+'=>'+JSON.stringify(r));
  args = ['#112233'];   r = ColorParser.parseHex(...args); console.assert(r?.g === 34,args[0]+'=>'+JSON.stringify(r));
  args = ['#11223344'];   r = ColorParser.parseHex(...args); console.assert(r?.g === 34,args[0]+'=>'+JSON.stringify(r));
  args = ['#11223344'];   r = ColorParser.parseHexa(...args); console.assert(r?.g === 34,args[0]+'=>'+JSON.stringify(r));
  args = ['#112233448'];   r = ColorParser.parseHex(...args); console.assert(r === null,args[0]+'=>'+JSON.stringify(r));
  args = ['hsl(270, 59%, 70%)'];   r = ColorParser.parseHex(...args); console.assert(r === null,args[0]+'=>'+JSON.stringify(r));
}
{
  args = ['rgb(0,128,255)'];   r = ColorParser.parseRgba(...args); console.assert(r?.g === 128,args[0]+'=>'+JSON.stringify(r));
  args = ['rgba(0,128,255,0.5)'];   r = ColorParser.parseRgba(...args); console.assert(r?.g === 128,args[0]+'=>'+JSON.stringify(r));
  args = ['rgba(0,128.1,255,0.5)'];   r = ColorParser.parseRgba(...args,true); console.assert(r?.g === 128.1,args[0]+'=>'+JSON.stringify(r));
  args = ['rgba(0,128,255,0.5)'];   r = ColorParser.parseRgb(...args); console.assert(r?.g === 128 && r?.a === undefined,args[0]+'=>'+JSON.stringify(r));
  args = ['hsl(270, 59%, 70%)'];   r = ColorParser.parseRgba(...args); console.assert(r === null,args[0]+'=>'+JSON.stringify(r));
}
{
  args = ['hsl(270deg, 59%, 70%)'];   r = ColorParser.parseHsla(...args); console.assert(r?.g === 133,args[0]+'=>'+JSON.stringify(r));
  args = ['hsl(270, 59%, 70%)'];   r = ColorParser.parseHsla(...args); console.assert(r?.g === 133,args[0]+'=>'+JSON.stringify(r));
  args = ['hsl(270, 59%, 70%)'];   r = ColorParser.parseHsla(...args,true); console.assert(Math.round(r?.g) === 133,args[0]+'=>'+JSON.stringify(r));
  args = ['hsla(270, 59%, 70%, 0.5)'];   r = ColorParser.parseHsla(...args); console.assert(r?.g === 133,args[0]+'=>'+JSON.stringify(r));
  args = ['hsla(270, 59%, 70%, 0.5)'];   r = ColorParser.parseHsl(...args); console.assert(r?.g === 133 && r?.a === undefined,args[0]+'=>'+JSON.stringify(r));
  args = ['rgba(0,128,255,0.5)'];   r = ColorParser.parseHsla(...args); console.assert(r === null ,args[0]+'=>'+JSON.stringify(r));
}
{
  args = ['hwb(270deg, 59%, 70%)'];   r = ColorParser.parseHwba(...args); console.assert(r?.g === 150,args[0]+'=>'+JSON.stringify(r));
  args = ['hwb(270, 59%, 70%)'];   r = ColorParser.parseHwba(...args); console.assert(r?.g === 150,args[0]+'=>'+JSON.stringify(r));
  args = ['hwb(270, 59%, 70%)'];   r = ColorParser.parseHwba(...args,true); console.assert(Math.round(r?.g) === 150,args[0]+'=>'+JSON.stringify(r));
  args = ['hwba(270, 59%, 70%, 0.5)'];   r = ColorParser.parseHwba(...args); console.assert(r?.g === 150,args[0]+'=>'+JSON.stringify(r));
  args = ['hwba(270, 59%, 70%, 0.5)'];   r = ColorParser.parseHwb(...args); console.assert(r?.g === 150 && r?.a === undefined,args[0]+'=>'+JSON.stringify(r));
  args = ['rgba(0,128,255,0.5)'];   r = ColorParser.parseHwba(...args); console.assert(r === null ,args[0]+'=>'+JSON.stringify(r));
}
{
  args = ['red'];   r = ColorParser.parseNamedColor(...args); console.assert(ColorExporter.toHex(r) === (namedColors[args[0]]??null),args[0]+'=>'+JSON.stringify(r));
  args = ['rgba(0,128,255,0.5)'];   r = ColorParser.parseNamedColor(...args); console.assert(ColorExporter.toHex(r) === (namedColors[args[0]]??null),args[0]+'=>'+JSON.stringify(r));
}

{
  args = [0,128,255];   r = ColorParser.parse(...args); console.assert(r.g === 128,args[0]+'=>'+JSON.stringify(r));
  args = [0,128,255,0.5];   r = ColorParser.parse(...args); console.assert(r.g === 128,args[0]+'=>'+JSON.stringify(r));
  args = [{r:0,g:128,b:255}];   r = ColorParser.parse(...args); console.assert(r.g === 128,args[0]+'=>'+JSON.stringify(r));
  args = [{r:0,g:128,b:255,a:0.5}];   r = ColorParser.parse(...args); console.assert(r.g === 128,args[0]+'=>'+JSON.stringify(r));
  args = ['rgb(0,128,255)'];   r = ColorParser.parse(...args); console.assert(r.g === 128,args[0]+'=>'+JSON.stringify(r));
  args = ['rgba(0,128,255,0.5)'];   r = ColorParser.parse(...args); console.assert(r.g === 128,args[0]+'=>'+JSON.stringify(r));
  args = ['hsl(270, 59%, 70%)'];   r = ColorParser.parse(...args); console.assert(Math.round(r?.g) === 133,args[0]+'=>'+JSON.stringify(r));
  args = ['hsla(270, 59%, 70%, 0.5)'];   r = ColorParser.parse(...args); console.assert(Math.round(r?.g) === 133,args[0]+'=>'+JSON.stringify(r));
  args = ['hwb(270, 59%, 70%)'];   r = ColorParser.parse(...args); console.assert(Math.round(r?.g) === 150,args[0]+'=>'+JSON.stringify(r));
  args = ['hwba(270, 59%, 70%, 0.5)'];   r = ColorParser.parse(...args); console.assert(Math.round(r?.g) === 150,args[0]+'=>'+JSON.stringify(r));
}


console.log('# End: Test for ColorParser #');