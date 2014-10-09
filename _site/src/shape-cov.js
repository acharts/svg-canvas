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
_$jscoverage_init(_$jscoverage, "/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js",[1,11,12,15,19,22,24,34,39,40,41,42,43,45,46,48,49,50,57,61,62,69,70,77,86,87,88,89,90,91,94,104,107,116,118,121,128,131,132,134,141,143,150,153,157,160,161,162,163,166,170,171,172,173,174,175,176,177,178,180,182,185,187,196,197,200,218,220,227,228,231,261,262,269,270,273,296,297,304,305,308,317,319,326,327,330,353,355,361,362,363,367,368,372,374,375,379,382,386,389,393,396,400,403,407,411,412,414,422,423,426,438,440,443,446,453,454,455,460,467,468,471,483,485,488,491,498,499,500,505,512,513,516,544,546,553,554,557,559,567,573,574,575,578,582,589,590,593,631,634,638,642,646,648,652,654,660,662,665,668,672,676,679,683,687,690,694,697,701,704,705,710,711,712,714,721,725,729,730,731,732,733,737,739,743,744,753,756,757,758,759,760,761,762,765,769,770,772,776,777,779,781,782,784,787,788,790,796,805,806,809,837,839,841]);
_$jscoverage_init(_$jscoverage_cond, "/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js",[39,49,87,88,88,131,161,170,174,177,411,574,704,729,756,756,756,761,776,776,781,787]);
_$jscoverage["/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js"].source = ["var Base = require('./base'),","  Item = require('./item'),","  Util = require('./util');","  ","","/**"," * @class Chart.Canvas.Shape"," * 图形的基类"," * @extends Chart.Canvas.Base"," */","var Shape = function(cfg){","  Shape.superclass.constructor.call(this,cfg);","};","","Shape.ATTRS = {","  attrs : {}","}","","Util.extend(Shape,Base);","","//获取画布内元素的一些共性方法","Util.mixin(Shape,[Item]);","","Util.augment(Shape,{","  /**","   * 是否图形","   * @type {Boolean}","   */","  isShape : true,","  ","  //渲染shape","  createDom : function(){","","    var _self = this,","      el = _self.get('el'),","      node,","      cfg,","      attrs;","    if(!el){","      cfg = _self.cfg;","      attrs = _self.parseElCfg(cfg.attrs);","      el = _self.createElement(attrs);","      _self.set('el',el);","    }","    node = el.node;","    node.shape = this;","","    _self.set('node',node);","    if(this.get('visible') == false){","      el.hide();","    }","  },","  /**","   * @private","   */","  createElement : function(attrs){","    var _self = this,","      parent = _self.get('parent'),","      set = parent.get('el').add([attrs]),","      element;","    element = set[0];","    return element;","  },","  /**","   * @protected","   * 格式化初始化配置项","   */","  parseElCfg : function(attrs){","    attrs.type = this.get('type');","    return attrs;","  },","  /**","   * 获取图形的整体长度","   * @return {Number} 长度","   */","  getTotalLength : function(){","    return this.get('el').getTotalLength();","  },","  /**","   * 旋转","   * @param  {Number} a 旋转的角度","   * @param  {Number} x 旋转的中心点 x","   * @param  {Number} y 旋转的中心点 y","   */","  rotate : function(a, x, y){","    var _self = this;","    if(_self.isGroup){","      if(x == null && y == null){","        var tpoint = _self._getTranslatePoint();","        x = tpoint.x;","        y = tpoint.y;","      }","    }","    this.get('el').rotate(a,x,y);","  },","  /**","   * 放大","   * @param  {Number} sx x轴方向的倍数 ","   * @param  {Number} sy y轴方向的倍数","   * @param  {Number} cx x轴方向扩展的中心","   * @param  {Number} cy y轴方向扩展的中心","   */","  scale : function(sx, sy, cx,cy){","    var _self = this,","      el = _self.get('el');","    ","    el.scale(sx, sy, cx,cy);","  },","  /**","   * 直接使用transform方法 <br>","   *  \"t100,100r30,100,100s2,2,100,100r45s1.5\"","   *   - ","   * @param  {String} tstr 几何转换的字符串","   */","  transform : function(tstr){","    var _self = this,","      el = _self.get('el');","    el.transform(tstr);","  },","  getBBox : function(){","    return this.get('el').getBBox();","  },","  /**","   * 获取路径","   * @return {Array} 路径的数组","   */","  getPath : function(){","    var _self = this,","      el = _self.get('el'),","      path = el.getPath();","    if(Util.isString(path)){","      path = Util.parsePathString(path);","    }","    return path;","  },","  /**","   * 获取路径字符串","   * @return {String} 路径的字符串","   */","  getPathString : function(){","    var _self = this,","      path = _self.getPath();","    return Util.parsePathArray(path);","  },","  /**","   * 获取使用平移后的path","   * @return {Array} 路径的数组","   */","  getTransformPath : function(){","    var _self = this,","      path = _self.getPath(),","      matrix = _self.get('el').matrix;","    return Util.transformPath(path,matrix.toTransformString());","  },","  //获取到移动的位置","  _getTranslatePoint : function(){","    var _self = this,","      tPath = _self.getTransformPath(),","      rst = {x : 0,y : 0};","    Util.each(tPath,function(item){","      if(item[0] == 'M'){","        rst.x = item[1];","        rst.y = item[2];","      }","    });","    return rst;","  },","  //获取转换的信息，返回一个数组，处理非数组的场景","  __getTransform : function(value){","    if(Util.isString(value)){","      value = value.replace(/([t,s,r])/,';$1 ').split(';');","      var temp = [];","      Util.each(value,function(str){","        if(str){","          var sub = str.split(' ');","          sub = Util.map(sub,function(subStr){","            if(Util.isNumeric(subStr)){","              return parseFloat(subStr);","            }","            return subStr;","          });","          temp.push(sub);","        }","      });","      value = temp;","    }","    return value;","  }","});","","/**"," * 圆"," * @class Chart.Canvas.Shape.Circle"," * @extends Chart.Canvas.Shape"," */","var Circle = function(cfg){","  Circle.superclass.constructor.call(this,cfg);","};","","Circle.ATTRS = {","  /**","   * 圆心的x坐标","   * @type {Number}","   */","  cx : {},","  /**","   * 圆心的y坐标","   * @type {Number}","   */","  cy : {},","  /**","   * 圆的半径","   * @type {Number}","   */","  r : {}","};","","Util.extend(Circle,Shape);","","Shape.Circle = Circle;","","/**"," * 矩形"," * @class Chart.Canvas.Shape.Rect"," * @extends Chart.Canvas.Shape"," */","var Rect = function(cfg){","  Rect.superclass.constructor.call(this,cfg);","};","","Rect.ATTRS = {","  /**","   * 矩形的左定点x坐标","   * @type {Number}","   */","  x : {},","  /**","   * 矩形的左定点y坐标","   * @type {Number}","   */","  y : {},","  /**","   * 矩形的宽度","   * @type {Number}","   */","  width : {},","  /**","   * 矩形的高度","   * @type {Number}","   */","  height : {},","  /**","   * 圆角","   * @type {Number}","   */","  r: {","    value : 0","  }","};","","Util.extend(Rect,Shape);","Shape.Rect = Rect;","","/**"," * 矩形"," * @class Chart.Canvas.Shape.Ellipse"," * @extends Chart.Canvas.Shape"," */","var Ellipse = function(cfg){","  Ellipse.superclass.constructor.call(this,cfg);","};","","Ellipse.ATTRS = {","  /**","   * 矩形的左定点x坐标","   * @type {Number}","   */","  cx : {},","  /**","   * 矩形的左定点y坐标","   * @type {Number}","   */","  cy : {},","  /**","   * 矩形的宽度","   * @type {Number}","   */","  rx : {},","  /**","   * 矩形的高度","   * @type {Number}","   */","  ry : {}","};","","Util.extend(Ellipse,Shape);","Shape.Ellipse = Ellipse;","","/**"," * 路径"," * @class Chart.Canvas.Shape.Path"," * @extends Chart.Canvas.Shape"," */","var Path = function(cfg){","  Path.superclass.constructor.call(this,cfg);","};","","Path.ATTRS = {","  /**","   * 路径","   * @type {String}","   */","  path : {}","};","","","Util.extend(Path,Shape);","","Shape.Path = Path;","","/**"," * 直线"," * @class Chart.Canvas.Shape.Line"," * @extends Chart.Canvas.Shape.Path"," */","var Line = function(cfg){","  Line.superclass.constructor.call(this,cfg);","};","","Line.ATTRS = {","  /**","   * 起始x坐标","   * @type {Number}","   */","  x1 : {},","  /**","   * 起始y坐标","   * @type {Number}","   */","  y1 : {},","  /**","   * 终止x坐标","   * @type {Number}","   */","  x2 : {},","  /**","   * 终止y坐标","   * @type {Number}","   */","  y2 : {}","};","","Util.extend(Line,Path);","","Util.augment(Line,{","  /**","   * @protected","   * 格式化初始化配置项","   */","  parseElCfg : function(attrs){","    attrs.type = 'path'; //将线转换成path","    attrs.path = Util.substitute('M {x1},{y1}L{x2},{y2}',attrs);","    return attrs;","  },","  //获取线的坐标点","  _getLinePoint : function(pointIndex,coordIndex){","    var path = this.getPath();","    return path[pointIndex][coordIndex];","  },","  //设置线的坐标点","  _setLinePoint : function(pointIndex,coordIndex,value){","    var _self = this,","      path = this.getPath();","    path[pointIndex][coordIndex] = value;","    _self.attr('path',path);","  },","  //设置坐标x1","  __setX1 : function(value){","    this._setLinePoint(0,1,value);","  },","  __getX1 : function(){","    return this._getLinePoint(0,1);","  },","  //设置坐标x2","  __setX2 : function(value){","    this._setLinePoint(1,1,value);","  },","  __getX2 : function(){","    return this._getLinePoint(1,1);","  },","  //设置坐标y1","  __setY1 : function(value){","    this._setLinePoint(0,2,value);","  },","  __getY1 : function(){","    return this._getLinePoint(0,2);","  },","  //设置坐标y2","  __setY2 : function(value){","    this._setLinePoint(1,2,value);","  },","  __getY2 : function(){","    return this._getLinePoint(1,2);","  }","});","","Shape.Line = Line;","","","function points2path(points,z){","  if(Util.isArray(points)){","    points = points.join(' ');","  }","  return 'M' + points + z;","}","","/**"," * 折线，polyLine"," * @class Chart.Canvas.Shape.PolyLine"," * @extends Chart.Canvas.Shape.Path"," */","var PolyLine = function(cfg){","  PolyLine.superclass.constructor.call(this,cfg);","};","","PolyLine.ATTRS = {","  /**","   * 定点集合，可以是字符串、或者数组","   *","   *  - 字符串： '0,0 25,25 31,50'","   *  - 数组 ： ['0,0','25,25','31,50']","   *  ","   * @type {Array|String}","   */","  points : []","};","","Util.extend(PolyLine,Path);","","Util.augment(PolyLine,{","  //设置顶点","  __setPoints : function(value){","    var _self = this,","      el = _self.get('el'),","      path = points2path(value,'');","    _self.attr('path',path);","  },","  /**","   * @protected","   * 格式化初始化配置项","   */","  parseElCfg : function(attrs){","    attrs.type = 'path'; //将线转换成path","    attrs.path = points2path(attrs.points,'');","    return attrs;","  }","","});","","Shape.PolyLine = PolyLine;","","/**"," * 多边形"," * @class Chart.Canvas.Shape.Polygon"," * @extends Chart.Canvas.Shape.Path"," */","var Polygon = function(cfg){","  PolyLine.superclass.constructor.call(this,cfg);","};","","Polygon.ATTRS = {","  /**","   * 定点集合，可以是字符串、或者数组","   *","   *  - 字符串： '0,0 25,25 31,50'","   *  - 数组 ： ['0,0','25,25','31,50']","   *  ","   * @type {Array|String}","   */","  points : []","};","","Util.extend(Polygon,Path);","","Util.augment(Polygon,{","  //设置顶点","  __setPoints : function(value){","    var _self = this,","      el = _self.get('el'),","      path = points2path(value,'z');","    _self.attr('path',path);","  },","  /**","   * @protected","   * 格式化初始化配置项","   */","  parseElCfg : function(attrs){","    attrs.type = 'path'; //将线转换成path","    attrs.path = points2path(attrs.points,'z');","    return attrs;","  }","","});","","Shape.Polygon = Polygon;","","/**"," * 文本"," * @class Chart.Canvas.Shape.Text"," * @extends Chart.Canvas.Shape"," */","var Text = function(cfg){","  Text.superclass.constructor.call(this,cfg);","};","","Text.ATTRS = {","  /**","   * x轴坐标","   * @type {Number}","   */","  x : {},","  /**","   * y轴坐标","   * @type {Number}","   */","  y : {},","  /**","   * 显示的文本","   * @type {String}","   */","  text : {},","  /**","   * 字体相关的属性，也可以单独设置其中的属性: font-family,font-weight....","   * @type {String}","   */","  'font' : {},","  /**","   * 文本的对齐方式：默认对齐方式: 'middle'","   * @type {String}","   */","  'text-anchor' : {}","};","","Util.extend(Text,Shape);","","Shape.Text = Text;","","/**"," * @class Chart.Canvas.Shape.Label"," * 文本标签，继承自文本，但是提供了rotate属性"," * @extends Chart.Canvas.Shape.Text"," */","var Label = function(cfg){","  Label.superclass.constructor.call(this,cfg);","};","","Util.extend(Label,Text);","","Label.ATTRS = {","  /**","   * 旋转角度","   * @type {Number}","   */","  rotate : {}","};","","Util.augment(Label,{","  /**","   * @protected","   * 格式化初始化配置项","   */","  parseElCfg : function(attrs){","    attrs.type = 'text';","    if(attrs.rotate){","      attrs.transform = Util.substitute('r{rotate} {x} {y}',attrs);","    }","    ","    return attrs;","  }","});","","Shape.Label = Label;","","/**"," * @class Chart.Canvas.Shape.Marker"," * 用于标示节点的图形"," * @extends Chart.Canvas.Shape"," */","var Marker = function(cfg){","  Marker.superclass.constructor.call(this,cfg);","};","","Marker.ATTRS = {","  /**","   * 类型 \"circle\", \"square\", \"diamond\", \"triangle\" and \"triangle-down\"；如果是 \"url(xxx)\"则是图片；custom则需要指定路径","   * @type {String}","   */","  symbol :{","    value : 'custom'","  },","  /**","   * 半径","   * @type {Number}","   */","  radius : {","    value : 5","  },","  /**","   * 如果类型为\"custom\"时指定路径","   * @type {Object}","   */","  path : {","","  },","  /**","   * 起始x轴位置","   * @type {Number}","   */","  x : {","","  },","  /**","   * 起始y轴位置","   * @type {Number}","   */","  y : {","","  }","};","","Marker.Symbols = {","  //圆","  circle : function(x,y,r){","    return [['M',x,y - r],['a',r,r,0,1,1,0,2*r],['a',r,r,0,1,1,0,-2*r],['z']];","  },","  //正方形","  square : function(x,y,r){","    return [['M',x-r,y-r],['L',x + r,y-r],['L',x + r,y + r],['L',x - r,y + r],['z']];","  },","  //菱形","  diamond : function(x,y,r){","    return [['M',x - r,y],['L',x,y - r],['L',x + r, y],['L',x,y + r],['z']];","  },","  //三角形","  triangle : function(x,y,r){","    var diffX = r / 0.866,","      diffY =  r;","    return [['M',x,y-r],['L',x + diffX,y + diffY],['L',x - diffX, y + diffY],['z']];","  },","  //倒三角形","  'triangle-down' : function(x,y,r){","    var diffX = r / 0.866,","      diffY =  r;","    return [['M',x,y + r],['L',x + diffX, y - diffY],['L',x - diffX,y - diffY],['z']];","  }","};","","","","Util.extend(Marker,Shape);","","Util.augment(Marker,{","  //设置半径","  __setRadius : function(v){","    var _self = this,","      attrs = _self.get('attrs');","","    _self._setSize(attrs.x,attrs.y,v);","","  },","  __getRadius : function(){","    return this.get('attrs').radius;","  },","  //设置x","  __setX : function(x){","    var _self = this,","      attrs = _self.get('attrs');","","    _self._setSize(x,attrs.y,attrs.radius);","","  },","  __getX : function(){","    return this.get('attrs').x;","  },","  //设置y","  __setY : function(y){","    var _self = this,","      attrs = _self.get('attrs');","","    _self._setSize(attrs.x,y,attrs.radius);","","  },","  __getY : function(){","    return this.get('attrs').y;","  },","  __getSymbol : function(){","    return this.get('attrs').symbol;","  },","  //设置大小，位置","  _setSize : function(x,y,radius){","    var _self = this,","      attrs = _self.get('attrs'),","      el = _self.get('el');","    if(el.type !== 'image'){","      var cfg = {","        x : x,","        y : y,","        radius : radius","      };","      Util.mix(attrs,cfg);","      var path = _self._getPath(attrs);","      el.attr('path',path);","    }else{","      Util.mix(attrs,{","        width : radius * 2,","        height : radius * 2,","        x : x - (radius - attrs.radius),","        y : y - (radius - attrs.radius),","        radius : radius","      });","      el.attr(attrs);","    }","  },","  animate : function(params,ms,easing,callback){","    var _self = this,","      attrs = _self.get('attrs'),","      path;","        ","    if(_self.get('el').type == 'image'){","      var radius = params.radius || _self.attr('radius');","      params.x = params.x - radius;","      params.y = params.y - radius;","      Util.mix(attrs,{","        x : params.x,","        y : params.y","      });","      _self.get('el').animate(params,ms,easing,callback);","    }else{","      Util.mix(attrs,{","        x : params.x,","        y : params.y","      });","      path = _self._getPath(attrs);","      _self.get('el').animate({path : path},ms,easing,callback);","    }","  },","","  /**","   * @protected","   * 格式化初始化配置项","   */","  parseElCfg : function(attrs){","    var _self = this,","      symbol = attrs.symbol,","      radius = attrs.radius || 5;","    if(symbol && !Util.isFunction(symbol) && symbol.indexOf('url') != -1){ //图片","      attrs.type = 'image';","      attrs.src = symbol.replace(/url\\((.*)\\)/,'$1');","      attrs.width = attrs.radius * 2;","      attrs.height = attrs.radius * 2;","      if (Util.vml) {","        attrs.x -= radius-1,","        attrs.y -= radius-1;","      } else {","        attrs.x -= radius,","        attrs.y -= radius;","      }","    }else{","      attrs.type = 'path';","      attrs.path = _self._getPath(attrs);","    }","    return attrs;","  },","  //获取path","  _getPath : function(attrs){","    if(!attrs.symbol && attrs.path){","      return  Util.substitute(attrs.path,attrs);","    }","    var method;","","    if(Util.isFunction(attrs.symbol)){","      method = attrs.symbol;","    }else{","      method = Marker.Symbols[attrs.symbol];","    }","    ","    if(method){","      return method(attrs.x,attrs.y,attrs.radius)","    }else{","      throw 'not support this type ' + attrs.symbol;","    }","  }","","});","","Shape.Marker = Marker;","","","","/**"," * @class Chart.Canvas.Shape.Image"," * 图片"," * @extends Chart.Canvas.Shape"," */","var Image = function(cfg){","  Image.superclass.constructor.call(this,cfg);","};","","Image.ATTRS = {","  /**","   * 路径","   * @type {String}","   */","  src : {}, ","  /**","   * x轴位置","   * @type {Number}","   */","  x : {}, ","  /**","   * y轴位置","   * @type {Number}","   */","  y : {}, ","  /**","   * 宽度","   * @type {Number}","   */","  width : {}, ","  /**","   * 高度","   * @type {Number}","   */","  height : {}","}","","Util.extend(Image,Shape);","","Shape.Image = Image;","","module.exports = Shape;",""];
_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 1);
var Base = require("./base"), Item = require("./item"), Util = require("./util");

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 11);
var Shape = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 12);
    Shape.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 15);
Shape.ATTRS = {
    attrs: {}
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 19);
Util.extend(Shape, Base);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 22);
Util.mixin(Shape, [ Item ]);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 24);
Util.augment(Shape, {
    isShape: true,
    createDom: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 34);
        var _self = this, el = _self.get("el"), node, cfg, attrs;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 39);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 39, !el)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 40);
            cfg = _self.cfg;
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 41);
            attrs = _self.parseElCfg(cfg.attrs);
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 42);
            el = _self.createElement(attrs);
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 43);
            _self.set("el", el);
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 45);
        node = el.node;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 46);
        node.shape = this;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 48);
        _self.set("node", node);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 49);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 49, this.get("visible") == false)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 50);
            el.hide();
        }
    },
    createElement: function(attrs) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 57);
        var _self = this, parent = _self.get("parent"), set = parent.get("el").add([ attrs ]), element;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 61);
        element = set[0];
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 62);
        return element;
    },
    parseElCfg: function(attrs) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 69);
        attrs.type = this.get("type");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 70);
        return attrs;
    },
    getTotalLength: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 77);
        return this.get("el").getTotalLength();
    },
    rotate: function(a, x, y) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 86);
        var _self = this;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 87);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 87, _self.isGroup)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 88);
            if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 88, x == null) && _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 88, y == null)) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 89);
                var tpoint = _self._getTranslatePoint();
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 90);
                x = tpoint.x;
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 91);
                y = tpoint.y;
            }
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 94);
        this.get("el").rotate(a, x, y);
    },
    scale: function(sx, sy, cx, cy) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 104);
        var _self = this, el = _self.get("el");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 107);
        el.scale(sx, sy, cx, cy);
    },
    transform: function(tstr) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 116);
        var _self = this, el = _self.get("el");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 118);
        el.transform(tstr);
    },
    getBBox: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 121);
        return this.get("el").getBBox();
    },
    getPath: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 128);
        var _self = this, el = _self.get("el"), path = el.getPath();
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 131);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 131, Util.isString(path))) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 132);
            path = Util.parsePathString(path);
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 134);
        return path;
    },
    getPathString: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 141);
        var _self = this, path = _self.getPath();
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 143);
        return Util.parsePathArray(path);
    },
    getTransformPath: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 150);
        var _self = this, path = _self.getPath(), matrix = _self.get("el").matrix;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 153);
        return Util.transformPath(path, matrix.toTransformString());
    },
    _getTranslatePoint: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 157);
        var _self = this, tPath = _self.getTransformPath(), rst = {
            x: 0,
            y: 0
        };
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 160);
        Util.each(tPath, function(item) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 161);
            if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 161, item[0] == "M")) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 162);
                rst.x = item[1];
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 163);
                rst.y = item[2];
            }
        });
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 166);
        return rst;
    },
    __getTransform: function(value) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 170);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 170, Util.isString(value))) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 171);
            value = value.replace(/([t,s,r])/, ";$1 ").split(";");
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 172);
            var temp = [];
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 173);
            Util.each(value, function(str) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 174);
                if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 174, str)) {
                    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 175);
                    var sub = str.split(" ");
                    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 176);
                    sub = Util.map(sub, function(subStr) {
                        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 177);
                        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 177, Util.isNumeric(subStr))) {
                            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 178);
                            return parseFloat(subStr);
                        }
                        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 180);
                        return subStr;
                    });
                    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 182);
                    temp.push(sub);
                }
            });
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 185);
            value = temp;
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 187);
        return value;
    }
});

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 196);
var Circle = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 197);
    Circle.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 200);
Circle.ATTRS = {
    cx: {},
    cy: {},
    r: {}
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 218);
Util.extend(Circle, Shape);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 220);
Shape.Circle = Circle;

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 227);
var Rect = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 228);
    Rect.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 231);
Rect.ATTRS = {
    x: {},
    y: {},
    width: {},
    height: {},
    r: {
        value: 0
    }
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 261);
Util.extend(Rect, Shape);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 262);
Shape.Rect = Rect;

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 269);
var Ellipse = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 270);
    Ellipse.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 273);
Ellipse.ATTRS = {
    cx: {},
    cy: {},
    rx: {},
    ry: {}
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 296);
Util.extend(Ellipse, Shape);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 297);
Shape.Ellipse = Ellipse;

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 304);
var Path = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 305);
    Path.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 308);
Path.ATTRS = {
    path: {}
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 317);
Util.extend(Path, Shape);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 319);
Shape.Path = Path;

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 326);
var Line = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 327);
    Line.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 330);
Line.ATTRS = {
    x1: {},
    y1: {},
    x2: {},
    y2: {}
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 353);
Util.extend(Line, Path);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 355);
Util.augment(Line, {
    parseElCfg: function(attrs) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 361);
        attrs.type = "path";
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 362);
        attrs.path = Util.substitute("M {x1},{y1}L{x2},{y2}", attrs);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 363);
        return attrs;
    },
    _getLinePoint: function(pointIndex, coordIndex) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 367);
        var path = this.getPath();
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 368);
        return path[pointIndex][coordIndex];
    },
    _setLinePoint: function(pointIndex, coordIndex, value) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 372);
        var _self = this, path = this.getPath();
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 374);
        path[pointIndex][coordIndex] = value;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 375);
        _self.attr("path", path);
    },
    __setX1: function(value) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 379);
        this._setLinePoint(0, 1, value);
    },
    __getX1: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 382);
        return this._getLinePoint(0, 1);
    },
    __setX2: function(value) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 386);
        this._setLinePoint(1, 1, value);
    },
    __getX2: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 389);
        return this._getLinePoint(1, 1);
    },
    __setY1: function(value) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 393);
        this._setLinePoint(0, 2, value);
    },
    __getY1: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 396);
        return this._getLinePoint(0, 2);
    },
    __setY2: function(value) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 400);
        this._setLinePoint(1, 2, value);
    },
    __getY2: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 403);
        return this._getLinePoint(1, 2);
    }
});

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 407);
Shape.Line = Line;

function points2path(points, z) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 411);
    if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 411, Util.isArray(points))) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 412);
        points = points.join(" ");
    }
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 414);
    return "M" + points + z;
}

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 422);
var PolyLine = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 423);
    PolyLine.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 426);
PolyLine.ATTRS = {
    points: []
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 438);
Util.extend(PolyLine, Path);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 440);
Util.augment(PolyLine, {
    __setPoints: function(value) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 443);
        var _self = this, el = _self.get("el"), path = points2path(value, "");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 446);
        _self.attr("path", path);
    },
    parseElCfg: function(attrs) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 453);
        attrs.type = "path";
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 454);
        attrs.path = points2path(attrs.points, "");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 455);
        return attrs;
    }
});

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 460);
Shape.PolyLine = PolyLine;

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 467);
var Polygon = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 468);
    PolyLine.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 471);
Polygon.ATTRS = {
    points: []
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 483);
Util.extend(Polygon, Path);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 485);
Util.augment(Polygon, {
    __setPoints: function(value) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 488);
        var _self = this, el = _self.get("el"), path = points2path(value, "z");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 491);
        _self.attr("path", path);
    },
    parseElCfg: function(attrs) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 498);
        attrs.type = "path";
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 499);
        attrs.path = points2path(attrs.points, "z");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 500);
        return attrs;
    }
});

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 505);
Shape.Polygon = Polygon;

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 512);
var Text = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 513);
    Text.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 516);
Text.ATTRS = {
    x: {},
    y: {},
    text: {},
    font: {},
    "text-anchor": {}
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 544);
Util.extend(Text, Shape);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 546);
Shape.Text = Text;

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 553);
var Label = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 554);
    Label.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 557);
Util.extend(Label, Text);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 559);
Label.ATTRS = {
    rotate: {}
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 567);
Util.augment(Label, {
    parseElCfg: function(attrs) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 573);
        attrs.type = "text";
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 574);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 574, attrs.rotate)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 575);
            attrs.transform = Util.substitute("r{rotate} {x} {y}", attrs);
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 578);
        return attrs;
    }
});

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 582);
Shape.Label = Label;

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 589);
var Marker = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 590);
    Marker.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 593);
Marker.ATTRS = {
    symbol: {
        value: "custom"
    },
    radius: {
        value: 5
    },
    path: {},
    x: {},
    y: {}
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 631);
Marker.Symbols = {
    circle: function(x, y, r) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 634);
        return [ [ "M", x, y - r ], [ "a", r, r, 0, 1, 1, 0, 2 * r ], [ "a", r, r, 0, 1, 1, 0, -2 * r ], [ "z" ] ];
    },
    square: function(x, y, r) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 638);
        return [ [ "M", x - r, y - r ], [ "L", x + r, y - r ], [ "L", x + r, y + r ], [ "L", x - r, y + r ], [ "z" ] ];
    },
    diamond: function(x, y, r) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 642);
        return [ [ "M", x - r, y ], [ "L", x, y - r ], [ "L", x + r, y ], [ "L", x, y + r ], [ "z" ] ];
    },
    triangle: function(x, y, r) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 646);
        var diffX = r / .866, diffY = r;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 648);
        return [ [ "M", x, y - r ], [ "L", x + diffX, y + diffY ], [ "L", x - diffX, y + diffY ], [ "z" ] ];
    },
    "triangle-down": function(x, y, r) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 652);
        var diffX = r / .866, diffY = r;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 654);
        return [ [ "M", x, y + r ], [ "L", x + diffX, y - diffY ], [ "L", x - diffX, y - diffY ], [ "z" ] ];
    }
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 660);
Util.extend(Marker, Shape);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 662);
Util.augment(Marker, {
    __setRadius: function(v) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 665);
        var _self = this, attrs = _self.get("attrs");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 668);
        _self._setSize(attrs.x, attrs.y, v);
    },
    __getRadius: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 672);
        return this.get("attrs").radius;
    },
    __setX: function(x) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 676);
        var _self = this, attrs = _self.get("attrs");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 679);
        _self._setSize(x, attrs.y, attrs.radius);
    },
    __getX: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 683);
        return this.get("attrs").x;
    },
    __setY: function(y) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 687);
        var _self = this, attrs = _self.get("attrs");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 690);
        _self._setSize(attrs.x, y, attrs.radius);
    },
    __getY: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 694);
        return this.get("attrs").y;
    },
    __getSymbol: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 697);
        return this.get("attrs").symbol;
    },
    _setSize: function(x, y, radius) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 701);
        var _self = this, attrs = _self.get("attrs"), el = _self.get("el");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 704);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 704, el.type !== "image")) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 705);
            var cfg = {
                x: x,
                y: y,
                radius: radius
            };
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 710);
            Util.mix(attrs, cfg);
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 711);
            var path = _self._getPath(attrs);
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 712);
            el.attr("path", path);
        } else {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 714);
            Util.mix(attrs, {
                width: radius * 2,
                height: radius * 2,
                x: x - (radius - attrs.radius),
                y: y - (radius - attrs.radius),
                radius: radius
            });
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 721);
            el.attr(attrs);
        }
    },
    animate: function(params, ms, easing, callback) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 725);
        var _self = this, attrs = _self.get("attrs"), path;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 729);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 729, _self.get("el").type == "image")) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 730);
            var radius = params.radius || _self.attr("radius");
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 731);
            params.x = params.x - radius;
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 732);
            params.y = params.y - radius;
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 733);
            Util.mix(attrs, {
                x: params.x,
                y: params.y
            });
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 737);
            _self.get("el").animate(params, ms, easing, callback);
        } else {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 739);
            Util.mix(attrs, {
                x: params.x,
                y: params.y
            });
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 743);
            path = _self._getPath(attrs);
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 744);
            _self.get("el").animate({
                path: path
            }, ms, easing, callback);
        }
    },
    parseElCfg: function(attrs) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 753);
        var _self = this, symbol = attrs.symbol, radius = attrs.radius || 5;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 756);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 756, symbol) && _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 756, !Util.isFunction(symbol)) && _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 756, symbol.indexOf("url") != -1)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 757);
            attrs.type = "image";
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 758);
            attrs.src = symbol.replace(/url\((.*)\)/, "$1");
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 759);
            attrs.width = attrs.radius * 2;
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 760);
            attrs.height = attrs.radius * 2;
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 761);
            if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 761, Util.vml)) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 762);
                attrs.x -= radius - 1, attrs.y -= radius - 1;
            } else {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 765);
                attrs.x -= radius, attrs.y -= radius;
            }
        } else {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 769);
            attrs.type = "path";
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 770);
            attrs.path = _self._getPath(attrs);
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 772);
        return attrs;
    },
    _getPath: function(attrs) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 776);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 776, !attrs.symbol) && _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 776, attrs.path)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 777);
            return Util.substitute(attrs.path, attrs);
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 779);
        var method;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 781);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 781, Util.isFunction(attrs.symbol))) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 782);
            method = attrs.symbol;
        } else {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 784);
            method = Marker.Symbols[attrs.symbol];
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 787);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 787, method)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 788);
            return method(attrs.x, attrs.y, attrs.radius);
        } else {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 790);
            throw "not support this type " + attrs.symbol;
        }
    }
});

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 796);
Shape.Marker = Marker;

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 805);
var Image = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 806);
    Image.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 809);
Image.ATTRS = {
    src: {},
    x: {},
    y: {},
    width: {},
    height: {}
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 837);
Util.extend(Image, Shape);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 839);
Shape.Image = Image;

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/shape.js", 841);
module.exports = Shape;