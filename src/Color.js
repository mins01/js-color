class Color{
	static version='v1.0.0';
	
	type=null;
	format=null;
	// r=null;
	// g=null;
	// b=null;
	// a=null;
	#r;#g;#b;#a;
	constructor(...args){
		this.type = "rgb";
		this.format = "hex";
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = null;

		if(args.length>0){
			this.set(...args);
		}
	}
	
	set(...args){			
		const color = this.constructor.parse(...args);
		if(color){ Object.assign(this, color); }
		else{ throw new Error("지원되지 않는 형식입니다. "+JSON.stringify(args)); }
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
			case 'hexa':return this.toHexa(); break;
			case 'rgb':return this.toRgb(); break;
			case 'rgba':return this.toRgba(); break;
			case 'hsl':return this.toHsl(); break;
			case 'hsla':return this.toHsla(); break;
			default:return this.toHex();break;
		}
		return this.toHex();
	}
	
	toJSON(){
		return this.toObject();
	}

	valueOf(){
		return this.toObject()
	}

	toRgb(){ return this.constructor.toRgb(this); }
	toRgba(){ return this.constructor.toRgba(this); }
	toHex(){ return this.constructor.toHex(this); }
	toHexa(){ return this.constructor.toHexa(this); }
	toColor(){ return this.constructor.toColor(this); }
	toHsl(){ return this.constructor.toHsl(this); }
	toHsla(){ return this.constructor.toHsla(this); }

	setR(v){ if(Number.isNaN(v) || v<0 || v>255){ throw new Error(`Red must be between 0 and 255. (${v})`); } this.#r = v; }
	setG(v){ if(Number.isNaN(v) || v<0 || v>255){ throw new Error(`Green must be between 0 and 255. (${v})`); } this.#g = v; }
	setB(v){ if(Number.isNaN(v) || v<0 || v>255){ throw new Error(`Blue must be between 0 and 255. (${v})`); } this.#b = v; }
	setA(v){ if(Number.isNaN(v) || v<0 || v>1){ throw new Error(`Alpha must be between 0 and 1. (${v})`); } this.#a = v; }

	get r(){return this.#r;}
	get g(){return this.#g;}
	get b(){return this.#b;}
	get a(){return this.#a;}
	set r(v){this.setR(v);}
	set g(v){this.setG(v);}
	set b(v){this.setB(v);}
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
			return this.parseHex(v)??this.parseRgb(v)??this.parseHsl(v);
		}
	}

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
	 * @returns {{ type: string; format: string; r: any; g: any; b: any; a: number; }}
	 */
	static parseHex(v){
		if(!(v = this.validHex(v))){ return null; }
		const s = v.substring(1); // remove #
		const len = s.length
		
		if(len==3){ return { type:'rgb', format:'hex', r:parseInt(s[0]+s[0],16), g:parseInt(s[1]+s[1],16), b:parseInt(s[2]+s[2],16), a:null }; }
		else if(len==4){ return { type:'rgba', format:'hexa', r:parseInt(s[0]+s[0],16), g:parseInt(s[1]+s[1],16), b:parseInt(s[2]+s[2],16), a:parseInt(s[3]+s[3],16)/255 }; }
		else if(len==6){ return { type:'rgb', format:'hex', r:parseInt(s.substring(0,2),16), g:parseInt(s.substring(2,4),16), b:parseInt(s.substring(4,6),16), a:null }; }
		else if(len==8){ return { type:'rgba', format:'hexa', r:parseInt(s.substring(0,2),16), g:parseInt(s.substring(2,4),16), b:parseInt(s.substring(4,6),16), a:parseInt(s.substring(6,8),16)/255 }; }
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
	static validRgb(v){
		return this.regexpRgba.test(v)?v:null;
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
		return {type:(a!==null)?'rgba':'rgb', format:(a!==null)?'rgba':'rgb', r:r, g:g, b:b, a:a };
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


	static regexpHsla = /^(?:hsla?\(\s*)([-+]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?(?:deg|rad|grad|turn)?)(?:\s*,\s*|\s+)([-+]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?%)(?:\s*,\s*|\s+)([-+]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?%)(?:\s*[,\/]\s*)?([-+]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?%?)?(?:\s*\))$/;

	static validHsl(v){
		return this.regexpHsla.test(v)?v:null;
	}

	static validHsla(v){
		return this.validHsl(v);
	}
	
	static parseHsl(v){
		const regexpHsla = new RegExp(
			this.regexpHsla.source,
			this.regexpHsla.flags + "g",
		);
		const rs = v.matchAll(regexpHsla); if(!rs){ return null}
		const rvs = [...rs]; if(!rvs || !rvs[0]){ return null}
		
		let h = rvs[0][1]??null;
		let s = rvs[0][2]??null;
		let l = rvs[0][3]??null;
		let a = rvs[0][4]??null;

		// deg|rad|grad|turn
		if(h.lastIndexOf('deg')!==-1){
			h = parseFloat(h);
		}else if(h.lastIndexOf('rad')!==-1){
			h = parseFloat(h) * (180/Math.PI);
		}else if(h.lastIndexOf('grad')!==-1){
			h = parseFloat(h) * (200/Math.PI);
		}else if(h.lastIndexOf('turn')!==-1){
			h = parseFloat(h) * 360;
		}else{

		}
		h = (360+ h % 360) % 360;
		// if(h!==null) h = (h.lastIndexOf('%') !== -1)?Math.round(parseFloat(h)/100*255):parseFloat(h);
		if(s!==null) s = (s.lastIndexOf('%') !== -1)?parseFloat(s):parseFloat(s)*100; //0-100 사이의 값으로 바꿈
		if(l!==null) l = (l.lastIndexOf('%') !== -1)?parseFloat(l):parseFloat(l)*100; //0-100 사이의 값으로 바꿈
		if(a!==null) a = (a.lastIndexOf('%') !== -1)?parseFloat(a)/100:parseFloat(a); //0-1 사이의 값으로 바꿈
		// console.log(v,'=>',h,s,l,a);
		if(h===null || s=== null || l===null){return null;}
		const c = this.hsl2rgb(h,s,l);
		// console.log(v,'=>',c,a);
		return {type:(a!==null)?'rgba':'rgb', format:(a!==null)?'hsla':'hsl', r:c.r, g:c.g, b:c.b, a:a };
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
		return '#' + color.r.toString(16).padStart(2, '0') + color.g.toString(16).padStart(2, '0') + color.b.toString(16).padStart(2, '0');		
	}
	static toHexa(color){
		if(!this.validColor(color)){ return null;}
		return '#' + color.r.toString(16).padStart(2, '0') + color.g.toString(16).padStart(2, '0') + color.b.toString(16).padStart(2, '0') + Math.round((color?.a??1)*255).toString(16).padStart(2, '0');
	}
	

	
	/**
	 * 
	 *
	 * @static
	 * @param {*} color
	 * @returns {string}
	 */
	static toRgb(color){
		if(!this.validColor(color)){ return null;}
		return `rgb(${color.r}, ${color.g}, ${color.b})`;
	}
	/**
	 * 
	 * @alias toRgb
	 * @static
	 * @param {*} color
	 * @returns {string}
	 */
	static toRgba(color){
		if(!this.validColor(color)){ return null;}
		return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a??1})`;
	}

	static toHsl(color){
		if(!this.validColor(color)){ return null;}
		const hsl = this.rgb2hsl(color.r,color.g,color.b);
		return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
	}
	static toHsla(color){
		if(!this.validColor(color)){ return null;}
		const hsl = this.rgb2hsl(color.r,color.g,color.b);
		return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${color.a??1})`;
	}



	static validColor(color){
		if(!color || isNaN(color?.r) || isNaN(color?.g) || isNaN(color?.b)){ return null; }
		// if(isNaN(color.r) || isNaN(color.g) || isNaN(color.b) ){return null;}
		if(color.r<0 || color.r>255 ||color.g<0 || color.g>255 ||color.b<0 || color.b>255 ){return null;}
		if(color.a === null || color.a === undefined){ }else if(isNaN(color.a) || color.a<0 || color.a>1){return null;}	
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
	

  // http://hsl2rgb.nichabi.com/javascript-function.php
  static hsl2rgb (h, s, l) {
    var r, g, b, m, c, x
    
    if (!isFinite(h)) h = 0
    if (!isFinite(s)) s = 0
    if (!isFinite(l)) l = 0
    
    h /= 60
    if (h < 0) h = 6 - (-h % 6)
    h %= 6
    
    s = Math.max(0, Math.min(1, s / 100))
    l = Math.max(0, Math.min(1, l / 100))
    
    c = (1 - Math.abs((2 * l) - 1)) * s
    x = c * (1 - Math.abs((h % 2) - 1))
    
    if (h < 1) {
      r = c
      g = x
      b = 0
    } else if (h < 2) {
      r = x
      g = c
      b = 0
    } else if (h < 3) {
      r = 0
      g = c
      b = x
    } else if (h < 4) {
      r = 0
      g = x
      b = c
    } else if (h < 5) {
      r = x
      g = 0
      b = c
    } else {
      r = c
      g = 0
      b = x
    }
    
    m = l - c / 2
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)
    
    return { r: r, g: g, b: b }
    
  }
	// http://rgb2hsl.nichabi.com/javascript-function.php
	static rgb2hsl (r, g, b) {
		var max, min, h, s, l, d
		r /= 255
		g /= 255
		b /= 255
		max = Math.max(r, g, b)
		min = Math.min(r, g, b)
		l = (max + min) / 2
		if (max == min) {
			h = s = 0
		} else {
			d = max - min
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
			switch (max) {
				case r:
				h = (g - b) / d + (g < b ? 6 : 0)
				break
				case g:
				h = (b - r) / d + 2
				break
				case b:
				h = (r - g) / d + 4
				break
			}
			h /= 6
		}
		h = Math.round(h * 360) //floor -> round
		s = Math.round(s * 100) //floor -> round
		l = Math.round(l * 100) //floor -> round
		return { h: h, s: s, l: l }
	}


}
{	const d = Object.getOwnPropertyDescriptor(Color.prototype,'r'); d.enumerable=true; Object.defineProperty(Color.prototype,'r',d); }
{	const d = Object.getOwnPropertyDescriptor(Color.prototype,'g'); d.enumerable=true; Object.defineProperty(Color.prototype,'g',d); }
{	const d = Object.getOwnPropertyDescriptor(Color.prototype,'b'); d.enumerable=true; Object.defineProperty(Color.prototype,'b',d); }
{	const d = Object.getOwnPropertyDescriptor(Color.prototype,'a'); d.enumerable=true; Object.defineProperty(Color.prototype,'a',d); }


export default Color;