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
_$jscoverage_init(_$jscoverage, "/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js",[6,12,16,21,27,36,40,44,48,52,55,57,61]);
_$jscoverage_init(_$jscoverage_cond, "/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js",[]);
_$jscoverage["/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js"].source = ["/**"," * @fileOverview 画布内部的元素扩展"," * @ignore"," */","  ","var Util = require('./util');","","/**"," * @class Chart.Canvas.CanvasItem"," * 画布内部元素的一些公用方法的扩展，仅作为接口使用"," */","var Item = function(){","","};","","Util.augment(Item,{","  /**","   * 到达最高层次 z-index","   */","  toFront : function(){","    return this;","  },","  /**","   * 最底层","   */","  toBack : function(){","    return this;","  },","  /**","   * 移动","   * @param  {Number} dx 沿x轴平移的距离","   * @param  {Number} dy 沿y轴平移的距离","   */","  translate : function(dx,dy){","   ","    return this;","  },","  scale : function(sx,sy){","","    return this;","  },","  rotate : function(angle){","","    return this;","  },","  skew : function(){","","    return this;","  },","  transform : function(){","","    return this;","  },","  index : function(){","    var _self = this,","      parent = _self.get('parent');","    return Util.indexOf(parent.get('children'),_self);","  }","});","","module.exports = Item;",""];
_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js", 6);
var Util = require("./util");

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js", 12);
var Item = function() {};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js", 16);
Util.augment(Item, {
    toFront: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js", 21);
        return this;
    },
    toBack: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js", 27);
        return this;
    },
    translate: function(dx, dy) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js", 36);
        return this;
    },
    scale: function(sx, sy) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js", 40);
        return this;
    },
    rotate: function(angle) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js", 44);
        return this;
    },
    skew: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js", 48);
        return this;
    },
    transform: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js", 52);
        return this;
    },
    index: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js", 55);
        var _self = this, parent = _self.get("parent");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js", 57);
        return Util.indexOf(parent.get("children"), _self);
    }
});

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/item.js", 61);
module.exports = Item;