// instrument by jscoverage, do not modifly this file
(function () {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (!BASE._$jscoverage) {
    BASE._$jscoverage = {};
    BASE._$jscoverage_cond = {};
    BASE._$jscoverage_done = function (file, line, express) {
      if (arguments.length === 2) {
        BASE._$jscoverage[file][line] ++;
      } else {
        BASE._$jscoverage_cond[file][line] ++;
        return express;
      }
    };
    BASE._$jscoverage_init = function (base, file, lines) {
      var tmp = [];
      for (var i = 0; i < lines.length; i ++) {
        tmp[lines[i]] = 0;
      }
      base[file] = tmp;
    };
  }
})();
_$jscoverage_init(_$jscoverage, "/Users/dxq613/Desktop/work/web/graphic/svg/index.js",[1,3]);
_$jscoverage_init(_$jscoverage_cond, "/Users/dxq613/Desktop/work/web/graphic/svg/index.js",[]);
_$jscoverage["/Users/dxq613/Desktop/work/web/graphic/svg/index.js"].source = ["var svg = require('./src/canvas');","","module.exports = svg;",""];
_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/index.js", 1);
var svg = require("./src/canvas");

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/index.js", 3);
module.exports = svg;