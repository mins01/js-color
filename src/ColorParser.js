import colorRegExps from "./colorRegExps.js";
import namedColors from "./namedColors.js";
import ColorConverter from "./ColorConverter.js";

export default class ColorParser{
	static validRed(v){ return (isNaN(v) || v<0 || v>255)?null:v; }
	static validGreen(v){ return this.validRed(v); }
	static validBlue(v){ return this.validRed(v); }
	static validHue(v){ return (isNaN(v) || v<0 || v>360)?null:v; }
	static validSaturation(v){ return (isNaN(v) || v<0 || v>100)?null:v; }
	static validLightness(v){ return this.validSaturation(v); }
	static validAlpha(v){ return (isNaN(v) || v<0 || v>1)?null:v; }


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
			return this.parseNamedColor(v)??this.parseHexa(v)??this.parseRgba(v)??this.parseHsla(v);
		}
	}

	static parseWithDecimal(...args){
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
			return this.parseNamedColor(v)??this.parseHexa(v)??this.parseRgba(v,true)??this.parseHsla(v,true);
		}
	}

	static valid(...args){
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
			return this.validColor(v);
		}else{
			return this.validNamedColor(v)??this.validHexa(v)??this.validRgba(v)??this.validHsla(v);
		}
	}


	static validColor(color){
		if(!color){ return null; }
		if(this.validRed(color?.r??null)===null || this.validGreen(color?.g??null)===null || this.validBlue(color?.b??null)===null || this.validAlpha(color?.a??1)===null){return null; }
		return color;
	}


	static parseColor(color){
		if(!this.validColor(color)){return null;}
		return color;
	}

	static validNamedColor(v){
		return namedColors[v]?v:null;
	}
	static parseNamedColor(v){
		return namedColors[v]?this.parseHexa(namedColors[v]):null;
	}

	static validHexa(v){
		return /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v)?v:null;
	}
	static validHex(v){
		return this.validHexa(v);
	}


	static parseHexa(v){
		if(!(v = this.validHex(v))){ return null; }
		const s = v.substring(1); // remove #
		const len = s.length
		
		if(len==3){ return { r:parseInt(s[0]+s[0],16), g:parseInt(s[1]+s[1],16), b:parseInt(s[2]+s[2],16), a:1 }; }
		else if(len==4){ return { r:parseInt(s[0]+s[0],16), g:parseInt(s[1]+s[1],16), b:parseInt(s[2]+s[2],16), a:parseInt(s[3]+s[3],16)/255 }; }
		else if(len==6){ return { r:parseInt(s.substring(0,2),16), g:parseInt(s.substring(2,4),16), b:parseInt(s.substring(4,6),16), a:1 }; }
		else if(len==8){ return { r:parseInt(s.substring(0,2),16), g:parseInt(s.substring(2,4),16), b:parseInt(s.substring(4,6),16), a:parseInt(s.substring(6,8),16)/255 }; }
		return null;
	}
	static parseHex(v){
		const r = this.parseHexa(v);
		if(r){ delete r.a;}
		return r;
	}





	static validRgba(v){
		return colorRegExps.rgba.test(v)?v:null;
	}
	static validRgb(v){
		return this.validRgba(v);
	}

	static parseRgba(v,allowDecimal=false){
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
		if(r!==null) r = (r.lastIndexOf('%') !== -1)?(parseFloat(r)/100*255):parseFloat(r);
		if(g!==null) g = (g.lastIndexOf('%') !== -1)?(parseFloat(g)/100*255):parseFloat(g);
		if(b!==null) b = (b.lastIndexOf('%') !== -1)?(parseFloat(b)/100*255):parseFloat(b);
		if(a!==null) a = (a.lastIndexOf('%') !== -1)?parseFloat(a)/100:parseFloat(a);
		
		if(r===null || b=== null || g===null){return null;}
		if(!allowDecimal){
			r = Math.round(r);
			g = Math.round(g);
			b = Math.round(b);
		}
		return { r:r, g:g, b:b, a:(a??1) };
	}
	static parseRgb(v,allowDecimal=false){
		const r = this.parseRgba(v,allowDecimal);
		if(r){ delete r.a;}
		return r;
	}




	static validHsla(v){
		return colorRegExps.hsla.test(v)?v:null;
	}

	static validHsl(v){
		return this.validHsla(v);
	}
	
	static parseHsla(v,allowDecimal=false){
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
		const rgb = ColorConverter.hslToRgb(h,s,l,allowDecimal);
		return { r:rgb.r, g:rgb.g, b:rgb.b, a:(a??1)};
	}
	
	static parseHsl(v,allowDecimal=false){
		const r = this.parseHsla(v,allowDecimal);
		if(r){ delete r.a;}
		return r;
	}


}