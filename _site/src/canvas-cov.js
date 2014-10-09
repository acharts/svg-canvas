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
_$jscoverage_init(_$jscoverage, "/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js",[2,12,13,16,41,43,49,52,59,60,63,64,65,66,67,75,77,78,79,92,104,107,114,117,120,123,132,138,139,140,142,144,145,148,157,160,161,162,164,166,167,170,176]);
_$jscoverage_init(_$jscoverage_cond, "/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js",[59,138,160]);
_$jscoverage["/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js"].source = ["","var ","  Util = require('./util'),","  Group = require('./group'),","  Container = require('./container');","","/**"," * @class Chart.Canvas"," * 图形的画板，支持SVG和VML"," * @extends Chart.Canvas.Container"," */","var Canvas = function(cfg){","  Canvas.superclass.constructor.call(this,cfg);","};","","Canvas.ATTRS = {","  /**","   * 宽度","   * @cfg {Number} width","   */","  width : {},","  /**","   * 高度","   * @cfg {Number} height","   */","  height : {},","  /**","   * 渲染到的节点","   * @cfg {String} id","   */","  id : {} ,","  /**","   * @private","   * @type {Object}","   */","  viewbox : {","","  }","};","","Util.extend(Canvas,Container);","","Util.augment(Canvas,{","  /**","   * @protected","   * @ignore","   */","  getGroupClass : function(){","    return Group;","  },","  renderUI : function(){","    var _self = this,","      id = _self.get('id'),","      width = _self.get('width'),","      height = _self.get('height'),","      node,","      container = Util.find(id);","","    if(!container){","      throw 'no id for canvas!';","    }","","    node = Util.svg({width: width,height : height});","    container.appendChild(node);","    _self.set('canvas',_self);","    _self.set('node',node);","    _self.set('container',container);","  },","  /**","   * 设置宽高","   * @param {Number} width 宽","   * @param {Number} height 高","   */","  setSize : function(width,height){","    var _self = this,","      node = _self.get('node');","    this.set('width',width);","    this.set('height',height);","    Util.attr(node,{","      width : width,","      height : height","    });","  },","  /**","   * 设置viewbox,用于放大，缩小视图","   * @param {Number} x x轴起点","   * @param {Number} y y轴起点","   * @param {Number} width 宽","   * @param {Number} height 高","   */","  setViewBox : function(x, y, w, h){","    this.set('viewbox',{","      x : x,","      y : y,","      width : w,","      height : h","    });","  },","  /**","   * 获取画布的内部宽度，不是DOM的宽度，而是viewbox的宽度","   * @return {Number} 宽度","   */","  getViewWidth : function(){","    var _self = this,","      viewbox = _self.get('viewbox');","","    return viewbox ? viewbox.width : _self.get('width');","  },","  /**","   * 获取画布的内部高度，不是DOM的宽度，而是viewbox的高度","   * @return {Number} 高度","   */","  getViewHeight : function(){","     var _self = this,","      viewbox = _self.get('viewbox');","","    return viewbox ? viewbox.height : _self.get('height');","  },","  _onRenderViewbox : function(viewbox){","    var _self = this,","      node = _self.get('node'),","      str = Util.substitute('{x} {y} {width} {height}',viewbox);","    Util.attr(node,'viewbox',str);","  },","  /**","   * 将页面上的坐标转换成画布上的坐标","   * @param  {Number} clientX 窗口的x坐标","   * @param  {Number} clientY 窗口上的y坐标","   * @return {Object} 坐标对象包含x,y","   */","  getPoint : function(clientX,clientY){","    var _self = this,","      node = _self.get('node'),","      viewbox = _self.get('viewbox'),","      offset = node.getBoundingClientRect(),","      point = {};","","    if(!viewbox){ //如果不存在viewbox","      point.x = clientX - offset.left;","      point.y = clientY - offset.top;","    }else{","      var xfactor = viewbox.width / _self.get('width'), //计算 宽度比例","        yfactor = viewbox.height / _self.get('height'); //高度比例","      point.x = (clientX - offset.left)  * xfactor + viewbox.x;","      point.y = (clientY - offset.top) * yfactor + viewbox.y;","    }","","    return point;","  },","  /**","   * 将相对地址转换成为画布上的坐标","   * @param  {Number} dx 相对于起始点的x偏移","   * @param  {Number} dy 相对于起始点的y偏移","   * @return {Object} 坐标对象","   */","  getRelativePoint : function(dx,dy){","    var _self = this,","      viewbox = _self.get('viewbox'),","      point = {};","    if(!viewbox){","      point.x = dx;","      point.y = dy;","    }else{","      var xfactor = viewbox.width / _self.get('width'), //计算 宽度比例","        yfactor = viewbox.height / _self.get('height'); //高度比例","      point.x = dx * xfactor + viewbox.x;","      point.y = dy * xfactor + viewbox.y;","    }","","    return point;","  }","","});","","","module.exports = Canvas;",""];
_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 2);
var Util = require("./util"), Group = require("./group"), Container = require("./container");

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 12);
var Canvas = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 13);
    Canvas.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 16);
Canvas.ATTRS = {
    width: {},
    height: {},
    id: {},
    viewbox: {}
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 41);
Util.extend(Canvas, Container);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 43);
Util.augment(Canvas, {
    getGroupClass: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 49);
        return Group;
    },
    renderUI: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 52);
        var _self = this, id = _self.get("id"), width = _self.get("width"), height = _self.get("height"), node, container = Util.find(id);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 59);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 59, !container)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 60);
            throw "no id for canvas!";
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 63);
        node = Util.svg({
            width: width,
            height: height
        });
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 64);
        container.appendChild(node);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 65);
        _self.set("canvas", _self);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 66);
        _self.set("node", node);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 67);
        _self.set("container", container);
    },
    setSize: function(width, height) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 75);
        var _self = this, node = _self.get("node");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 77);
        this.set("width", width);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 78);
        this.set("height", height);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 79);
        Util.attr(node, {
            width: width,
            height: height
        });
    },
    setViewBox: function(x, y, w, h) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 92);
        this.set("viewbox", {
            x: x,
            y: y,
            width: w,
            height: h
        });
    },
    getViewWidth: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 104);
        var _self = this, viewbox = _self.get("viewbox");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 107);
        return viewbox ? viewbox.width : _self.get("width");
    },
    getViewHeight: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 114);
        var _self = this, viewbox = _self.get("viewbox");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 117);
        return viewbox ? viewbox.height : _self.get("height");
    },
    _onRenderViewbox: function(viewbox) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 120);
        var _self = this, node = _self.get("node"), str = Util.substitute("{x} {y} {width} {height}", viewbox);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 123);
        Util.attr(node, "viewbox", str);
    },
    getPoint: function(clientX, clientY) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 132);
        var _self = this, node = _self.get("node"), viewbox = _self.get("viewbox"), offset = node.getBoundingClientRect(), point = {};
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 138);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 138, !viewbox)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 139);
            point.x = clientX - offset.left;
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 140);
            point.y = clientY - offset.top;
        } else {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 142);
            var xfactor = viewbox.width / _self.get("width"), yfactor = viewbox.height / _self.get("height");
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 144);
            point.x = (clientX - offset.left) * xfactor + viewbox.x;
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 145);
            point.y = (clientY - offset.top) * yfactor + viewbox.y;
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 148);
        return point;
    },
    getRelativePoint: function(dx, dy) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 157);
        var _self = this, viewbox = _self.get("viewbox"), point = {};
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 160);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 160, !viewbox)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 161);
            point.x = dx;
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 162);
            point.y = dy;
        } else {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 164);
            var xfactor = viewbox.width / _self.get("width"), yfactor = viewbox.height / _self.get("height");
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 166);
            point.x = dx * xfactor + viewbox.x;
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 167);
            point.y = dy * xfactor + viewbox.y;
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 170);
        return point;
    }
});

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/canvas.js", 176);
module.exports = Canvas;