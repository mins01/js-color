import { rgbToHsl , rgbToHsv, hslToRgb, hsvToRgb, rgbToCmyk, cmykToRgb} from './color-utils.js';
import ColorParser from './ColorParser.js';


export default class Color{
  static toStringType = 'rgba';

  static from(){

  }
  static fromString(string){
    const parsed = ColorParser.parse(string);
    if (!parsed) return null;
    const { type, value } = parsed;
    const color = new this();
    switch (type) {
      case 'hex': case 'rgb':
        color.setRgba(value.r, value.g, value.b); break;
      case 'hexa': case 'rgba':
        color.setRgba(value.r, value.g, value.b, value.a); break;
      case 'hsl':
        color.setHsla(value.h, value.s, value.l); break;
      case 'hsla':
        color.setHsla(value.h, value.s, value.l, value.a); break;
      case 'cmyk':
        color.setCmyk(value.c, value.m, value.y, value.k); break;
      case 'cmyka':
        color.setCmyka(value.c, value.m, value.y, value.k, value.a); break;
      default: return null;
    }
    return color;
  }
  static fromRgba(r=0,g=0,b=0,a=1){
    return new this(r,g,b,a);
  }

  #cache = new Map();
  r=0
  g=0
  b=0
  a=1
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
    return color &&
      this.r === color.r &&
      this.g === color.g &&
      this.b === color.b &&
      this.a === color.a
  }

  // sets
  setRgba(r=0,g=0,b=0,a=null){
    this.#cache.clear()   // 캐시 클리어

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
  setCmyk(c=0,m=0,y=0,k=0){
    const {r,g,b} = cmykToRgb(c,m,y,k);
    this.setRgba(r,g,b);
  }
  setCmyka(c=0,m=0,y=0,k=0,a=null){
    const {r,g,b} = cmykToRgb(c,m,y,k);
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
  toJSON(){ return { r:this.r, g:this.g, b:this.b, a:this.a } }

  // rgb numbers
  toRgbNumber(){ return ((this.r << 16) | (this.g << 8) | this.b) >>> 0 }
  toRgbaNumber(){ return ((this.r<<24)|(this.g<<16)|(this.b<<8)|Math.round(this.a*255))>>>0 }
  toArgbNumber(){ return ((Math.round(this.a * 255) << 24) | (this.r << 16) | (this.g << 8) | this.b) >>> 0 }
  toNumber(){ return this.toRgbNumber() }

  toUint8ClampedArray(){ return new Uint8ClampedArray([this.r,this.g,this.b,Math.round(this.a*255)]) }

  toString(type = Color.toStringType){
    switch(type){
      case 'rgb': return this.toStringRgb()
      case 'rgba': return this.toStringRgba()
      case 'hex': return this.toStringHex()
      case 'hexa': return this.toStringHexa()
      case 'hsl': return this.toStringHsl()
      case 'hsla': return this.toStringHsla()
      case 'cmyk': return this.toStringCmyk()
      case 'cmyka': return this.toStringCmyka()
      default: return this.toStringRgba()
    }
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
  toRgba(){ return { ...this.toRgb(), a: this.a}; }
  toHsl(){
    if(!this.#cache.has('hsl')) this.#cache.set('hsl',rgbToHsl(this.r, this.g, this.b));
    return this.#cache.get('hsl');
  }
  toHsla(){ return {...this.toHsl(),a:this.a}; }
  toStringHsl() {
    const { h, s, l } = this.toHsl();
    return `hsl(${h.toFixed(2)}, ${(s * 100).toFixed(2)}%, ${(l * 100).toFixed(2)}%)`;
  }
  toStringHsla(){
    const { h, s, l} = this.toHsl();
    return `hsla(${h.toFixed(2)}, ${(s*100).toFixed(2)}%, ${(l*100).toFixed(2)}%, ${this.a.toFixed(3)})`;
  }
  toHsv(){ 
    if(!this.#cache.has('hsv')) this.#cache.set('hsv',rgbToHsv(this.r, this.g, this.b));
    return this.#cache.get('hsv');
  }
  toHsva(){ return {...this.toHsv(),a:this.a}; }
  toCmyk(){
    if(!this.#cache.has('cmyk')) this.#cache.set('cmyk',rgbToCmyk(this.r, this.g, this.b));
    return this.#cache.get('cmyk');
  }
  toCmyka(){ return {...this.toCmyk(),a:this.a}; }
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