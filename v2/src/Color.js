export default class Color{
  constructor(r=0,g=0,b=0,a=1){
    this.r = r|0;
    this.g = g|0;
    this.b = b|0;
    this.a = +a;
  }

  valueOf(){
    return ((this.r<<24)|(this.g<<16)|(this.b<<8)|Math.round(this.a*255))>>>0
  }

  clone(){
    return new this.constructor(this.r,this.g,this.b,this.a)
  }
}