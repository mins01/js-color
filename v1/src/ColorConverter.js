export default class ColorConverter{
	// http://rgb2hsl.nichabi.com/javascript-function.php
	/**
	 * Description placeholder
	 *
	 * @static
	 * @param {number} r 0-255
	 * @param {number} g 0-255
	 * @param {number} b 0-255
	 * @param {boolean} [allowDecimal=false]
	 * @returns {{ h: number; s: number; l: number; }} h:0-360 deg , s:0-100 % , l:0-100 %
	 */
	static rgbToHsl (r, g, b, allowDecimal=false) {
		let max, min, h, s, l, d;
		r /= 255; g /= 255; b /= 255;
		max = Math.max(r, g, b);
		min = Math.min(r, g, b);
		l = (max + min) / 2;
		if (max == min) {
			h = s = 0
		} else {
			d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}
		if(allowDecimal){
			h = h * 360;
			s = s * 100;
			l = l * 100;
		}else{
			h = Math.round(h * 360);
			s = Math.round(s * 100);
			l = Math.round(l * 100);
		}
		return { h: h, s: s, l: l };
	}
	
	
	// http://hsl2rgb.nichabi.com/javascript-function.php
	/**
	 * Description placeholder
	 *
	 * @static
	 * @param {number} h 0-360 deg
	 * @param {number} s 0-100 %
	 * @param {number} l 0-100 %
	 * @param {boolean} [allowDecimal=false]
	 * @returns {{ r: number; g: number; b: number; }} r:0-255 , g:0-255 , b:0-255
	 */
	static hslToRgb (h, s, l, allowDecimal=false) {
		let r, g, b, m, c, x;
		
		if (!isFinite(h)) h = 0;
		if (!isFinite(s)) s = 0;
		if (!isFinite(l)) l = 0;
		
		h /= 60;
		if (h < 0) h = 6 - (-h % 6);
		h %= 6;
		
		s = Math.max(0, Math.min(1, s / 100));
		l = Math.max(0, Math.min(1, l / 100));
		
		c = (1 - Math.abs((2 * l) - 1)) * s;
		x = c * (1 - Math.abs((h % 2) - 1));
		
		if (h < 1) { r = c; g = x; b = 0; } 
		else if (h < 2) { r = x; g = c; b = 0; } 
		else if (h < 3) { r = 0; g = c; b = x; } 
		else if (h < 4) { r = 0; g = x; b = c; } 
		else if (h < 5) { r = x; g = 0; b = c; } 
		else { r = c; g = 0; b = x; }
		
		m = l - c / 2;
		if(allowDecimal){
			r = (r + m) * 255;
			g = (g + m) * 255;
			b = (b + m) * 255;
		}else{
			r = Math.round((r + m) * 255);
			g = Math.round((g + m) * 255);
			b = Math.round((b + m) * 255);
		}
		
		return { r: r, g: g, b: b };
		
	}
	
	
	
	
		/**
	 * Description placeholder
	 *
	 * @static
	 * @param {number} r 0-255
	 * @param {number} g 0-255
	 * @param {number} b 0-255
	 * @param {boolean} [allowDecimal=false]
	 * @returns {{ h: number; w: number; b: number; }} h:0-360 deg , w:0-100 % , b:0-100 %
	 */
	static rgbToHwb(r, g, b , allowDecimal=false) {
		// Convert RGB to HSV first
		let max = Math.max(r, g, b);
		let min = Math.min(r, g, b);
		let h, w, bBlack = 1 - max / 255;
		
		if (max === min) {
			h = 0; // achromatic
		} else {
			let d = max - min;
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}
		
		// Calculate whiteness
		w = min / 255;
		
		if(!allowDecimal){
			return {
				h: Math.round(h * 360),     // Hue
				w: Math.round(w * 100),     // Whiteness
				b: Math.round(bBlack * 100) // Blackness
			};	
		}
		return {
			h: h * 360,     // Hue
			w: w * 100,     // Whiteness
			b: bBlack * 100 // Blackness
		};
	}
	

	
// hwb(270.33deg 52.16% 12.16%)
// rgb(179, 133, 224);
// 270,52,12
	
/**
	 * Description placeholder
	 *
	 * @static
	 * @param {number} h 0-360 deg
	 * @param {number} w 0-100 %
	 * @param {number} b 0-100 %
	 * @param {boolean} [allowDecimal=false]
	 * @returns {{ r: number; g: number; b: number; }} r:0-255 , g:0-255 , b:0-255
	 */
	static hwbToRgb(h, w, b, allowDecimal=false) {
		w /= 100;
		b /= 100;

		var rgb = this.hslToRgb(h, 100, 50, true);
		
		['r','g','b'].forEach(k => {
			var c = rgb[k] / 255
			c *= 1 - w - b
			c += w
			rgb[k] = c * 255
		});

		if(!allowDecimal){
			return {
				r:Math.round(rgb.r),
				g:Math.round(rgb.g),
				b:Math.round(rgb.b),
			}
		}
		return rgb
	}
}