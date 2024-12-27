import colorRegExps from "./colorRegExps.js";
import ColorConverter from "./ColorConverter.js";

class Color{
	static version='v1.0.0';
	
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
		const color = this.constructor.parse(...args);	
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
		return this.constructor.validColor(color);
	}

	/**
	 * 
	 *
	 * @returns {string}
	 */
	toString(){
		return this.toRgba()
	}
	
	toJSON(){
		return this.toObject();
	}

	valueOf(){
		return this.toObject()
	}
	toObject(allowDecimal=true){
		const r = {};
		for(let k in this){
			r[k] = this[k];
		}
		if(!allowDecimal){
			r.r=Math.round(r.r);
			r.g=Math.round(r.g);
			r.b=Math.round(r.b);
		}
		return r;
	}
	toColor(){ return this.constructor.toColor(this); }
	toHex(){ return this.constructor.toHex(this); }
	toHexa(){ return this.constructor.toHexa(this); }
	toRgb(allowDecimal=false){ return this.constructor.toRgb(this,allowDecimal); }
	toRgba(allowDecimal=false){ return this.constructor.toRgba(this,allowDecimal); }
	toHsl(allowDecimal=false){ return this.constructor.toHsl(this,allowDecimal); }
	toHsla(allowDecimal=false){ return this.constructor.toHsla(this,allowDecimal); }

	setR(v){ if(this.constructor.validR(v)===null){ throw new Error(`Red must be between 0 and 255. (${v})`); } this.#r = v; }
	setG(v){ if(this.constructor.validG(v)===null){ throw new Error(`Green must be between 0 and 255. (${v})`); } this.#g = v; }
	setB(v){ if(this.constructor.validB(v)===null){ throw new Error(`Blue must be between 0 and 255. (${v})`); } this.#b = v; }
	setA(v){ if(this.constructor.validA(v)===null){ throw new Error(`Alpha must be between 0 and 1. (${v})`); } this.#a = v; }

	get r(){return this.#r;}
	set r(v){this.setR(v);}
	get g(){return this.#g;}
	set g(v){this.setG(v);}
	get b(){return this.#b;}
	set b(v){this.setB(v);}
	get a(){return this.#a;}
	set a(v){this.setA(v);}

	/* static area */

	/**
	 * generate Color object from argument
	 *
	 * @static
	 * @param {...{}} args
	 * @returns {Color}
	 */
	static from(...args){
		return new this(this.parse(...args));
	}

	/**
	 * generate object from argument
	 *
	 * @static
	 * @param {...{}} args
	 * @returns {{ r: any; g: any; b: any; a: number; }}
	 */
	static parse(...args){
		let v = null;
		if(args.length === 1){
			v = args[0];
		}else if(args.length === 3){
			v = {r:args[0],g:args[1],b:args[2]};
		}else if(args.length === 4){
			v = {r:args[0],g:args[1],b:args[2],a:args[3]};
		}else{
			return null;
		}
		
		if(!v){
			return null;
		}else if(typeof v === "object" ){
			return this.parseColor(v);
		}else{
			return this.parseHex(v)??this.parseRgb(v)??this.parseHsl(v);
		}
	}


	static validR(v){ return (isNaN(v) || v<0 || v>255)?null:v; }
	static validG(v){ return this.validR(v); }
	static validB(v){ return this.validR(v); }
	static validH(v){ return (isNaN(v) || v<0 || v>360)?null:v; }
	static validS(v){ return (isNaN(v) || v<0 || v>100)?null:v; }
	static validL(v){ return this.validS(v); }
	static validA(v){ return (isNaN(v) || v<0 || v>1)?null:v; }

	/**
	 * valid Hex
	 *
	 * @static
	 * @param {*} v
	 * @returns {string|null} v or null
	 */
	static validHex(v){
		v = v.replace(/\s/g,'').toLowerCase();
		return /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v)?v:null;
	}
	/**
	 * parse hex string
	 *
	 * @static
	 * @param {string} v HEX string
	 * @returns {{ r: any; g: any; b: any; a: number; }}
	 */
	static parseHex(v){
		if(!(v = this.validHex(v))){ return null; }
		const s = v.substring(1); // remove #
		const len = s.length
		
		if(len==3){ return { r:parseInt(s[0]+s[0],16), g:parseInt(s[1]+s[1],16), b:parseInt(s[2]+s[2],16), a:1 }; }
		else if(len==4){ return { r:parseInt(s[0]+s[0],16), g:parseInt(s[1]+s[1],16), b:parseInt(s[2]+s[2],16), a:parseInt(s[3]+s[3],16)/255 }; }
		else if(len==6){ return { r:parseInt(s.substring(0,2),16), g:parseInt(s.substring(2,4),16), b:parseInt(s.substring(4,6),16), a:1 }; }
		else if(len==8){ return { r:parseInt(s.substring(0,2),16), g:parseInt(s.substring(2,4),16), b:parseInt(s.substring(4,6),16), a:parseInt(s.substring(6,8),16)/255 }; }
		return null;
	}
	
	
	/**
	 * valid Rgb
	 *
	 * @static
	 * @param {*} v
	 * @returns {string|null} v or null
	 */
	static validRgb(v){
		return colorRegExps.rgba.test(v)?v:null;
	}
	
	/**
	 * 
	 * @alias validRgb
	 * @static
	 * @param {*} v
	 * @returns {string}
	 */
	static validRgba(v){
		return this.validRgb(v)
	}
	
	/**
	 * 
	 *
	 * @static
	 * @param {*} v
	 * @returns {{ r: any; g: any; b: any; a: any; }}
	 */
	static parseRgb(v){
		const regexpRgba = new RegExp(
			colorRegExps.rgba.source,
			colorRegExps.rgba.flags + "g",
		);
		const rs = v.matchAll(regexpRgba); if(!rs){ return null}
		const rvs = [...rs]; if(!rvs || !rvs[0]){ return null}
		
		let r = rvs[0][1]??null;
		let g = rvs[0][2]??null;
		let b = rvs[0][3]??null;
		let a = rvs[0][4]??null;
		if(r!==null) r = (r.lastIndexOf('%') !== -1)?Math.round(parseFloat(r)/100*255):parseFloat(r);
		if(g!==null) g = (g.lastIndexOf('%') !== -1)?Math.round(parseFloat(g)/100*255):parseFloat(g);
		if(b!==null) b = (b.lastIndexOf('%') !== -1)?Math.round(parseFloat(b)/100*255):parseFloat(b);
		if(a!==null) a = (a.lastIndexOf('%') !== -1)?parseFloat(a)/100:parseFloat(a);
		
		if(r===null || b=== null || g===null){return null;}
		return { r:r, g:g, b:b, a:(a??1) };
	}

	static parseRgba(v){
		return this.parseRgb(v);
	}

	static validHsl(v){
		return colorRegExps.hsla.test(v)?v:null;
	}

	static validHsla(v){
		return this.validHsl(v);
	}
	
	static parseHsl(v){
		const regexpHsla = new RegExp(
			colorRegExps.hsla.source,
			colorRegExps.hsla.flags + "g",
		);
		const rs = v.matchAll(regexpHsla); if(!rs){ return null}
		const rvs = [...rs]; if(!rvs || !rvs[0]){ return null}
		
		let h = rvs[0][1]??null;
		let s = rvs[0][2]??null;
		let l = rvs[0][3]??null;
		let a = rvs[0][4]??null;

		// deg|rad|grad|turn
		if(h.lastIndexOf('deg') !== -1){ h = parseFloat(h); }
		else if(h.lastIndexOf('rad') !== -1){ h = parseFloat(h) * (180/Math.PI); }
		else if(h.lastIndexOf('grad') !== -1){ h = parseFloat(h) * (180/200); }
		else if(h.lastIndexOf('turn') !== -1){ h = parseFloat(h) * 360; }
		else{ h = parseFloat(h); }
		h = (360+ h % 360) % 360; // 0-360

		if(s!==null) s = (s.lastIndexOf('%') !== -1)?parseFloat(s):parseFloat(s)*100; //0-100
		if(l!==null) l = (l.lastIndexOf('%') !== -1)?parseFloat(l):parseFloat(l)*100; //0-100
		if(a!==null) a = (a.lastIndexOf('%') !== -1)?parseFloat(a)/100:parseFloat(a); //0-1

		if(h===null || s=== null || l===null){return null;}
		const rgb = ColorConverter.hslToRgb(h,s,l,true);
		return { r:rgb.r, g:rgb.g, b:rgb.b, a:(a??1)};
	}
	
	static parseHsla(v){
		return this.parseHsl(v);
	}

	/**
	 * 
	 *
	 * @static
	 * @param {*} color
	 * @returns {string}
	 */
	static toHex(color){
		if(!this.validColor(color)){ return null;}
		return '#' + Math.round(color.r).toString(16).padStart(2, '0') + Math.round(color.g).toString(16).padStart(2, '0') + Math.round(color.b).toString(16).padStart(2, '0');		
	}
	static toHexa(color){
		if(!this.validColor(color)){ return null;}
		return '#' + Math.round(color.r).toString(16).padStart(2, '0') + Math.round(color.g).toString(16).padStart(2, '0') + Math.round(color.b).toString(16).padStart(2, '0') + Math.round((color?.a??1)*255).toString(16).padStart(2, '0');
	}
	

	
	static toRgb(color, allowDecimal=false){
		if(!this.validColor(color)){ return null;}
		if(!allowDecimal){ return `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`; }
		return `rgb(${color.r}, ${color.g}, ${color.b})`;
	}
	static toRgba(color, allowDecimal=false){
		if(!this.validColor(color)){ return null;}
		if(!allowDecimal){ return `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${color.a??1})`;}
		return `rgba(${color.r}, ${color.g}, ${color.b}, ${color?.a??1})`; 		
	}

	static toHsl(color, allowDecimal=false){
		if(!this.validColor(color)){ return null; }
		const hsl = ColorConverter.rgbToHsl(color.r,color.g,color.b,allowDecimal);
		return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
	}
	static toHsla(color, allowDecimal=false){
		if(!this.validColor(color)){ return null; }
		const hsl = ColorConverter.rgbToHsl(color.r,color.g,color.b,allowDecimal);
		return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${color?.a??1})`;
	}



	static validColor(color){
		if(!color){ return null; }
		if(this.validR(color?.r??null)===null || this.validG(color?.g??null)===null || this.validB(color?.b??null)===null || this.validA(color?.a??1)===null){return null; }
		return color;
	}


	static parseColor(color){
		if(!this.validColor(color)){return null;}
		return color;
	}

	static toColor(props){ return this.parseColor(props); }

}

// enumerable. 열거가능처리.
['r','g','b','a'].forEach((v)=>{
	const d = Object.getOwnPropertyDescriptor(Color.prototype,v); d.enumerable=true; Object.defineProperty(Color.prototype,v,d);
})

export default Color;