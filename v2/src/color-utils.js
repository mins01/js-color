export function rgbToHsl(r, g, b) {
  if (typeof r === "object") { ({ r, g, b } = r) }

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {

    const d = max - min;

    s = l > 0.5
      ? d / (2 - max - min)
      : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
    }

    h *= 60;
  }

  return { h, s, l };
}

export function rgbToHsv(r, g, b) {
  if (typeof r === "object") { ({ r, g, b } = r) }

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h;
  const v = max;

  const s = max === 0 ? 0 : d / max;

  if (d === 0) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
    }

    h *= 60;
  }

  return { h, s, v };
}


export function hslToRgb(h, s, l) {

  h /= 360;

  let r, g, b;

  if (s === 0) {
    // gray
    r = g = b = l;
  } else {

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;

      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;

      return p;
    };

    const q = l < 0.5
      ? l * (1 + s)
      : l + s - l * s;

    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  // return {
  //   r: Math.round(r * 255),
  //   g: Math.round(g * 255),
  //   b: Math.round(b * 255)
  // };
  return {
    r: (r * 255),
    g: (g * 255),
    b: (b * 255)
  };
}

export function hsvToRgb(h, s, v) {

  const c = v * s;           // chroma
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;

  let r = 0, g = 0, b = 0;

  if (h < 60) {
    r = c; g = x; b = 0;
  } else if (h < 120) {
    r = x; g = c; b = 0;
  } else if (h < 180) {
    r = 0; g = c; b = x;
  } else if (h < 240) {
    r = 0; g = x; b = c;
  } else if (h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  // return {
  //   r: Math.round((r + m) * 255),
  //   g: Math.round((g + m) * 255),
  //   b: Math.round((b + m) * 255)
  // };
  return {
    r: ((r + m) * 255),
    g: ((g + m) * 255),
    b: ((b + m) * 255)
  };
}


export function rgbToCmyk(r, g, b) {

  r /= 255;
  g /= 255;
  b /= 255;

  const k = 1 - Math.max(r, g, b);

  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 1 };
  }

  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);

  return { c, m, y, k };
}

export function cmykToRgb(c, m, y, k) {
  // return {
  //   r: Math.round(255 * (1 - c) * (1 - k)),
  //   g: Math.round(255 * (1 - m) * (1 - k)),
  //   b: Math.round(255 * (1 - y) * (1 - k))
  // };
  return {
    r: (255 * (1 - c) * (1 - k)),
    g: (255 * (1 - m) * (1 - k)),
    b: (255 * (1 - y) * (1 - k))
  };
}



export function srgbToLinear(c) {
    c /= 255;
    return c <= 0.04045
        ? c / 12.92
        : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function rgbToOklab(r, g, b) {
    // sRGB → Linear RGB


    const R = srgbToLinear(r);
    const G = srgbToLinear(g);
    const B = srgbToLinear(b);

    // Linear RGB → LMS
    let l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
    let m = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
    let s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;

    // cube root
    l = Math.cbrt(l);
    m = Math.cbrt(m);
    s = Math.cbrt(s);

    // LMS → OKLab
    const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
    const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
    const b2 = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;

    return { L, a, b: b2 };
}
export function linearToSrgb(c) {
    return c <= 0.0031308
        ? 12.92 * c
        : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

export function oklabToRgb(L, a, b) {
    // 1. OKLab → LMS
    let l = L + 0.3963377774 * a + 0.2158037573 * b;
    let m = L - 0.1055613458 * a - 0.0638541728 * b;
    let s = L - 0.0894841775 * a - 1.2914855480 * b;

    // 2. cube
    l = l * l * l;
    m = m * m * m;
    s = s * s * s;

    // 3. LMS → Linear RGB
    let R =  4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    let G = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    let B = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

    // 4. Linear RGB → sRGB
    // 외부 선언

    R = linearToSrgb(R);
    G = linearToSrgb(G);
    B = linearToSrgb(B);

    // ✔ 그대로 반환 (0~1 범위, out-of-gamut 가능)
    return { r: R * 255, g: G * 255, b: B * 255 };
}

export function oklabToOklch(L, a, b) {
  const C = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a) * 180 / Math.PI;
  if (h < 0) h += 360;
  return { L, C, h };
}

export function oklchToOklab(L, C, h) {
  const hr = h * Math.PI / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);
  return { L, a, b };
}

export function rgbToOklch(r, g, b) {
  const oklab = rgbToOklab(r, g, b);
  return oklabToOklch(oklab.L, oklab.a, oklab.b)
}
export function oklchTORgb(L, C, h) {
  const oklab = oklchToOklab(L, C, h);
  return oklabToRgb(oklab.L, oklab.a, oklab.b);
}