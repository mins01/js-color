import colorRegExps from "./colorRegExps.js";
import namedColors from "./namedColors.js";
import ColorConverter from "./ColorConverter.js";
import ColorParser from "./ColorParser.js";
import ColorExporter from "./ColorExporter.js";
import Color from "./Color.js";

const jsColor = {
    Color,colorRegExps,namedColors,ColorConverter,ColorParser,ColorExporter
}

export default jsColor;
export {Color,colorRegExps,namedColors,ColorConverter,ColorParser,ColorExporter};

//use to: import jsColor,{Color,colorRegExps,ColorConverter,ColorParser,ColorExporter} from "./jsColor.js";