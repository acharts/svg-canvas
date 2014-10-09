
var 
  Util = require('./util'),
  Group = require('./group'),
  Container = require('./container');

/**
 * @class Chart.Canvas
 * 图形的画板，支持SVG和VML
 * @extends Chart.Canvas.Container
 */
var Canvas = function(cfg){
  Canvas.superclass.constructor.call(this,cfg);
};

Canvas.ATTRS = {
  /**
   * 宽度
   * @cfg {Number} width
   */
  width : {},
  /**
   * 高度
   * @cfg {Number} height
   */
  height : {},
  /**
   * 渲染到的节点
   * @cfg {String} id
   */
  id : {} ,
  /**
   * @private
   * @type {Object}
   */
  viewbox : {

  }
};

Util.extend(Canvas,Container);

Util.augment(Canvas,{
  /**
   * @protected
   * @ignore
   */
  getGroupClass : function(){
    return Group;
  },
  renderUI : function(){
    var _self = this,
      id = _self.get('id'),
      width = _self.get('width'),
      height = _self.get('height'),
      node,
      container = Util.find(id);

    if(!container){
      throw 'no id for canvas!';
    }

    node = Util.svg({width: width,height : height});
    container.appendChild(node);
    _self.set('canvas',_self);
    _self.set('node',node);
    _self.set('container',container);
  },
  /**
   * 设置宽高
   * @param {Number} width 宽
   * @param {Number} height 高
   */
  setSize : function(width,height){
    var _self = this,
      node = _self.get('node');
    this.set('width',width);
    this.set('height',height);
    Util.attr(node,{
      width : width,
      height : height
    });
  },
  /**
   * 设置viewbox,用于放大，缩小视图
   * @param {Number} x x轴起点
   * @param {Number} y y轴起点
   * @param {Number} width 宽
   * @param {Number} height 高
   */
  setViewBox : function(x, y, w, h){
    this.set('viewbox',{
      x : x,
      y : y,
      width : w,
      height : h
    });
  },
  /**
   * 获取画布的内部宽度，不是DOM的宽度，而是viewbox的宽度
   * @return {Number} 宽度
   */
  getViewWidth : function(){
    var _self = this,
      viewbox = _self.get('viewbox');

    return viewbox ? viewbox.width : _self.get('width');
  },
  /**
   * 获取画布的内部高度，不是DOM的宽度，而是viewbox的高度
   * @return {Number} 高度
   */
  getViewHeight : function(){
     var _self = this,
      viewbox = _self.get('viewbox');

    return viewbox ? viewbox.height : _self.get('height');
  },
  _onRenderViewbox : function(viewbox){
    var _self = this,
      node = _self.get('node'),
      str = Util.substitute('{x} {y} {width} {height}',viewbox);
    Util.attr(node,'viewbox',str);
  },
  /**
   * 将页面上的坐标转换成画布上的坐标
   * @param  {Number} clientX 窗口的x坐标
   * @param  {Number} clientY 窗口上的y坐标
   * @return {Object} 坐标对象包含x,y
   */
  getPoint : function(clientX,clientY){
    var _self = this,
      node = _self.get('node'),
      viewbox = _self.get('viewbox'),
      offset = node.getBoundingClientRect(),
      point = {};

    if(!viewbox){ //如果不存在viewbox
      point.x = clientX - offset.left;
      point.y = clientY - offset.top;
    }else{
      var xfactor = viewbox.width / _self.get('width'), //计算 宽度比例
        yfactor = viewbox.height / _self.get('height'); //高度比例
      point.x = (clientX - offset.left)  * xfactor + viewbox.x;
      point.y = (clientY - offset.top) * yfactor + viewbox.y;
    }

    return point;
  },
  /**
   * 将相对地址转换成为画布上的坐标
   * @param  {Number} dx 相对于起始点的x偏移
   * @param  {Number} dy 相对于起始点的y偏移
   * @return {Object} 坐标对象
   */
  getRelativePoint : function(dx,dy){
    var _self = this,
      viewbox = _self.get('viewbox'),
      point = {};
    if(!viewbox){
      point.x = dx;
      point.y = dy;
    }else{
      var xfactor = viewbox.width / _self.get('width'), //计算 宽度比例
        yfactor = viewbox.height / _self.get('height'); //高度比例
      point.x = dx * xfactor + viewbox.x;
      point.y = dy * xfactor + viewbox.y;
    }

    return point;
  }

});


module.exports = Canvas;
