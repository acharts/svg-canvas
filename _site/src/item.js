/**
 * @fileOverview 画布内部的元素扩展
 * @ignore
 */
  
var Util = require('./util');


function toFront(arr,item){
  var index,
    max = 0;
  Util.each(arr,function(obj,i){
    if(item == obj){
      index = i;
    }else if(obj.get('zIndex') > max){
      max = obj.get('zIndex');
    }
  });
  max = max + 1;
  item._attrs.zIndex = max;
  arr.splice(index,1);
  arr.push(item);
}

function toBack(arr,item){
  var index,
    min = 0;
  Util.each(arr,function(obj,i){
    if(item == obj){
      index = i;
    }else if(obj.get('zIndex') < min){
      min = obj.get('zIndex');
    }
  });
  if(min){
    min = min - 1;
  }
  item._attrs.zIndex = min;
  arr.splice(index,1);
  arr.unshift(item);
}

/**
 * @class Chart.Canvas.Item
 * 画布内部元素的一些公用方法的扩展，仅作为接口使用
 */
var Item = function(){

};

Util.augment(Item,{
  /**
   * 到达最高层次 z-index
   */
  toFront : function(){
    var parent = this.get('parent'),
      children = parent.get('children');
    toFront(children,this);
    parent.resetPosition(this,children.length - 1);
    return this;
  },
  /**
   * 最底层
   */
  toBack : function(){
    var parent = this.get('parent'),
      children = parent.get('children');
    toBack(children,this);
    parent.resetPosition(this,0);
    return this;
  },
  _onRenderZIndex : function(value){
    var _self = this,
      parent = _self.get('parent');
    if(parent && _self.get('node').parentNode){
      parent.resetPosition(_self);
    }
  },
  /**
   * 移动
   * @param  {Number} dx 沿x轴平移的距离
   * @param  {Number} dy 沿y轴平移的距离
   */
  translate : function(dx,dy){
    var node = this.get('node');
    Util.translate(node,dx,dy);
    return this;
  },
  /**
   * 放大
   * @param  {Number} sx x轴方向的倍数 
   * @param  {Number} sy y轴方向的倍数
   * @param  {Number} cx x轴方向扩展的中心
   * @param  {Number} cy y轴方向扩展的中心
   */
  scale : function(sx,sy,cx,cy){

    var node = this.get('node');
    Util.scale(node,sx,sy,cx,cy);
    return this;
  },
  /**
   * 旋转
   * @param  {Number} angle 旋转的角度
   * @param  {Number} cx 旋转的中心点 x
   * @param  {Number} cy 旋转的中心点 y
   */
  rotate : function(angle,cx,cy){
    var node = this.get('node');
    Util.rotate(node,angle,cx,cy);
    return this;
  },
  /**
   * 设置transform
   * @param  {Array} ts transform的数组
   */
  transform : function(ts){
    var node = this.get('node');
    Util.transform(node,ts);
    return this;
  },
  index : function(){
    var _self = this,
      parent = _self.get('parent');
    return Util.indexOf(parent.get('children'),_self);
  }
});

module.exports = Item;
