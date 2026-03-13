export default class ColorParser {

  static #patterns = {
    hex3:   /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,
    hex4:   /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])$/i,
    hex6:   /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,
    hex8:   /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,
    rgb:    /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+)\s*)?\)$/i,
    hsl:    /^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+)%\s*,\s*([0-9.]+)%\s*(?:,\s*([0-9.]+)\s*)?\)$/i,
    cmyk:   /^cmyk\(\s*([0-9.]+)%\s*,\s*([0-9.]+)%\s*,\s*([0-9.]+)%\s*,\s*([0-9.]+)%\s*\)$/i,
    cmyka:  /^cmyka\(\s*([0-9.]+)%\s*,\s*([0-9.]+)%\s*,\s*([0-9.]+)%\s*,\s*([0-9.]+)%\s*,\s*([0-9.]+)\s*\)$/i,
  };

  static parse(str) {
    str = str.trim();

    let m;

    // #rgb
    if ((m = str.match(this.#patterns.hex3))) {
      return {
        type: 'hex',
        value: { r: parseInt(m[1] + m[1], 16), g: parseInt(m[2] + m[2], 16), b: parseInt(m[3] + m[3], 16) }
      };
    }

    // #rgba
    if ((m = str.match(this.#patterns.hex4))) {
      return {
        type: 'hexa',
        value: { r: parseInt(m[1] + m[1], 16), g: parseInt(m[2] + m[2], 16), b: parseInt(m[3] + m[3], 16), a: parseInt(m[4] + m[4], 16) / 255 }
      };
    }

    // #rrggbb
    if ((m = str.match(this.#patterns.hex6))) {
      return {
        type: 'hex',
        value: { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
      };
    }

    // #rrggbbaa
    if ((m = str.match(this.#patterns.hex8))) {
      return {
        type: 'hexa',
        value: { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16), a: parseInt(m[4], 16) / 255 }
      };
    }

    // rgb(r, g, b) / rgb(r, g, b, a) / rgba(r, g, b, a)
    if ((m = str.match(this.#patterns.rgb))) {
      const value = { r: +m[1], g: +m[2], b: +m[3] };
      if (m[4] !== undefined) value.a = +m[4];
      return { type: m[4] !== undefined ? 'rgba' : 'rgb', value };
    }

    // hsl(h, s%, l%) / hsl(h, s%, l%, a) / hsla(h, s%, l%, a)
    if ((m = str.match(this.#patterns.hsl))) {
      const value = { h: +m[1], s: +m[2] / 100, l: +m[3] / 100 };
      if (m[4] !== undefined) value.a = +m[4];
      return { type: m[4] !== undefined ? 'hsla' : 'hsl', value };
    }

    // cmyk(c%, m%, y%, k%)
    if ((m = str.match(this.#patterns.cmyk))) {
      return {
        type: 'cmyk',
        value: { c: +m[1] / 100, m: +m[2] / 100, y: +m[3] / 100, k: +m[4] / 100 }
      };
    }

    // cmyka(c%, m%, y%, k%, a)
    if ((m = str.match(this.#patterns.cmyka))) {
      return {
        type: 'cmyka',
        value: { c: +m[1] / 100, m: +m[2] / 100, y: +m[3] / 100, k: +m[4] / 100, a: +m[5] }
      };
    }

    return null;
  }
}
