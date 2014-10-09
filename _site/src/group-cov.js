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
_$jscoverage_init(_$jscoverage, "/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js",[2,11,12,15,28,31,33,41,45,46,47,48,51,52,53,57,61,64,65,67,68,77,80,81,82,86,92,93,96,97,99,100,104,105,106,107,109,113,115,123,125,134,137,138,140,143,144,151,153,160,166]);
_$jscoverage_init(_$jscoverage_cond, "/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js",[45,64,64,96,99,137]);
_$jscoverage["/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js"].source = ["","var Container = require('./container'),","  Item = require('./item'),","  Util = require('./util'),","  Shape = require('./shape');","","/**"," * @class Chart.Canvas.Group"," * 图形分组"," */","var Group = function(cfg){","  Group.superclass.constructor.call(this,cfg);","};","","Group.ATTRS = {","  /**","   * 沿x轴的偏移量","   * @type {Number}","   */","  x : null,","  /**","   * 沿y轴的偏移量","   * @type {Number}","   */","  y : null","};","","Util.extend(Group,Container);","","//获取画布内元素的一些共性方法","Util.mixin(Group,[Item]);","","Util.augment(Group,{","  /**","   * 是否Group","   * @type {Boolean}","   */","  isGroup : true,","  //创建DOM ","  createDom : function(){","    var _self = this,","      el = _self.get('el'),","      attrs = _self.get('attrs'),","      node;","    if(!el){","      el = _self.createElement();","      attrs && el.attr(attrs);","      _self.set('el',el);","    }","","    node = el.node;","    node.group = _self;","    _self.set('node',node);","  },","  //渲染","  renderUI : function(){","    this._initTranslate();","  },","  //初始化平移","  _initTranslate: function(){","    var _self = this,","      x = _self.get('x'),","      y = _self.get('y');","    if(x || y){","      _self._translate((x || 0),(y || 0));","    }else{","      _self.set('x',x || 0);","      _self.set('y',y || 0);","    }","  },","  /**","   * 移动","   * @param  {Number} dx 沿x轴平移的距离","   * @param  {Number} dy 沿y轴平移的距离","   */","  translate : function(dx,dy){","    var _self = this,","      x = _self.get('x') || 0,","      y = _self.get('y') || 0;","    _self.set('x',x + dx);","    _self.set('y',y + dy);","    _self._translate(dx,dy);","  },","","  getBBox : function(){","    var _self = this,","      children = _self.get('children'),","      w = 0,","      h = 0,","      rst = {};","","    Util.each(children,function(item){","      var bbox = item.getBBox(),","        w1 = bbox.width + bbox.x,","        h1 = bbox.height + bbox.y;","      if(w < w1){","        w = w1;","      }","      if(h < h1){","        h = h1;","      }","    });","","    rst.x = _self.get('x');","    rst.y = _self.get('y');","    rst.width = w;","    rst.height = h;","","    return rst;","","  },","  _translate : function(dx,dy){","    var _self = this,","      el = _self.get('el');","    el.translate(dx,dy);","  },","  /**","   * 是否包含指定的DOM","   * @param  {HTMLElement} element dom元素","   * @return {Boolean}   是否包含","   */","  containsElement : function(element){","    var _self = this,","      node = _self.get('node');","    return node == element || Util.contains(node,element);","  },","  ","  /**","   * 移动的到位置","   * @param  {Number} x 移动到x","   * @param  {Number} y 移动到y","   */","  move : function(x,y){","    var _self = this,","      cx = _self.get('x') || 0, //当前的x","      cy = _self.get('y') || 0; //当前的y","    if(Util.svg){","      _self._translate(x - cx,y -cy);","    }else{","      _self.get('el').move(x,y);","    }","    ","    _self.set('x',x);","    _self.set('y',y);","  },","  /**","   * @private","   * @ignore","   */","  createElement : function(){","    var _self = this,","      el = _self.get('parent').get('el');","    return el.group();","  },","  /**","   * @protected","   * @ignore","   */","  getGroupClass : function(){","    return Group;","  }","  ","","});","","module.exports = Group;",""];
_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 2);
var Container = require("./container"), Item = require("./item"), Util = require("./util"), Shape = require("./shape");

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 11);
var Group = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 12);
    Group.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 15);
Group.ATTRS = {
    x: null,
    y: null
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 28);
Util.extend(Group, Container);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 31);
Util.mixin(Group, [ Item ]);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 33);
Util.augment(Group, {
    isGroup: true,
    createDom: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 41);
        var _self = this, el = _self.get("el"), attrs = _self.get("attrs"), node;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 45);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 45, !el)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 46);
            el = _self.createElement();
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 47);
            attrs && el.attr(attrs);
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 48);
            _self.set("el", el);
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 51);
        node = el.node;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 52);
        node.group = _self;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 53);
        _self.set("node", node);
    },
    renderUI: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 57);
        this._initTranslate();
    },
    _initTranslate: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 61);
        var _self = this, x = _self.get("x"), y = _self.get("y");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 64);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 64, x) || _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 64, y)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 65);
            _self._translate(x || 0, y || 0);
        } else {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 67);
            _self.set("x", x || 0);
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 68);
            _self.set("y", y || 0);
        }
    },
    translate: function(dx, dy) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 77);
        var _self = this, x = _self.get("x") || 0, y = _self.get("y") || 0;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 80);
        _self.set("x", x + dx);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 81);
        _self.set("y", y + dy);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 82);
        _self._translate(dx, dy);
    },
    getBBox: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 86);
        var _self = this, children = _self.get("children"), w = 0, h = 0, rst = {};
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 92);
        Util.each(children, function(item) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 93);
            var bbox = item.getBBox(), w1 = bbox.width + bbox.x, h1 = bbox.height + bbox.y;
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 96);
            if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 96, w < w1)) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 97);
                w = w1;
            }
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 99);
            if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 99, h < h1)) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 100);
                h = h1;
            }
        });
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 104);
        rst.x = _self.get("x");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 105);
        rst.y = _self.get("y");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 106);
        rst.width = w;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 107);
        rst.height = h;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 109);
        return rst;
    },
    _translate: function(dx, dy) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 113);
        var _self = this, el = _self.get("el");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 115);
        el.translate(dx, dy);
    },
    containsElement: function(element) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 123);
        var _self = this, node = _self.get("node");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 125);
        return node == element || Util.contains(node, element);
    },
    move: function(x, y) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 134);
        var _self = this, cx = _self.get("x") || 0, cy = _self.get("y") || 0;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 137);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 137, Util.svg)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 138);
            _self._translate(x - cx, y - cy);
        } else {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 140);
            _self.get("el").move(x, y);
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 143);
        _self.set("x", x);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 144);
        _self.set("y", y);
    },
    createElement: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 151);
        var _self = this, el = _self.get("parent").get("el");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 153);
        return el.group();
    },
    getGroupClass: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 160);
        return Group;
    }
});

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/group.js", 166);
module.exports = Group;