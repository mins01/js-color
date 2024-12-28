import ColorParser from "./ColorParser.js";
import ColorConverter from "./ColorConverter.js";

export default class ColorExporter{
  static toHex(color){
		if(!ColorParser.validColor(color)){ return null;}
		return '#' + Math.round(color.r).toString(16).padStart(2, '0') + Math.round(color.g).toString(16).padStart(2, '0') + Math.round(color.b).toString(16).padStart(2, '0');		
	}
	static toHexa(color){
		if(!ColorParser.validColor(color)){ return null;}
		return '#' + Math.round(color.r).toString(16).padStart(2, '0') + Math.round(color.g).toString(16).padStart(2, '0') + Math.round(color.b).toString(16).padStart(2, '0') + Math.round((color?.a??1)*255).toString(16).padStart(2, '0');
	}
	
	static toRgb(color, allowDecimal=false){
		if(!ColorParser.validColor(color)){ return null;}
		if(!allowDecimal){ return `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`; }
		return `rgb(${color.r}, ${color.g}, ${color.b})`;
	}
	static toRgba(color, allowDecimal=false){
		if(!ColorParser.validColor(color)){ return null;}
		if(!allowDecimal){ return `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${color.a??1})`;}
		return `rgba(${color.r}, ${color.g}, ${color.b}, ${color?.a??1})`; 		
	}

	static toHsl(color, allowDecimal=false){
		if(!ColorParser.validColor(color)){ return null; }
		const hsl = ColorConverter.rgbToHsl(color.r,color.g,color.b,allowDecimal);
		return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
	}
	static toHsla(color, allowDecimal=false){
		if(!ColorParser.validColor(color)){ return null; }
		const hsl = ColorConverter.rgbToHsl(color.r,color.g,color.b,allowDecimal);
		return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${color?.a??1})`;
	}

	static toColor(color){ return ColorParser.parseColor(color); }

  static toObject(color,allowDecimal=true){
    const r = {};
		for(let k in color){ r[k] = color[k]; }
		if(!allowDecimal){
			r.r=Math.round(r.r);
			r.g=Math.round(r.g);
			r.b=Math.round(r.b);
		}
		return r;
  }
}