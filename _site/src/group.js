
var Container = require('./container'),
  Item = require('./item'),
  Util = require('./util'),
  Shape = require('./shape');

/**
 * @class Chart.Canvas.Group
 * 图形分组
 */
var Group = function(cfg){
  Group.superclass.constructor.call(this,cfg);
};

Group.ATTRS = {
  /**
   * 沿x轴的偏移量
   * @type {Number}
   */
  x : null,
  /**
   * 沿y轴的偏移量
   * @type {Number}
   */
  y : null
};

Util.extend(Group,Container);

//获取画布内元素的一些共性方法
Util.mixin(Group,[Item]);

Util.augment(Group,{
  /**
   * 是否Group
   * @type {Boolean}
   */
  isGroup : true,
  //创建DOM 
  createDom : function(){
    var _self = this,
      node = _self.get('node'),
      attrs = _self.get('attrs'),
      node;
    if(!node){
      node = _self.createElement();
      //attrs && el.attr(attrs);
      _self.set('node',node);
    }
    node.group = _self;
  },
  //渲染
  renderUI : function(){
    this._initTranslate();
  },
  //初始化平移
  _initTranslate: function(){
    var _self = this,
      x = _self.get('x'),
      y = _self.get('y');
    if(x || y){
      _self.translate((x || 0),(y || 0));
    }else{
      _self.set('x',x || 0);
      _self.set('y',y || 0);
    }
  },
  getBBox : function(){
    var _self = this,
      children = _self.get('children'),
      w = 0,
      h = 0,
      rst = {};

    Util.each(children,function(item){
      var bbox = item.getBBox(),
        w1 = bbox.width + bbox.x,
        h1 = bbox.height + bbox.y;
      if(w < w1){
        w = w1;
      }
      if(h < h1){
        h = h1;
      }
    });

    rst.x = _self.get('x');
    rst.y = _self.get('y');
    rst.width = w;
    rst.height = h;

    return rst;

  },
  /**
   * 是否包含指定的DOM
   * @param  {HTMLElement} element dom元素
   * @return {Boolean}   是否包含
   */
  containsElement : function(element){
    var _self = this,
      node = _self.get('node');
    return node == element || Util.contains(node,element);
  },
  
  /**
   * 移动的到位置
   * @param  {Number} x 移动到x
   * @param  {Number} y 移动到y
   */
  move : function(x,y){
    var _self = this,
      cx = _self.get('x') || 0, //当前的x
      cy = _self.get('y') || 0; //当前的y
   
    
    _self.set('x',x);
    _self.set('y',y);
  },
  /**
   * @private
   * @ignore
   */
  createElement : function(){
    return Util.svgNode('g');
  },
  /**
   * @protected
   * @ignore
   */
  getGroupClass : function(){
    return Group;
  }
  

});

module.exports = Group;
