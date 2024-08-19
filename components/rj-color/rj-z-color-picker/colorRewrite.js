import { computed, reactive } from "vue";
import tinycolor from "./tinycolor.js";

function _colorChange(data, oldHue) {
  var alpha = data && data.a;
  var color;
  console.log("_colorChange", data, oldHue);

  if (data && data.hsl) {
    color = tinycolor(data.hsl);
  } else if (data && data.hex && data.hex.length > 0) {
    color = tinycolor(data.hex);
  } else if (data && data.hsv) {
    color = tinycolor(data.hsv);
  } else if (data && data.rgba) {
    color = tinycolor(data.rgba);
  } else if (data && data.rgb) {
    color = tinycolor(data.rgb);
  } else {
    color = tinycolor(data);
  }

  if (color && (color._a === undefined || color._a === null)) {
    color.setAlpha(alpha || 1);
  }

  var hsl = color.toHsl();
  var hsv = color.toHsv();

  if (hsl.s === 0) {
    hsv.h = hsl.h = data.h || (data.hsl && data.hsl.h) || oldHue || 0;
  }

  return {
    hsl: hsl,
    hex: color.toHexString().toUpperCase(),
    hex8: color.toHex8String().toUpperCase(),
    rgba: color.toRgb(),
    hsv: hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
    a: data.a || color.getAlpha(),
  };
}

export function useColors() {
  const data = reactive({
    value: _colorChange(),
  });

  const colors = computed({
    get: () => data.value,
    set: (newVal) => {
      data.value = newVal;
    },
  });
}
