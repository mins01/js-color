import Color from "../src/Color.js";

console.log('Version',Color.version);


console.log('# Test ColorToXxx')

let argss = [ 
    ['rgba(179.1,133.2,224.3,0.5)'],
    ['rgb(179.1,133.2,224.3)'],
    ['hsla(270.1deg, 60.1%, 70.1%, 0.5)'],
    ['hsla(270.1deg, 60.1%, 70.1%)'],
    [0,128,255,0.5],
    [0,128,255],
]
argss.forEach((args,idx) => {
    let s,c,r,re,d={};
    c = new Color(...args);

    r = s; re=null; d['args']={return:JSON.stringify(args)};
    r = JSON.stringify(c.toJSON()); re=null; d['toJSON']={return:r};
    r = JSON.stringify(c.get()); d['get']={return:r};
    r = JSON.stringify(c.toObject(true)); d['toObject allowDecimal(default)']={return:r};
    r = JSON.stringify(c.toObject(false)); d['toObject disallowDecimal']={return:r};
    r = c.toString(); d['toString']={return:r};
    r = c.toString('hexa'); d['toString(hexa)']={return:r};
    r = c.toString('hex'); d['toString(hex)']={return:r};
    r = c.toString('rgba'); d['toString(rgba)']={return:r};
    r = c.toString('rgb'); d['toString(rgb)']={return:r};
    r = c.toString('hsla'); d['toString(hsla)']={return:r};
    r = c.toString('hsl'); d['toString(hsl)']={return:r};
    r = c.toString(); d['toString']={return:r};
    r = c.toString(); d['toString']={return:r};
    r = c.toHex(); d['toHex']={return:r};
    // r = c.toHex(false); d['toHex with round']={return:r};
    r = c.toHexa(); d['toHexa']={return:r};
    // r = c.toHexa(false); d['toHexa with round']={return:r};
    r = c.toRgb(true); d['toRgb allowDecimal']={return:r};
    r = c.toRgb(false); d['toRgb disallowDecimal(default)']={return:r};
    r = c.toRgba(true); d['toRgba allowDecimal']={return:r};
    r = c.toRgba(false); d['toRgba disallowDecimal(default)']={return:r};
    r = c.toHsl(true); re = Color.from(r).toHsl(); d['toHsl allowDecimal']={return:r};
    r = c.toHsl(false); re = Color.from(r).toHsl(); d['toHsl disallowDecimal(default)']={return:r};
    r = c.toHsla(true); d['toHsla allowDecimal']={return:r};
    r = c.toHsla(false); d['toHsla disallowDecimal(default)']={return:r};
    console.table(d);
});
