import jsColor,{Color,colorRegExps,ColorConverter} from "../lib/index.js";

console.log('Start: Test for index');

console.log('jsColor keys: ',Object.keys(jsColor));
console.assert(jsColor.Color === Color,'jsColor.Color !== Color')
console.assert(jsColor.colorRegExps === colorRegExps,'jsColor.colorRegExps !== colorRegExps')
console.assert(jsColor.ColorConverter === ColorConverter,'jsColor.ColorConverter !== ColorConverter')
console.assert(jsColor.Color.from(0,128,255).toRgba(true) === Color.from(0,128,255).toRgba(true),'jsColor.Color.from(0,128,255).toRgba(true) !== Color.from(0,128,255).toRgba(true)');

console.log('End: Test for index');
