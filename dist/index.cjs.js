'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _extends = _interopDefault(require('@babel/runtime/helpers/extends'));
var _objectWithoutPropertiesLoose = _interopDefault(require('@babel/runtime/helpers/objectWithoutPropertiesLoose'));
var core = require('@emotion/core');
var react = require('react');
var Popover = _interopDefault(require('@xkit/popover'));
var InputSlider = _interopDefault(require('react-input-slider'));
var InputNumber = _interopDefault(require('react-input-number'));
var colorFns = require('@swiftcarrot/color-fns');

function hex2alpha(aa) {
  return Math.round(parseInt('0x' + aa, 16) / 255 * 100);
}
function parseColor(hexColor) {
  hexColor = hexColor.toLowerCase();
  var hex = hexColor;
  var rgb = colorFns.hex2rgb(hex);
  var r = rgb.r,
      g = rgb.g,
      b = rgb.b;
  var hsv = colorFns.rgb2hsv(r, g, b);
  var a = hexColor.length > 7 ? hex2alpha(hexColor.substr(7)) : 100;
  return _extends({}, hsv, {
    r: r,
    g: g,
    b: b,
    a: a,
    hex: hex,
    rgba: colorFns.rgba(r, g, b, a)
  });
}
function rgba2hex(r, g, b, a) {
  var hex = colorFns.rgb2hex(r, g, b);
  return hex; // + alpha2hex(a);
}

var KEY_ENTER = 13;
var _ref2 = {
  name: "bzk4lp",
  styles: "width:100%;margin-top:10px;margin-bottom:10px;display:flex;"
};
var _ref3 = {
  name: "lwa3hx",
  styles: "flex:1;margin-right:10px;"
};

var ColorPicker = function ColorPicker(_ref) {
  var hexId = _ref.hexId,
      color = _ref.color,
      onChange = _ref.onChange,
      disabled = _ref.disabled;
  var r = color.r,
      g = color.g,
      b = color.b,
      a = color.a,
      h = color.h,
      s = color.s,
      v = color.v;
  var hexComp = document.getElementById(hexId);

  if (hexComp) {
    hexComp.value = rgba2hex(color.r, color.g, color.b);
  }

  function changeColor(color) {
    if (onChange) {
      onChange(_extends({}, color, {
        rgba: colorFns.rgba(color.r, color.g, color.b, color.a),
        //hex: rgba2hex(color.r, color.g, color.b, color.a),
        hex: rgba2hex(color.r, color.g, color.b)
      }));
    }
  }

  function changeHSV(h, s, v) {
    var _hsv2rgb = colorFns.hsv2rgb(h, s, v),
        r = _hsv2rgb.r,
        g = _hsv2rgb.g,
        b = _hsv2rgb.b;

    var hex = colorFns.rgb2hex(r, g, b);
    changeColor(_extends({}, color, {
      h: h,
      s: s,
      v: v,
      r: r,
      g: g,
      b: b,
      hex: hex
    }));
  }

  function changeRGB(r, g, b) {
    var hex = colorFns.rgb2hex(r, g, b);

    var _rgb2hsv = colorFns.rgb2hsv(r, g, b),
        h = _rgb2hsv.h,
        s = _rgb2hsv.s,
        v = _rgb2hsv.v;

    changeColor(_extends({}, color, {
      r: r,
      g: g,
      b: b,
      h: h,
      s: s,
      v: v,
      hex: hex
    }));
  }

  function changeAlpha(a) {
    changeColor(_extends({}, color, {
      a: a
    }));
  }

  function changeHex(hex) {
    if (hex.length == 7) {
      var _hex2rgb = colorFns.hex2rgb(hex),
          _r = _hex2rgb.r,
          _g = _hex2rgb.g,
          _b = _hex2rgb.b;

      var _rgb2hsv2 = colorFns.rgb2hsv(_r, _g, _b),
          _h = _rgb2hsv2.h,
          _s = _rgb2hsv2.s,
          _v = _rgb2hsv2.v;

      changeColor(_extends({}, color, {
        r: _r,
        g: _g,
        b: _b,
        h: _h,
        s: _s,
        v: _v,
        hex: hex
      }));
    }
  }

  function handleHexKeyUp(e) {
    if (e.keyCode === KEY_ENTER) {
      var hex = e.target.value.trim();

      var _hex2rgb2 = colorFns.hex2rgb(hex),
          _r2 = _hex2rgb2.r,
          _g2 = _hex2rgb2.g,
          _b2 = _hex2rgb2.b;

      changeColor(_extends({}, color, {
        r: _r2,
        g: _g2,
        b: _b2,
        a: a,
        hex: hex
      }));
    }
  }

  function handleClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  var rgbaBackground = colorFns.rgba(r, g, b, a);
  var rgba0 = colorFns.rgba(r, g, b, 0);
  var rgba100 = colorFns.rgba(r, g, b, 100);
  var opacityGradient = "linear-gradient(to right, " + rgba0 + ", " + rgba100 + ")";
  var hueBackground = colorFns.hsv2hex(h, 100, 100);
  return core.jsx("div", {
    css: styles.picker,
    onClick: handleClick
  }, core.jsx("div", {
    className: "hexRGBCont",
    css: styles.inputs
  }, core.jsx("div", {
    className: "hexRGBInputCont",
    css: styles.inputs
  }, core.jsx("div", {
    className: "hexRGB",
    css: styles.input
  }, core.jsx("input", {
    id: hexId,
    style: {
      width: 70,
      textAlign: 'left'
    },
    type: "text",
    defaultValue: color.hex,
    onChange: function onChange(e) {
      return changeHex(e.target.value);
    },
    onKeyUp: handleHexKeyUp //disabled={disabled}

  }), core.jsx("div", null, "Hex")), core.jsx("div", {
    className: "hexRGB",
    css: styles.input
  }, core.jsx(InputNumber, {
    min: 0,
    max: 255,
    value: r,
    onChange: function onChange(r) {
      return changeRGB(r, g, b);
    },
    disabled: disabled
  }), core.jsx("div", null, "R")), core.jsx("div", {
    className: "hexRGB",
    css: styles.input
  }, core.jsx(InputNumber, {
    min: 0,
    max: 255,
    value: g,
    onChange: function onChange(g) {
      return changeRGB(r, g, b);
    },
    disabled: disabled
  }), core.jsx("div", null, "G")), core.jsx("div", {
    className: "hexRGB",
    css: styles.input
  }, core.jsx(InputNumber, {
    min: 0,
    max: 255,
    value: b,
    onChange: function onChange(b) {
      return changeRGB(r, g, b);
    },
    disabled: disabled
  }), core.jsx("div", null, "B")), core.jsx("div", {
    className: "hexRGB alpha",
    css: styles.input
  }, core.jsx(InputNumber, {
    min: 0,
    max: 100,
    value: a,
    onChange: function onChange(a) {
      return changeAlpha(a);
    },
    disabled: disabled
  }))), core.jsx("div", {
    className: "ColorSliderCont",
    css: _ref2
  }, core.jsx("div", {
    className: "ColorSlider",
    css: _ref3
  }, core.jsx(InputSlider, {
    axis: "x",
    x: h,
    xmax: 359,
    className: "ColorSliderSelect",
    onChange: function onChange(_ref4) {
      var x = _ref4.x;
      return changeHSV(x, s, v);
    },
    disabled: disabled,
    styles: {
      track: {
        width: '100%',
        height: 12,
        borderRadius: 0,
        background: 'linear-gradient(to left, #FF0000 0%, #FF0099 10%, #CD00FF 20%, #3200FF 30%, #0066FF 40%, #00FFFD 50%, #00FF66 60%, #35FF00 70%, #CDFF00 80%, #FF9900 90%, #FF0000 100%)'
      },
      active: {
        background: 'none'
      },
      thumb: {
        width: 5,
        height: 14,
        borderRadius: 0,
        backgroundColor: '#eee'
      }
    }
  }), core.jsx(InputSlider, {
    axis: "x",
    x: a,
    xmax: 100,
    className: "ColorSliderSelectOpacity",
    styles: {
      track: {
        width: '100%',
        height: 12,
        borderRadius: 0,
        background: opacityGradient
      },
      active: {
        background: 'none'
      },
      thumb: {
        width: 5,
        height: 14,
        borderRadius: 0,
        backgroundColor: '#eee'
      }
    },
    onChange: function onChange(_ref5) {
      var x = _ref5.x;
      return changeAlpha(x);
    },
    disabled: disabled
  })), core.jsx("div", {
    className: "ColorChosen",
    style: {
      backgroundColor: rgbaBackground,
      width: 30,
      height: 30
    }
  }))), core.jsx("div", {
    css: styles.selector,
    className: "ColorSquare",
    style: {
      backgroundColor: hueBackground
    }
  }, core.jsx("div", {
    css: styles.gradientWhite
  }), core.jsx("div", {
    css: styles.gradientDark
  }), core.jsx(InputSlider, {
    className: "SquareSlider",
    axis: "xy",
    x: s,
    xmax: 100,
    y: 100 - v,
    ymax: 100,
    onChange: function onChange(_ref6) {
      var x = _ref6.x,
          y = _ref6.y;
      return changeHSV(h, x, 100 - y);
    },
    disabled: disabled,
    styles: {
      track: {
        width: '100%',
        height: '100%',
        background: 'none'
      },
      thumb: {
        width: 12,
        height: 12,
        backgroundColor: 'rgba(0,0,0,0)',
        border: '2px solid #fff',
        borderRadius: '50%'
      }
    }
  })));
};

ColorPicker.defaultProps = {
  initialValue: '#5e72e4',
  disabled: false
};
var styles = {
  picker: {
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
    width: 230,
    '*': {
      userSelect: 'none'
    }
  },
  selector: {
    position: 'relative',
    width: 230,
    height: 230
  },
  gradientWhite: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0) 100%)'
  },
  gradientDark: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)'
  },
  inputs: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  input: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'normal',
    color: '#000',
    input: {
      width: 30,
      textAlign: 'center'
    }
  }
};

var _ref = {
  name: "7n089j",
  styles: "position:relative;display:none;box-sizing:border-box;width:49px;height:24px;padding:4px;background-color:#ffffff;border:1px solid #bebebe;border-radius:3px;user-select:none;"
};
var _ref2$1 = {
  name: "trkpwz",
  styles: "display:block;width:100%;height:100%;cursor:pointer;"
};

var InputColor = function InputColor(_ref3) {
  var hexId = _ref3.hexId,
      initialValue = _ref3.initialValue,
      onChange = _ref3.onChange,
      placement = _ref3.placement,
      disabled = _ref3.disabled,
      props = _objectWithoutPropertiesLoose(_ref3, ["hexId", "initialValue", "onChange", "placement", "disabled"]);

  var _useState = react.useState(parseColor(initialValue)),
      color = _useState[0],
      setColor = _useState[1];

  react.useEffect(function () {
    changeColor(parseColor(initialValue));
  }, [initialValue]);

  function changeColor(color) {
    if (onChange) {
      setColor(color);
      onChange(color);
    }
  }

  return core.jsx(Popover, {
    placement: placement,
    body: core.jsx(ColorPicker, {
      hexId: hexId,
      color: color,
      onChange: changeColor,
      disabled: disabled
    })
  }, core.jsx("span", _extends({}, props, {
    css: _ref
  }), core.jsx("span", {
    css: _ref2$1,
    style: {
      backgroundColor: color.rgba
    }
  })));
};

InputColor.defaultProps = {
  placement: 'bottom',
  disabled: false
};

exports.ColorPicker = ColorPicker;
exports.default = InputColor;
exports.parseColor = parseColor;
