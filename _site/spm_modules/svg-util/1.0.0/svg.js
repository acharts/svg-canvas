var Util = require('graphic-util'),
  xmlns="http://www.w3.org/2000/svg",
  version="1.1",
  doc = document;

Util.mix(Util,{
  find : function(id,el){
    el = el || doc;
    return el.getElementById(id);
  },
  svg : function(attrs){
    var svgNode = Util.svgNode('svg',attrs);

    Util.attr(svgNode,'version',version);
    Util.attr(svgNode,'xmlns',xmlns);
    return svgNode;
  },
  svgNode : function(tagName,attrs){
   var node = doc.createElementNS(xmlns, tagName);
   Util.attr(node,attrs);
   return node;
  },
  attr : function(el,name,value){
    if(Util.isObject(name)){
      Util.each(name,function(v,k){
        Util.attr(el,k,v);
      });
      return;
    }
    if(Util.isString(name)){
      var attrObj = el[name];
      if(value == null){
        if(attrObj && attrObj.baseVal){
          return attrObj.baseVal.value;
        }
        return el.getAttribute(name);
      }else{
        el.setAttribute(name,value);
      }
    }
    return;
  },
  /**
   * 获取偏移量
   * @param  {HTMLElement} o Dom节点
   * @return {Object} 偏移位置，left,top,width,height
   */
  getOffset : function(o){
    var obj = o.getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    return rst;
  },
  /**
   * 是否包含指定节点
   * @param  {HTMLElement} node    节点
   * @param  {HTMLElement} subNode 子节点
   * @return {HTMLElement} 是否包含在节点中
   */
  contains : function(node,subNode){
      if(!node || !subNode){
        return false;
      }
      var rst = false,
        parent = subNode.parentNode;
      while(parent!=null && parent!=document.body){
        if(parent == node){
          rst = true;
          break;
        }
        parent = parent.parentNode;
      }

      return rst;
  },
  /**
   * 添加事件
   * @param {HTMLElement}   node  节点
   * @param {String}   type 事件名称
   * @param {Function} fn   回调函数
   */
  addEvent : function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  },
  /**
   * 移除事件
   * @param {HTMLElement}   node  节点
   * @param {String}   type 事件名称
   * @param {Function} fn   回调函数
   */
  removeEvent : function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  }
});

window.SvgUtil = Util;

module.exports = Util;

