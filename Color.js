export default class Color{
    constructor(v){
        this.type = "rgb";
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = null;
    }
    set(...args){
        if(args.length == 1){
        }
        v = v.replace(/\s/g,'');        
    }
    static parse(...args){
        let v = args[0];
        v = v.replace(/\s/g,'').toLowerCase();
        if(args.length == 3){

        }else if(args.length == 4){

        }else if(!v){
            return null;
        }else if(v[0]=='#'){ //#FFF , #FFFF , #FFFFFF , #FFFFFFFF
            return this.parseHex(v);
        }else if(/^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/){ //rgb(111,111,111)

        }else if(/^rgba\(\d{1,3},\d{1,3},\d{1,3},(0|1|)(\.\d+)*\)$/){ //rgb(111,111,111,0.1111)

        }
    }
    static vaildHex(v){
        v = v.replace(/\s/g,'').toLowerCase();
        return /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v)?v:null;
    }
    static parseHex(v){
        if(!(v = this.vaildHex(v))){ return null; }
        const s = v.substring(1); // remove #
        const len = s.length

        if(len==3){
            return { r:parseInt(s[0]+s[0],16), g:parseInt(s[1]+s[1],16), b:parseInt(s[2]+s[2],16), a:null };
        }
        else if(len==4){
            return { r:parseInt(s[0]+s[0],16), g:parseInt(s[1]+s[1],16), b:parseInt(s[2]+s[2],16), a:parseInt(s[3]+s[3],16)/255 };
        }
        else if(len==6){
            return { r:parseInt(s.substring(0,2),16), g:parseInt(s.substring(2,4),16), b:parseInt(s.substring(4,6),16), a:null };
        }
        else if(len==8){
            return { r:parseInt(s.substring(0,2),16), g:parseInt(s.substring(2,4),16), b:parseInt(s.substring(4,6),16), a:parseInt(s.substring(6,8),16)/255 };
        }
        return null;        
    }

    static vaildRgb(v){
        v = v.replace(/\s{2,}/g,' ').toLowerCase();
        return /^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/.test(v)?v:null;
    }
    static vaildRgba(v){
        v = v.replace(/\s{2,}/g,' ').toLowerCase();
        return /^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/.test(v)?v:null;
    }

    static toHex(c){
        if(!c || !Object.hasOwn(c, "r") || !Object.hasOwn(c, "g") || !Object.hasOwn(c, "b")){ return null; }
        if(Object.hasOwn(c, "a") && c.a !== null){
            return '#' + c.r.toString(16).padStart(2, '0') + c.g.toString(16).padStart(2, '0') + c.b.toString(16).padStart(2, '0') + Math.floor(c.a*255).toString(16).padStart(2, '0');
        }else{
            return '#' + c.r.toString(16).padStart(2, '0') + c.g.toString(16).padStart(2, '0') + c.b.toString(16).padStart(2, '0');
        }
    }
    static toRgb(v){
        if(!c || !Object.hasOwn(c, "r") || !Object.hasOwn(c, "g") || !Object.hasOwn(c, "b")){ return null; }
        return `rgba(${c.r},${c.g},${c.b})`;
    }
    static toRgba(v){

    }
    static toArray(v){

    }

    static
}