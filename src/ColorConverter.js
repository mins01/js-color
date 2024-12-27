export default class ColorConverter{
	// http://rgb2hsl.nichabi.com/javascript-function.php
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
}