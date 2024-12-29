import colorRegExps from "./colorRegExps.js";
import ColorConverter from "./ColorConverter.js";
import ColorParser from "./ColorParser.js";
import ColorExporter from "./ColorExporter.js";

class Color{	
	// r=null;
	// g=null;
	// b=null;
	// a=null;
	#r=0;#g=0;#b=0;
	#a=1;
	constructor(...args){
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 1;

		if(args.length>0){
			this.set(...args);
		}
	}
	
	set(...args){			
		const color = ColorParser.parseWithDecimal(...args);	
		if(color){ Object.assign(this, color); }
		else{ throw new Error("Unsupported format. "+JSON.stringify(args)); }
	}

	get(){ return this.toObject(true); }
	
	/**
	 * valide color
	 *
	 * @param {*} [color=null]
	 * @returns {*}
	 */
	valid(color=null){
		if(!color) color = this;
		return ColorParser.validColor(color);
	}

	toString(format='rgba'){
		switch(format){
			case 'rgba':return this.toRgba();return;
			case 'rgb':return this.toRgb();return;
			case 'hsla':return this.toHsla();return;
			case 'hsl':return this.toHsl();return;
			case 'hexa':return this.toHexa();return;
			case 'hex':return this.toHex();return;
		}
		return this.toRgba(); 
	}
	toJSON(){ return this.toObject(); }
	valueOf(){ return this.toObject(); }
	toObject(allowDecimal=true){ return ColorExporter.toObject(this,allowDecimal);}
	toColor(){ return ColorExporter.toColor(this); }
	toHex(){ return ColorExporter.toHex(this); }
	toHexa(){ return ColorExporter.toHexa(this); }
	toRgb(allowDecimal=false){ return ColorExporter.toRgb(this,allowDecimal); }
	toRgba(allowDecimal=false){ return ColorExporter.toRgba(this,allowDecimal); }
	toHsl(allowDecimal=false){ return ColorExporter.toHsl(this,allowDecimal); }
	toHsla(allowDecimal=false){ return ColorExporter.toHsla(this,allowDecimal); }
	toHwb(allowDecimal=false){ return ColorExporter.toHwb(this,allowDecimal); }
	toHwba(allowDecimal=false){ return ColorExporter.toHwba(this,allowDecimal); }

	setR(v){ if(ColorParser.validRed(v)===null){ throw new Error(`Red must be between 0 and 255. (${v})`); } this.#r = v; }
	setG(v){ if(ColorParser.validGreen(v)===null){ throw new Error(`Green must be between 0 and 255. (${v})`); } this.#g = v; }
	setB(v){ if(ColorParser.validBlue(v)===null){ throw new Error(`Blue must be between 0 and 255. (${v})`); } this.#b = v; }
	setA(v){ if(ColorParser.validAlpha(v)===null){ throw new Error(`Alpha must be between 0 and 1. (${v})`); } this.#a = v; }

	get r(){return this.#r;}
	set r(v){this.setR(v);}
	get g(){return this.#g;}
	set g(v){this.setG(v);}
	get b(){return this.#b;}
	set b(v){this.setB(v);}
	get a(){return this.#a;}
	set a(v){this.setA(v);}

	/* static area */
	static from(...args){
		return new this( ColorParser.parseWithDecimal(...args) );
	}

	

}

// enumerable. 열거가능처리.
['r','g','b','a'].forEach((v)=>{
	const d = Object.getOwnPropertyDescriptor(Color.prototype,v); d.enumerable=true; Object.defineProperty(Color.prototype,v,d);
})

export default Color;