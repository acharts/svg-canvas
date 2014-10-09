var Base = require('./base'),
  Item = require('./item'),
  Attrs = require('./attrs'),
  Util = require('./util');
  

/**
 * @class Chart.Canvas.Shape
 * 图形的基类
 * @extends Chart.Canvas.Base
 */
var Shape = function(cfg){
  Shape.superclass.constructor.call(this,cfg);
};

Shape.ATTRS = {
  attrs : {}
}

Util.extend(Shape,Base);

//获取画布内元素的一些共性方法
Util.mixin(Shape,[Item,Attrs]);

Util.augment(Shape,{
  /**
   * 是否图形
   * @type {Boolean}
   */
  isShape : true,
  
  //渲染shape
  createDom : function(){
    var _self = this,
      node,
      cfg,
      attrs;
    if(!node){
      cfg = _self.cfg;
      attrs = _self.parseElCfg(cfg.attrs);
      node = _self.createElement(attrs);
    }
    node.shape = this;
    
    if(this.get('visible') == false){
      el.hide();
    }
  },
  /**
   * @private
   */
  createElement : function(attrs){
    var _self = this,
      tagName = attrs.type,
      cfg = Util.mix({},attrs);

    delete cfg.type;
    var element = Util.svgNode(tagName);
    _self.set('node',element);
    _self.attr(cfg);
    return element;
  },
  /**
   * @protected
   * 格式化初始化配置项
   */
  parseElCfg : function(attrs){
    attrs.type = this.get('type');
    
    return attrs;
  },
  /**
   * 获取图形的整体长度
   * @return {Number} 长度
   */
  getTotalLength : function(){
    //return this.get('el').getTotalLength();
  },
  getBBox : function(){
    return this.get('node').getBBox();
  },
  /**
   * 获取路径
   * @return {Array} 路径的数组
   */
  getPath : function(){
    var _self = this,
      el = _self.get('el'),
      path = el.getPath();
    if(Util.isString(path)){
      path = Util.parsePathString(path);
    }
    return path;
  },
  /**
   * 获取路径字符串
   * @return {String} 路径的字符串
   */
  getPathString : function(){
    var _self = this,
      path = _self.getPath();
    return Util.parsePathArray(path);
  },
  /**
   * 获取使用平移后的path
   * @return {Array} 路径的数组
   */
  getTransformPath : function(){
    var _self = this,
      path = _self.getPath(),
      matrix = _self.get('el').matrix;
    return Util.transformPath(path,matrix.toTransformString());
  },
  //获取到移动的位置
  _getTranslatePoint : function(){
    var _self = this,
      tPath = _self.getTransformPath(),
      rst = {x : 0,y : 0};
    Util.each(tPath,function(item){
      if(item[0] == 'M'){
        rst.x = item[1];
        rst.y = item[2];
      }
    });
    return rst;
  },
  //获取转换的信息，返回一个数组，处理非数组的场景
  __getTransform : function(value){
    if(Util.isString(value)){
      value = value.replace(/([t,s,r])/,';$1 ').split(';');
      var temp = [];
      Util.each(value,function(str){
        if(str){
          var sub = str.split(' ');
          sub = Util.map(sub,function(subStr){
            if(Util.isNumeric(subStr)){
              return parseFloat(subStr);
            }
            return subStr;
          });
          temp.push(sub);
        }
      });
      value = temp;
    }
    return value;
  }
});

/**
 * 圆
 * @class Chart.Canvas.Shape.Circle
 * @extends Chart.Canvas.Shape
 */
var Circle = function(cfg){
  Circle.superclass.constructor.call(this,cfg);
};

Circle.ATTRS = {
  /**
   * 圆心的x坐标
   * @type {Number}
   */
  cx : {},
  /**
   * 圆心的y坐标
   * @type {Number}
   */
  cy : {},
  /**
   * 圆的半径
   * @type {Number}
   */
  r : {}
};

Util.extend(Circle,Shape);

Shape.Circle = Circle;

/**
 * 矩形
 * @class Chart.Canvas.Shape.Rect
 * @extends Chart.Canvas.Shape
 */
var Rect = function(cfg){
  Rect.superclass.constructor.call(this,cfg);
};

Rect.ATTRS = {
  /**
   * 矩形的左定点x坐标
   * @type {Number}
   */
  x : {},
  /**
   * 矩形的左定点y坐标
   * @type {Number}
   */
  y : {},
  /**
   * 矩形的宽度
   * @type {Number}
   */
  width : {},
  /**
   * 矩形的高度
   * @type {Number}
   */
  height : {},
  /**
   * 圆角
   * @type {Number}
   */
  r: {
    value : 0
  }
};

Util.extend(Rect,Shape);
Shape.Rect = Rect;

/**
 * 矩形
 * @class Chart.Canvas.Shape.Ellipse
 * @extends Chart.Canvas.Shape
 */
var Ellipse = function(cfg){
  Ellipse.superclass.constructor.call(this,cfg);
};

Ellipse.ATTRS = {
  /**
   * 矩形的左定点x坐标
   * @type {Number}
   */
  cx : {},
  /**
   * 矩形的左定点y坐标
   * @type {Number}
   */
  cy : {},
  /**
   * 矩形的宽度
   * @type {Number}
   */
  rx : {},
  /**
   * 矩形的高度
   * @type {Number}
   */
  ry : {}
};

Util.extend(Ellipse,Shape);
Shape.Ellipse = Ellipse;

/**
 * 路径
 * @class Chart.Canvas.Shape.Path
 * @extends Chart.Canvas.Shape
 */
var Path = function(cfg){
  Path.superclass.constructor.call(this,cfg);
};

Path.ATTRS = {
  /**
   * 路径
   * @type {String}
   */
  path : {}
};


Util.extend(Path,Shape);

Util.augment(Path,{

  __setPath : function(value){
    var path = Util.parsePathArray(value);
    this.attr('d',path);
  },
  __getPath : function(){
    var path = this.attr('d');
    return Util.parsePathString(path);
  },
  getPath : function(){
    return this.__getPath();
  }

});

Shape.Path = Path;

/**
 * 直线
 * @class Chart.Canvas.Shape.Line
 * @extends Chart.Canvas.Shape
 */
var Line = function(cfg){
  Line.superclass.constructor.call(this,cfg);
};

Line.ATTRS = {
  /**
   * 起始x坐标
   * @type {Number}
   */
  x1 : {},
  /**
   * 起始y坐标
   * @type {Number}
   */
  y1 : {},
  /**
   * 终止x坐标
   * @type {Number}
   */
  x2 : {},
  /**
   * 终止y坐标
   * @type {Number}
   */
  y2 : {}
};

Util.extend(Line,Shape);

Shape.Line = Line;


function points2path(points,z){
  if(Util.isArray(points)){
    points = points.join(' ');
  }
  return 'M' + points + z;
}

/**
 * 折线，polyLine
 * @class Chart.Canvas.Shape.PolyLine
 * @extends Chart.Canvas.Shape
 */
var PolyLine = function(cfg){
  PolyLine.superclass.constructor.call(this,cfg);
};

PolyLine.ATTRS = {
  /**
   * 定点集合，可以是字符串、或者数组
   *
   *  - 字符串： '0,0 25,25 31,50'
   *  - 数组 ： ['0,0','25,25','31,50']
   *  
   * @type {Array|String}
   */
  points : []
};

Util.extend(PolyLine,Shape);

Util.augment(PolyLine,{
  //设置顶点
  __setPoints : function(value){
    if(Util.isArray(value)){
      value = value.join(' ');
    }
    return value;
  }

});

Shape.PolyLine = PolyLine;

/**
 * 多边形
 * @class Chart.Canvas.Shape.Polygon
 * @extends Chart.Canvas.Shape
 */
var Polygon = function(cfg){
  PolyLine.superclass.constructor.call(this,cfg);
};

Polygon.ATTRS = {
  /**
   * 定点集合，可以是字符串、或者数组
   *
   *  - 字符串： '0,0 25,25 31,50'
   *  - 数组 ： ['0,0','25,25','31,50']
   *  
   * @type {Array|String}
   */
  points : []
};

Util.extend(Polygon,Shape);

Util.augment(Polygon,{
  //设置顶点
  __setPoints : function(value){
     if(Util.isArray(value)){
      value = value.join(' ');
    }
    return value;
  }

});

Shape.Polygon = Polygon;

/**
 * 文本
 * @class Chart.Canvas.Shape.Text
 * @extends Chart.Canvas.Shape
 */
var Text = function(cfg){
  Text.superclass.constructor.call(this,cfg);
};

Text.ATTRS = {
  /**
   * x轴坐标
   * @type {Number}
   */
  x : {},
  /**
   * y轴坐标
   * @type {Number}
   */
  y : {},
  /**
   * 显示的文本
   * @type {String}
   */
  text : {},
  /**
   * 字体相关的属性，也可以单独设置其中的属性: font-family,font-weight....
   * @type {String}
   */
  'font' : {},
  /**
   * 文本的对齐方式：默认对齐方式: 'middle'
   * @type {String}
   */
  'text-anchor' : {}
};

Util.extend(Text,Shape);

Util.augment(Text,{
  __setText : function(value){
    var _self = this,
      node = _self.get('node'),
      x = _self.attr('x') || _self.get('attrs').x;
    node.innerHTML = '';
    var arr = value.split('\n');
    Util.each(arr,function(ts,index){
      var tspan = Util.svgNode('tspan',{
        dy : index * 15,
        x : x
      });
      tspan.innerHTML = ts;
      node.appendChild(tspan);
    });
  }
});

Shape.Text = Text;

/**
 * @class Chart.Canvas.Shape.Label
 * 文本标签，继承自文本，但是提供了rotate属性
 * @extends Chart.Canvas.Shape.Text
 */
var Label = function(cfg){
  Label.superclass.constructor.call(this,cfg);
};

Util.extend(Label,Text);

Label.ATTRS = {
  /**
   * 旋转角度
   * @type {Number}
   */
  rotate : {}
};

Util.augment(Label,{
  /**
   * @protected
   * 格式化初始化配置项
   */
  parseElCfg : function(attrs){
    attrs.type = 'text';
    if(attrs.rotate){
      attrs.transform = Util.substitute('r{rotate} {x} {y}',attrs);
    }
    
    return attrs;
  }
});

Shape.Label = Label;

/**
 * @class Chart.Canvas.Shape.Marker
 * 用于标示节点的图形
 * @extends Chart.Canvas.Shape
 */
var Marker = function(cfg){
  Marker.superclass.constructor.call(this,cfg);
};

Marker.ATTRS = {
  /**
   * 类型 "circle", "square", "diamond", "triangle" and "triangle-down"；如果是 "url(xxx)"则是图片；custom则需要指定路径
   * @type {String}
   */
  symbol :{
    value : 'custom'
  },
  /**
   * 半径
   * @type {Number}
   */
  radius : {
    value : 5
  },
  /**
   * 如果类型为"custom"时指定路径
   * @type {Object}
   */
  path : {

  },
  /**
   * 起始x轴位置
   * @type {Number}
   */
  x : {

  },
  /**
   * 起始y轴位置
   * @type {Number}
   */
  y : {

  }
};

Marker.Symbols = {
  //圆
  circle : function(x,y,r){
    return [['M',x,y - r],['a',r,r,0,1,1,0,2*r],['a',r,r,0,1,1,0,-2*r],['z']];
  },
  //正方形
  square : function(x,y,r){
    return [['M',x-r,y-r],['L',x + r,y-r],['L',x + r,y + r],['L',x - r,y + r],['z']];
  },
  //菱形
  diamond : function(x,y,r){
    return [['M',x - r,y],['L',x,y - r],['L',x + r, y],['L',x,y + r],['z']];
  },
  //三角形
  triangle : function(x,y,r){
    var diffX = r / 0.866,
      diffY =  r;
    return [['M',x,y-r],['L',x + diffX,y + diffY],['L',x - diffX, y + diffY],['z']];
  },
  //倒三角形
  'triangle-down' : function(x,y,r){
    var diffX = r / 0.866,
      diffY =  r;
    return [['M',x,y + r],['L',x + diffX, y - diffY],['L',x - diffX,y - diffY],['z']];
  }
};



Util.extend(Marker,Shape);

Util.augment(Marker,{
  //设置半径
  __setRadius : function(v){
    var _self = this,
      attrs = _self.get('attrs');

    _self._setSize(attrs.x,attrs.y,v);

  },
  __getRadius : function(){
    return this.get('attrs').radius;
  },
  //设置x
  __setX : function(x){
    var _self = this,
      attrs = _self.get('attrs');

    _self._setSize(x,attrs.y,attrs.radius);

  },
  __getX : function(){
    return this.get('attrs').x;
  },
  //设置y
  __setY : function(y){
    var _self = this,
      attrs = _self.get('attrs');

    _self._setSize(attrs.x,y,attrs.radius);

  },
  __getY : function(){
    return this.get('attrs').y;
  },
  __getSymbol : function(){
    return this.get('attrs').symbol;
  },
  //设置大小，位置
  _setSize : function(x,y,radius){
    var _self = this,
      attrs = _self.get('attrs'),
      el = _self.get('el');
    if(el.type !== 'image'){
      var cfg = {
        x : x,
        y : y,
        radius : radius
      };
      Util.mix(attrs,cfg);
      var path = _self._getPath(attrs);
      el.attr('path',path);
    }else{
      Util.mix(attrs,{
        width : radius * 2,
        height : radius * 2,
        x : x - (radius - attrs.radius),
        y : y - (radius - attrs.radius),
        radius : radius
      });
      el.attr(attrs);
    }
  },
  animate : function(params,ms,easing,callback){
    var _self = this,
      attrs = _self.get('attrs'),
      path;
        
    if(_self.get('el').type == 'image'){
      var radius = params.radius || _self.attr('radius');
      params.x = params.x - radius;
      params.y = params.y - radius;
      Util.mix(attrs,{
        x : params.x,
        y : params.y
      });
      _self.get('el').animate(params,ms,easing,callback);
    }else{
      Util.mix(attrs,{
        x : params.x,
        y : params.y
      });
      path = _self._getPath(attrs);
      _self.get('el').animate({path : path},ms,easing,callback);
    }
  },

  /**
   * @protected
   * 格式化初始化配置项
   */
  parseElCfg : function(attrs){
    var _self = this,
      symbol = attrs.symbol,
      radius = attrs.radius || 5;
    if(symbol && !Util.isFunction(symbol) && symbol.indexOf('url') != -1){ //图片
      attrs.type = 'image';
      attrs.src = symbol.replace(/url\((.*)\)/,'$1');
      attrs.width = attrs.radius * 2;
      attrs.height = attrs.radius * 2;
      if (Util.vml) {
        attrs.x -= radius-1,
        attrs.y -= radius-1;
      } else {
        attrs.x -= radius,
        attrs.y -= radius;
      }
    }else{
      attrs.type = 'path';
      attrs.path = _self._getPath(attrs);
    }
    return attrs;
  },
  //获取path
  _getPath : function(attrs){
    if(!attrs.symbol && attrs.path){
      return  Util.substitute(attrs.path,attrs);
    }
    var method;

    if(Util.isFunction(attrs.symbol)){
      method = attrs.symbol;
    }else{
      method = Marker.Symbols[attrs.symbol];
    }
    
    if(method){
      return method(attrs.x,attrs.y,attrs.radius)
    }else{
      throw 'not support this type ' + attrs.symbol;
    }
  }

});

Shape.Marker = Marker;



/**
 * @class Chart.Canvas.Shape.Image
 * 图片
 * @extends Chart.Canvas.Shape
 */
var Image = function(cfg){
  Image.superclass.constructor.call(this,cfg);
};

Image.ATTRS = {
  /**
   * 路径
   * @type {String}
   */
  src : {}, 
  /**
   * x轴位置
   * @type {Number}
   */
  x : {}, 
  /**
   * y轴位置
   * @type {Number}
   */
  y : {}, 
  /**
   * 宽度
   * @type {Number}
   */
  width : {}, 
  /**
   * 高度
   * @type {Number}
   */
  height : {}
}

Util.extend(Image,Shape);

Shape.Image = Image;

module.exports = Shape;
