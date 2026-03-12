import ColorExporter from "../src/ColorExporter.js";

console.log('# Start: Test for ColorExporter #');

let v , r , args, color;
{
  color = {r:0,g:128.4,b:255,a:0.5};
  args = [color];   r = ColorExporter.toObject(...args); console.assert(r?.g === 128.4 && r?.a === 0.5, JSON.stringify(args[0])+'=>'+JSON.stringify(r));
  args = [color];   r = ColorExporter.toColor(...args); console.assert(r?.g === 128.4 && r?.a === 0.5, JSON.stringify(args[0])+'=>'+JSON.stringify(r));
  args = [color];   r = ColorExporter.toRgb(...args); console.assert(r === 'rgb(0, 128, 255)', JSON.stringify(args[0])+'=>'+JSON.stringify(r));
  args = [color];   r = ColorExporter.toRgba(...args); console.assert(r === 'rgba(0, 128, 255, 0.5)', JSON.stringify(args[0])+'=>'+JSON.stringify(r));
  args = [color];   r = ColorExporter.toRgb(...args, true); console.assert(r === 'rgb(0, 128.4, 255)', JSON.stringify(args[0])+'=>'+JSON.stringify(r));
  args = [color];   r = ColorExporter.toRgba(...args, true); console.assert(r === 'rgba(0, 128.4, 255, 0.5)', JSON.stringify(args[0])+'=>'+JSON.stringify(r));
  args = [color];   r = ColorExporter.toHsl(...args); console.assert(r === 'hsl(210, 100%, 50%)', JSON.stringify(args[0])+'=>'+JSON.stringify(r));
  args = [color];   r = ColorExporter.toHsla(...args); console.assert(r === 'hsla(210, 100%, 50%, 0.5)', JSON.stringify(args[0])+'=>'+JSON.stringify(r));
  args = [color];   r = ColorExporter.toHsl(...args, true); console.assert(r === 'hsl(209.78823529411764, 100%, 50%)', JSON.stringify(args[0])+'=>'+JSON.stringify(r));
  args = [color];   r = ColorExporter.toHsla(...args, true); console.assert(r === 'hsla(209.78823529411764, 100%, 50%, 0.5)', JSON.stringify(args[0])+'=>'+JSON.stringify(r));
}
console.log('# End: Test for ColorExporter #');