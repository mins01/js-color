import { rgbToHsl , rgbToHsv, hslToRgb, hsvToRgb, rgbToCmyk, cmykToRgb} from './color-utils.js';
import ColorParser from './ColorParser.js';


export default class Color{
  static toStringType = 'rgba';

  static from(input){
    if (input instanceof Color) return this.fromColor(input);
    if (typeof input === 'string') return Color.fromString(input);
    if (Array.isArray(input)) return Color.fromRgba(...input);
  }
  static fromString(string){
    const color = new this();
    if(color.setString(string)) return color;
    return null;
  }

  static fromRgba(r=0,g=0,b=0,a=1){
    return new this(r,g,b,a);
  }
  static fromColor(color){ return new this(color.r, color.g, color.b, color.a); }

  static parse(string){ return ColorParser.parse(string); } 

  #cache = new Map();
  realR=0
  realG=0
  realB=0
  // r=0
  // g=0
  // b=0
  a=1

  set r(v){ this.realR = v;}
  set g(v){ this.realG = v;}
  set b(v){ this.realB = v;}
  get r(){ return Math.round(this.realR);}
  get g(){ return Math.round(this.realG);}
  get b(){ return Math.round(this.realB);}
  

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
  realEquals(color){
    return color &&
      this.realR === color.realR &&
      this.realG === color.realG &&
      this.realB === color.realB &&
      this.a === color.a
  }

  // sets
  setColor(color){
    this.setRgba(color.r, color.g, color.b, color.a);
  }
  
  setString(string){
    const parsed = Color.parse(string);
    
    if (!parsed) return false;
    const { type, value } = parsed;
    switch (type) {
      case 'hex': case 'rgb':
        this.setRgba(value.r, value.g, value.b); break;
      case 'hexa': case 'rgba':
        this.setRgba(value.r, value.g, value.b, value.a); break;
      case 'hsl':
        this.setHsla(value.h, value.s, value.l); break;
      case 'hsla':
        this.setHsla(value.h, value.s, value.l, value.a); break;
      case 'cmyk':
        this.setCmyk(value.c, value.m, value.y, value.k); break;
      case 'cmyka':
        this.setCmyka(value.c, value.m, value.y, value.k, value.a); break;
      default: return false;
    }
    return true
  }  
  setRgba(r=0,g=0,b=0,a=null){
    this.#cache.clear()   // 캐시 클리어

    // const clamp255 = v => Math.min(255, Math.max(0, Math.round(v)));
    const clamp255 = v => Math.min(255, Math.max(0, +v));
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
  toJSON(){ 
    return { 
      r:this.r,
      g:this.g,
      b:this.b,
      a:this.a,
      realR:this.realR,
      realG:this.realG,
      realB:this.realB,
    } 
  }

  // rgb numbers
  toRgbNumber(){ return ((this.r << 16) | (this.g << 8) | this.b) >>> 0 }
  toRgbaNumber(){ return ((this.r<<24)|(this.g<<16)|(this.b<<8)|Math.round(this.a*255))>>>0 }
  toArgbNumber(){ return ((Math.round(this.a * 255) << 24) | (this.r << 16) | (this.g << 8) | this.b) >>> 0 }
  toNumber(){ return this.toRgbNumber() }

  toUint8ClampedArray(){ return new Uint8ClampedArray([this.r,this.g,this.b,Math.round(this.a*255)]) }

  toString(type = Color.toStringType){
    switch(type){
      case 'rgb': return this.toRgbString()
      case 'rgba': return this.toRgbaString()
      case 'hex': return this.toHexString()
      case 'hexa': return this.toHexaString()
      case 'hsl': return this.toHslString()
      case 'hsla': return this.toHslaString()
      case 'cmyk': return this.toCmykString()
      case 'cmyka': return this.toCmykaString()
      default: return this.toRgbaString()
    }
  }
  toFixed(v, d=2){ return v.toFixed(d).replace(/\.?0+$/, ''); }
  // RGB
  toRgbString(){ return `rgb(${this.r}, ${this.g}, ${this.b})`; }
  toRgbaString(){ return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.toFixed(this.a,2)})`; }
  toRealRgbString(){ return `rgb(${this.realR}, ${this.realG}, ${this.realB})`; }
  toRealRgbaString(){ return `rgba(${this.realR}, ${this.realG}, ${this.realB}, ${this.a})`; }
  toHexString(){
    const hex = v => v.toString(16).padStart(2,'0');
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }
  toHexaString(){
    const hex = v => v.toString(16).padStart(2,'0');
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex(Math.round(this.a*255))}`;
  }
  toRgb(){ return { r: this.r, g: this.g, b: this.b}; }
  toRgba(){ return { ...this.toRgb(), a: this.a}; }
  toRealRgb(){ return { r: this.realR, g: this.realG, b: this.realB}; }
  toRealRgba(){ return { ...this.toRealRgb(), a: this.a}; }
  toHsl(){
    if(!this.#cache.has('hsl')) this.#cache.set('hsl',rgbToHsl(this.r, this.g, this.b));
    return this.#cache.get('hsl');
  }
  toHsla(){ return {...this.toHsl(),a:this.a}; }
  toHslString() {
    const { h, s, l } = this.toHsl();
    return `hsl(${this.toFixed(h,2)}, ${this.toFixed(s*100,2)}%, ${this.toFixed(l*100,2)}%)`;
  }
  toHslaString(){
    const { h, s, l} = this.toHsl();
    return `hsla(${this.toFixed(h,2)}, ${this.toFixed(s*100,2)}%, ${this.toFixed(l*100,2)}%, ${this.a.toFixed(3)})`;
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
  toCmykString() {
    const { c, m, y, k } = this.toCmyk();
    const pct = v => Math.round(v * 100);
    return `cmyk(${pct(c)}%, ${pct(m)}%, ${pct(y)}%, ${pct(k)}%)`;
  }
  toCmykaString() {
    const { c, m, y, k } = this.toCmyk();
    const pct = v => Math.round(v * 100);
    return `cmyka(${pct(c)}%, ${pct(m)}%, ${pct(y)}%, ${pct(k)}%, ${+this.a.toFixed(3)})`;
  }
}