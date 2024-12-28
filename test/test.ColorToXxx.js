import ColorJs from "../src/Color.js";
// import ColorMinJs from "../dist/Color.min.js";

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
    r = JSON.stringify(c.toJSON()); re=null; d['toJSON']={return:r,toHsla:re};
    r = JSON.stringify(c.get()); re = null; d['get']={return:r,toHsla:re};
    r = JSON.stringify(c.toObject(true)); re = null; d['toObject allowDecimal(default)']={return:r,toHsla:re};
    r = JSON.stringify(c.toObject(false)); re = null; d['toObject disallowDecimal']={return:r,toHsla:re};
    r = c.toString(); re = null; d['toString']={return:r,toHsla:re};
    r = c.toHex(); re = Color.from(r).toHsla(); d['toHex']={return:r,toHsla:re};
    // r = c.toHex(false); re = Color.from(r).toHsla(); d['toHex with round']={return:r,toHsla:re};
    r = c.toHexa(); re = Color.from(r).toHsla(); d['toHexa']={return:r,toHsla:re};
    // r = c.toHexa(false); re = Color.from(r).toHsla(); d['toHexa with round']={return:r,toHsla:re};
    r = c.toRgb(true); re = Color.from(r).toHsla(); d['toRgb allowDecimal']={return:r,toHsla:re};
    r = c.toRgb(false); re = Color.from(r).toHsla(); d['toRgb disallowDecimal(default)']={return:r,toHsla:re};
    r = c.toRgba(true); re = Color.from(r).toHsla(); d['toRgba allowDecimal']={return:r,toHsla:re};
    r = c.toRgba(false); re = Color.from(r).toHsla(); d['toRgba disallowDecimal(default)']={return:r,toHsla:re};
    r = c.toHsl(true); re = Color.from(r).toHsl(); d['toHsl allowDecimal']={return:r,toHsla:re};
    r = c.toHsl(false); re = Color.from(r).toHsl(); d['toHsl disallowDecimal(default)']={return:r,toHsla:re};
    r = c.toHsla(true); re = Color.from(r).toHsla(); d['toHsla allowDecimal']={return:r,toHsla:re};
    r = c.toHsla(false); re = Color.from(r).toHsla(); d['toHsla disallowDecimal(default)']={return:r,toHsla:re};
    console.table(d);
});
