var 
  Shape = require('./shape'),
  Base = require('./base'),
  Util = require('./util');

function toZIndex(arr,item){
  var index,
    zIndex = item.get('zIndex'),
    maxIndex = null;
  Util.each(arr,function(obj,i){
    if(item == obj){
      index = i;
    }else if(obj.get('zIndex') > zIndex){
      if(maxIndex == null){
        maxIndex = i;
      }
    }
  });
  if(maxIndex != null){
    arr.splice(index,1);
    arr.splice(maxIndex,0,item);
  }else if(index!=null){
    arr.splice(index,1);
    arr.push(item);
  }
  return maxIndex;
}

/**
 * @class Chart.Canvas.Container
 * 图形容器
 * @extends Chart.Canvas.Base
 * @abstract
 */
var Container = function(cfg){

  Container.superclass.constructor.call(this,cfg);
};

Util.extend(Container,Base);

Container.ATTRS = {
  /**
   * 子节点
   * @type {Array}
   */
  children : []
}

Util.augment(Container,{

  isContainer : true,
  beforeRenderUI : function(){
    this.set('children',[]);
  },
  /**
   * @protected
   * @ignore
   */
  getGroupClass : function(){

  },
  /**
   * @protected
   * @ignore
   */
  getShapeClass : function(type){
    var cName = Util.ucfirst(type);
    if(Shape[cName]){
      return Shape[cName];
    }
    return Shape;
  },
  /**
   * 添加图形
   * @param {String | Object} type 类型或者配置项
   * @param {String} attrs 属性
   * @return {Chart.Canvas.Shape} 图形
   */
  addShape : function(type,attrs){
    var _self = this,
      C,
      cfg,
      shape;
    if(Util.isObject(type)){
      cfg = type;
      type = cfg.type;
    }else{
      cfg = {
        type : type,
        attrs : attrs,
        canvas : _self.get('canvas')
      };
    }
    cfg.parent = _self;
    C = _self.getShapeClass(type);
    shape = new C(cfg);
    shape.set('canvas',_self.get('canvas'));
    _self.addChild(shape);
    return shape;
  },
  /**
   * 添加分组
   * @param {Function} C 构造函数,可以为空，默认为Chart.Canvas.Group
   * @return {Chart.Canvas.Group} 分组
   */
  addGroup : function(C,cfg){
    if(Util.isObject(C)){
      cfg = C;
      C = null;
    }
    var _self = this,
      cfg = Util.mix({
        parent : _self,
        canvas : _self.get('canvas')
      },cfg),
      group;

    C = C || _self.getGroupClass();
    group = new C(cfg);
    _self.addChild(group);
    return group;
  },
  /**
   * 移除子图形
   * @protected
   * @param  {*} item 子图形或者分组
   * @param  {Boolean} [destroy=true] 是否同时从控件移除
   */
  removeChild : function(item,destroy){
    if(destroy == undefined){
      destroy = true;
    }
    var _self = this,
      node = _self.get('node'),
      children = _self.get('children');
    Util.remove(children,item);
    
    node.removeChild(item.get('node'));
    if(destroy){
      item.destroy();
    }
    return item;
  },
  /**
   * @protected
   * 添加图形或者分组
   * @param {Chart.Canvas.Base} item 图形或者分组
   */
  addChild : function(item){
    var _self = this,
      children = _self.get('children');
    children.push(item);
    item.parent = item;
    _self.resetPosition(item);
  },
  resetPosition : function(item,index){
    var _self = this,
      children = _self.get('children'),
      node = _self.get('node'),
      index = index == null ? toZIndex(children,item) : index;
    if(item){
      var itemNode = item.get('node');
      if(index == null || index >= children.length - 1){
        node.appendChild(itemNode);
      }else{
        var preNode = node.childNodes[index];
        if(preNode != itemNode){
          node.insertBefore(itemNode,preNode);
        }
      }
      Util.attr(itemNode,'zIndex',item.get('zIndex'));
    }
  },
  /**
   * 获取子控件根据索引
   * @param  {Number} index 索引值
   * @return {Chart.Canvas.Base} 图形或者分组
   */
  getChildAt : function(index){
    return this.get('children')[index];
  },
  /**
   * 获取子控件数目
   * @return {Number} 数目
   */
  getCount : function(){
    return this.get('children').length;
  },
  /**
   * 获取最后一个控件
   * @return {Chart.Canvas.Base} 图形或者分组
   */
  getLast : function(){
    return this.getChildAt(this.getCount() - 1);
  },
  /**
   * 获取第一个控件
   * @return {Chart.Canvas.Base} 图形或者分组
   */
  getFirst : function(){
    return this.getChildAt(0);
  },
  /**
   * 根据id查找分组或者图形
   * @param  {String} id id
   * @return {Chart.Canvas.Base} 分组或者图形
   */
  find : function(id){
    var _self = this;
    return _self.findBy(function(item){
      return item.get('id') == id;
    });
  },
  /**
   * 排序，将子元素按照zIndex进行排序
   */
  sort : function(){
    var _self = this,
      node = _self.get('node'),
      children = Util.toArray(node.childNodes);
    
    children.sort(function(obj1,obj2){
      var zIndex1 = obj1.getAttribute('zIndex') || 0,
        zIndex2 = obj2.getAttribute('zIndex') || 0;
      return (+zIndex1) - (+zIndex2);
    });

    Util.each(children,function(item){
      node.appendChild(item);
    });
    
  },
  /**
   * 根据查找函数查找分组或者图形
   * @param  {Function} fn 匹配函数
   * @return {Chart.Canvas.Base} 分组或者图形
   */
  findBy : function(fn){
    var _self = this,
      children = _self.get('children'),
      rst = null;
    Util.each(children,function(item){
      if(fn(item)){
        rst = item;
        
      }else if(item.findBy){
        rst = item.findBy(fn);
      }
      if(rst){
        return false;
      }
    });
    return rst;
  },
  /**
   * 根据dom查找
   * @param  {HTMLElement} node 节点
   * @return {Chart.Canvas.Base} 返回分组或者图形
   */
  findByNode : function(node){
    return this.findBy(function(item){
      return item.get('node') == node;
    });
  },
  /**
   * 清除容器内的图形或者分组
   */
  clear : function(){
    var _self = this,
      children = _self.get('children');
    Util.each(children,function(item){
      item.destroy();
    });
    children && Util.empty(children);
  },
  /**
   * 析构函数
   */
  destroy : function(){
    var _self = this;
    if(_self.destroyed){
      return;
    }
    _self.clear();

    Container.superclass.destroy.call(this);

  }

});

module.exports = Container;
