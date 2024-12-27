import ColorJs from "../src/Color.js";
import ColorMinJs from "../dist/Color.min.js";

// import jsColor from "js-color";
// const Color = jsColor.Color;
let Color = null;
if(globalThis.process){
    if(process.argv[2]??false){
        const arg2 = process.argv[2];
        if(arg2==1){ 
            Color = ColorJs 
            console.log('Test by Color.js');
        }
        else if(arg2==2){ 
            Color = ColorMinJs 
            console.log('Test by Color.min.js');
        }else{
            Color = ColorJs
            console.log('Test by Color.js');
        }
    }else{
        Color = ColorJs
        console.log('Test by Color.js');
    }
}else{
    Color = ColorJs
    console.log('Test by Color.js');
}

console.log('Version',Color.version);


console.log('# Test ColorToXxx')

let ss = ['hsla(270deg, 60%, 70%,0.33)','hsla(270deg, 60%, 70%)','rgba(179,133,224,0.33)','rgb(179,133,224)']
ss.forEach((v,idx) => {
    let s,c,r,re,d={};
    s = v;
    c = new Color(s);
    r = s; re=null; d['input string']={return:r,toHsla:re};
    r = JSON.stringify(c); re=null; d['json']={return:r,toHsla:re};
    r = JSON.stringify(c.toObject()); re = null; d['toObject']={return:r,toHsla:re};
    r = JSON.stringify(c.toObject(true)); re = null; d['toObject decimalable']={return:r,toHsla:re};
    r = c.toString(); re = null; d['toString']={return:r,toHsla:re};
    r = c.toHex(); re = Color.from(r).toHsla(); d['toHex']={return:r,toHsla:re};
    r = c.toHex(true); re = Color.from(r).toHsla(); d['toHex decimalable']={return:r,toHsla:re};
    r = c.toHexa(); re = Color.from(r).toHsla(); d['toHexa']={return:r,toHsla:re};
    r = c.toHexa(true); re = Color.from(r).toHsla(); d['toHexa decimalable']={return:r,toHsla:re};
    r = c.toRgb(); re = Color.from(r).toHsla(); d['toRgb']={return:r,toHsla:re};
    r = c.toRgb(true); re = Color.from(r).toHsla(); d['toRgb decimalable']={return:r,toHsla:re};
    r = c.toRgba(); re = Color.from(r).toHsla(); d['toRgba']={return:r,toHsla:re};
    r = c.toRgba(true); re = Color.from(r).toHsla(); d['toRgba decimalable']={return:r,toHsla:re};
    r = c.toHsl(); re = Color.from(r).toHsl(); d['toHsl']={return:r,toHsla:re};
    r = c.toHsl(true); re = Color.from(r).toHsl(); d['toHsl decimalable']={return:r,toHsla:re};
    r = c.toHsla(); re = Color.from(r).toHsla(); d['toHsla']={return:r,toHsla:re};
    r = c.toHsla(true); re = Color.from(r).toHsla(); d['toHsla decimalable']={return:r,toHsla:re};
    console.table(d);
});
