class Color{
	type=null;
	format=null;
	r=null;
	g=null;
	b=null;
	a=null;
	
	constructor(color=null){
		this.type = "rgb";
		this.format = "hex";
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = null;

		if(color !== null){
			this.set(color);
		}
	}
	
	set(color){
		if(this.valid(color)){
			Object.assign(this, color);
		}else{
			throw new Error("Invalid color object");
		}
	}

	get(){
		return this.toObject();
	}

	toObject(){
		const r = {};
		for(let k in this){
			r[k] = this[k];
		}
		return r;
	}
	
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
		switch(this.format??'hex'){
			case 'hex':return this.toHex(); break;
			case 'rgb':return this.toRgb(); break;
			case 'rgba':return this.toRgba(); break;
			default:return this.toHex();break;
		}
		return this.toHex();
	}
	
	toJSON(){
		return this.toObject();
	}

	toRgb(){ return this.constructor.toRgb(this); }

	toRgba(){ return this.constructor.toRgba(this); }

	toHex(){ return this.constructor.toHex(this); }

	toColor(){ return this.constructor.toColor(this); }

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
	 * @returns {{ type: string; format: string; r: any; g: any; b: any; a: number; }}
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
			return false;
		}
		
		if(!v){
			return null;
		}else if(typeof v === "object" ){
			return this.parseColor(v);
		}else{
			return this.parseHex(v)??this.parseRgb(v);
		}
	}

	/**
	 * valid Hex
	 *
	 * @static
	 * @param {*} v
	 * @returns {string|null} v or null
	 */
	static vaildHex(v){
		v = v.replace(/\s/g,'').toLowerCase();
		return /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v)?v:null;
	}
	/**
	 * parse hex string
	 *
	 * @static
	 * @param {string} v HEX string
	 * @returns {{ type: string; format: string; r: any; g: any; b: any; a: number; }}
	 */
	static parseHex(v){
		if(!(v = this.vaildHex(v))){ return null; }
		const s = v.substring(1); // remove #
		const len = s.length
		
		if(len==3){ return { type:'rgb', format:'hex', r:parseInt(s[0]+s[0],16), g:parseInt(s[1]+s[1],16), b:parseInt(s[2]+s[2],16), a:null }; }
		else if(len==4){ return { type:'rgba', format:'hex', r:parseInt(s[0]+s[0],16), g:parseInt(s[1]+s[1],16), b:parseInt(s[2]+s[2],16), a:parseInt(s[3]+s[3],16)/255 }; }
		else if(len==6){ return { type:'rgb', format:'hex', r:parseInt(s.substring(0,2),16), g:parseInt(s.substring(2,4),16), b:parseInt(s.substring(4,6),16), a:null }; }
		else if(len==8){ return { type:'rgba', format:'hex', r:parseInt(s.substring(0,2),16), g:parseInt(s.substring(2,4),16), b:parseInt(s.substring(4,6),16), a:parseInt(s.substring(6,8),16)/255 }; }
		return null;
	}
	
	// static regexpRgba = /^(?:rgba?\(\s*)((?:[1-9][0-9]{0,2}|0)%?)(?:\s*,\s*|\s+)((?:[1-9][0-9]{0,2}|0)%?)(?:\s*,\s*|\s+)((?:[1-9][0-9]{0,2}|0)%?)(?:\s*[,\/]\s*)?((?:[1-9][0-9]{0,2}|0|0?\.\d+)%?)?(?:\s*\))$/;
	static regexpRgba = /^(?:rgba?\(\s*)([-+]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?%?)(?:\s*,\s*|\s+)([-+]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?%?)(?:\s*,\s*|\s+)([-+]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?%?)(?:\s*[,\/]\s*)?([-+]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?%?)?(?:\s*\))$/;
	
	/**
	 * valid Rgb
	 *
	 * @static
	 * @param {*} v
	 * @returns {string|null} v or null
	 */
	static vaildRgb(v){
		return this.regexpRgba.test(v)?v:null;
	}
	
	/**
	 * 
	 * @alias vaildRgb
	 * @static
	 * @param {*} v
	 * @returns {string}
	 */
	static vaildRgba(v){
		return this.vaildRgb(v)
	}
	
	/**
	 * 
	 *
	 * @static
	 * @param {*} v
	 * @returns {{ type: string; format: string; r: any; g: any; b: any; a: any; }}
	 */
	static parseRgb(v){
		const regexpRgba = new RegExp(
			this.regexpRgba.source,
			this.regexpRgba.flags + "g",
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
		return {type:(a!==null)?'rgba':'rgb', format:'rgb', r:r, g:g, b:b, a:a };
	}
	/**
	 * 
	 *
	 * @static
	 * @param {*} v
	 * @returns {{ type: string; format: string; r: any; g: any; b: any; a: any; }}
	 */
	static parseRgba(v){
		return this.parseRgb(v);
	}
	
	
	
	/**
	 * 
	 *
	 * @static
	 * @param {*} color
	 * @returns {string}
	 */
	static toHex(color){
		if(!color || !Object.hasOwn(color, "r") || !Object.hasOwn(color, "g") || !Object.hasOwn(color, "b")){ return null; }
		if((color?.a??null)===null){
			return '#' + color.r.toString(16).padStart(2, '0') + color.g.toString(16).padStart(2, '0') + color.b.toString(16).padStart(2, '0');
		}else{
			return '#' + color.r.toString(16).padStart(2, '0') + color.g.toString(16).padStart(2, '0') + color.b.toString(16).padStart(2, '0') + Math.round(color.a*255).toString(16).padStart(2, '0');
		}
	}
	

	
	/**
	 * 
	 *
	 * @static
	 * @param {*} color
	 * @returns {string}
	 */
	static toRgb(color){
		if(!color || !Object.hasOwn(color, "r") || !Object.hasOwn(color, "g") || !Object.hasOwn(color, "b")){ return null; }

		if((color?.a??null)===null){
			return `rgb(${color.r}, ${color.g}, ${color.b})`;
		}else{
			return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
		}
	}
	/**
	 * 
	 * @alias toRgb
	 * @static
	 * @param {*} color
	 * @returns {string}
	 */
	static toRgba(color){ return this.toRgb(color); }




	static validColor(color){
		if(!color || !Object.hasOwn(color, "r") || !Object.hasOwn(color, "g") || !Object.hasOwn(color, "b")){ return null; }
		if(Number.isNaN(color.r) || Number.isNaN(color.g) || Number.isNaN(color.b) ){return null;}
		if(color.r<0 || color.r>255 ||color.g<0 || color.g>255 ||color.b<0 || color.b>255 ){return null;}
		if(color.a !== null && (Number.isNaN(color.a) || color.a<0 || color.a>1)){return null;}
		return color;
	}
	
	/**
	 * 
	 *
	 * @static
	 * @param {*} color
	 * @returns {*}
	 */
	static parseColor(color){
		if(!this.validColor(color)){return null;}
		return color;
	}
	/**
	 * 
	 *
	 * @static
	 * @param {*} props
	 * @returns {*}
	 */
	static toColor(props){ return this.parseColor(props); }
	

	

}

export default Color;