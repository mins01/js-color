import { rgbToHsl , rgbToHsv, hslToRgb, hsvToRgb, rgbToCmyk} from './color-utils.js';

export default class Color{
  static toStringType = 'rgba';

  static fromRgba(r=0,g=0,b=0,a=1){
    return new this(r,g,b,a);
  }

  /**
   * Color constructor
   * @param {number} r - red value from 0 to 255
   * @param {number} g - green value from 0 to 255
   * @param {number} b - blue value from 0 to 255
   * @param {number} a - alpha value from 0 to 1
   */
  constructor(r=0,g=0,b=0,a=1){
    if (typeof r === "object"  && !Array.isArray(r)) { ({ r, g, b, a = 1 } = r) }
    this.setRgba(r,g,b,a);
  }

  clone(){ return new this.constructor(this) }

  equals(color){
    return ( this.r === color.r && this.g === color.g && this.b === color.b && this.a === color.a );
  }

  // sets
  setRgba(r=0,g=0,b=0,a=null){ 
    const clamp255 = v => Math.min(255, Math.max(0, Math.round(v)));
    const clamp1 = v => Math.min(1, Math.max(0, +v));

    this.r = clamp255(r);
    this.g = clamp255(g);
    this.b = clamp255(b);

    if(a !== null) this.a = clamp1(a);
  }
  setHsla(h=0,s=0,l=0,a=null){
    let { r,g,b} = hslToRgb(h,s,l);
    this.setRgba(r,g,b,a);
  }
  setHsva(h=0,s=0,v=0,a=null){
    let { r,g,b} = hsvToRgb(h,s,v);
    this.setRgba(r,g,b,a);
  }


  // gets
  /**
   * Get the color value as a number.
   * This is a packed representation of the color as a 32-bit integer.
   * The red, green, and blue components are 8-bit each, and the alpha component is 8-bit.
   * The format is: 0xRRGGBBAA.
   * @return {number} The color value as a number.
   */
  [Symbol.toPrimitive](hint) {
    if (hint === "default") return this.toString();
    if (hint === "number") return this.valueOf();
    if (hint === "string") return this.toString();
    return this.toString();
  }
  valueOf(){ return this.toNumber() }
  toJSON(){ return {...this} }

  // rgb numbers
  toRgbNumber(){ return ((this.r << 16) | (this.g << 8) | this.b) >>> 0 }
  toRgbaNumber(){ return ((this.r<<24)|(this.g<<16)|(this.b<<8)|Math.round(this.a*255))>>>0 }
  toArgbNumber(){ return ((Math.round(this.a * 255) << 24) | (this.r << 16) | (this.g << 8) | this.b) >>> 0 }
  toNumber(){ return this.toRgbNumber() }

  toUint8ClampedArray(){ return new Uint8ClampedArray([this.r,this.g,this.b,Math.round(this.a*255)]) }

  toString(type = Color.toStringType){
    const map = {
      rgb: () => this.toStringRgb(),
      rgba: () => this.toStringRgba(),
      hex: () => this.toStringHex(),
      hexa: () => this.toStringHexa(),
      hsl: () => this.toStringHsl(),
      hsla: () => this.toStringHsla(),
      cmyk: () => this.toStringCmyk(),
      cmyka: () => this.toStringCmyka(),
    };

    return map[type]?.() ?? this.toStringRgba();
  }
  // RGB
  toStringRgb(){ return `rgb(${this.r}, ${this.g}, ${this.b})`; }
  toStringRgba(){ return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`; }
  toStringHex(){
    const hex = v => v.toString(16).padStart(2,'0');
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }
  toStringHexa(){
    const hex = v => v.toString(16).padStart(2,'0');
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex(Math.round(this.a*255))}`;
  }
  toRgb(){ return { r: this.r, g: this.g, b: this.b}; }
  toRgba(){ return { r: this.r, g: this.g, b: this.b, a: this.a}; }
  toHsl(){ return rgbToHsl(this.r, this.g, this.b); }
  toHsla(){ return {...rgbToHsl(this.r, this.g, this.b),a:this.a}; }
  toStringHsl(){
    const {h,s,l} = this.toHsl();
    return `hsl(${h}, ${(s*100).toFixed(2)}%, ${(l*100).toFixed(2)}%)`; 
  }
  toStringHsla(){
    const {h,s,l} = this.toHsl();
    return `hsla(${h}, ${(s*100).toFixed(2)}%, ${(l*100).toFixed(2)}%, ${this.a.toFixed(3)})`;
  }
  toHsv(){ return rgbToHsv(this.r, this.g, this.b); }
  toHsva(){ return {...rgbToHsv(this.r, this.g, this.b),a:this.a}; }
  toCmyk(){ return rgbToCmyk(this.r, this.g, this.b); }
  toCmyka(){ return {...rgbToCmyk(this.r, this.g, this.b),a:this.a}; }
  toStringCmyk() {
    const { c, m, y, k } = this.toCmyk();
    const pct = v => Math.round(v * 100);

    return `cmyk(${pct(c)}%, ${pct(m)}%, ${pct(y)}%, ${pct(k)}%)`;
  }
  toStringCmyka() {
    const { c, m, y, k } = this.toCmyk();
    const pct = v => Math.round(v * 100);

    return `cmyka(${pct(c)}%, ${pct(m)}%, ${pct(y)}%, ${pct(k)}%, ${+this.a.toFixed(3)})`;
  }
}