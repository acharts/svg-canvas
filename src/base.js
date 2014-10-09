  
var 
 
  Util = require('./util');

/**
 * @class Chart.Canvas.Base
 * 图形控件或者分组的基类
 */
var Base = function(cfg){
  this.cfg = cfg;
  this._attrs = {
    autoRender : true,
    visible : true,
    zIndex : 0
  };
  this.events = {};
  var defaultCfg = this.getDefaultCfg();
  Util.mix(this._attrs,defaultCfg,cfg);
  if(this.get('autoRender')){
    this.render();
  }
};

Base.ATTRS = {
  /**
   * 所在父元素中的优先级，仅在父元素排序时有效
   * @type {Number}
   */
  zIndex : null,
  /**
   * @protected
   * 底层使用了raphael 所以此属性对应raphael的对对象
   */
  el : null,
  /**
   * svg或者vml对象
   * @type {HTMLElement}
   */
  node : null,
  /**
   * 画布
   * @type {Chart.Canvas}
   */
  canvas : null,
  /**
   * 是否显示
   * @type {Boolean}
   */
  visible : true  

  /**
   * @event hide
   * 隐藏
   */
  
  /**
   * @event 显示
   * 显示
   */
  
};

Util.augment(Base,{

  /**
   * 获取默认的配置信息
   * @return {Object} 默认的属性
   */
  getDefaultCfg : function(){
    return {};
  },
  /**
   * 设置属性信息
   * @protected
   */
  set : function(name,value){
    var m = '_onRender' + Util.ucfirst(name);
    this._attrs[name] = value;
    if(this[m]){
      this[m](value,this._attrs[name]);
    }
  },
  /**
   * 获取属性信息
   * @protected
   */
  get : function(name){
    return this._attrs[name];
  },
  /**
   * 获取初始配置的信息
   * @param  {String} name 配置项名称
   * @return {*}  初始值
   */
  getCfgAttr : function(name){
      return this.cfg[name];

  },
  /**
   * 显示
   */
  show : function(){
    this.set('visible',true);
    if(!this.get('visible')){
      this.fire('show');
    }
  },
  /**
   * 隐藏
   */
  hide : function(){
    this.set('visible',false);
    if(this.get('visible')){
      this.fire('hide');
    }
  },  
  
  /**
   * 附加事件
   * @param  {String}   eventType 事件类型
   * @param  {Function} fn  事件处理函数
   */
  on : function(eventType,fn){
    var _self = this,
      node = _self.get('node'),
      events = this.events,
      callbacks = events[eventType];

    Util.addEvent(node,eventType,fn);
    if(!callbacks){
      callbacks = events[eventType] = [];
    }
    callbacks.push(fn);
    return this;
  },
  /**
   * 移除事件
   * @param  {String}   eventType 事件类型
   * @param  {Function} fn  事件处理函数
   */
  off : function(eventType,fn){
    var _self = this,
      node = _self.get('node'),
      events = this.events,
      callbacks = events[eventType];
    if(!eventType){
      Util.each(events,function(callbacks,type){
          Util.each(callbacks,function(m){
            Util.removeEvent(node,type,m);
          });
      });
      this.events = {};
      return this;
    }
    Util.removeEvent(node,eventType,fn);
    
    if(callbacks){
      Util.remove(callbacks,fn);
    }
    return this;
  },
  /**
   * 触发事件
   * @param  {String} eventType 事件类型
   */
  fire : function(eventType,eventObj){
    var _self = this,
      events = _self.events,
      callbacks = events[eventType];
    if(callbacks){
      Util.each(callbacks,function(m){
        m(eventObj);
      });
    }
  },
  
  //渲染应用的 class
  _onRenderElCls : function(cls,pre){
    var _self = this,
      node = _self.get('node'),
      oldCls = node.getAttribute('class'),
      arr = oldCls ? oldCls.split(' ') : [];

    if(pre){
      Util.remove(arr,pre);
    }
    if(cls){
      arr.push(cls);              
    }
    node.setAttribute('class',arr.join(' ')); 
  },
  //设置zIndex
  _onRenderZIndex : function(zIndex){
    var _self = this,
      node = _self.get('node');
    if(zIndex != null){
        node.setAttribute('zIndex',zIndex);
        if(Util.vml){
            node.style.zIndex = zIndex;
        }
    }
  },
  //设置显示隐藏
  _onRenderVisible : function(visible){
    var _self = this,
      node = _self.get('node');
    if(visible){
      node.style.display = '';
    }else{
      node.style.display = 'none';
    }
  },
  /**
   * @protected
   * 渲染控件
   */
  beforeRenderUI : function(){

  },
  /**
   * 渲染控件/图形
   */
  render : function(){
    var _self = this,
      //cls = _self.get('elCls'),
      zIndex = _self.get('zIndex'),
      attrs = _self._attrs,
      node;

    if(!_self.get('rendered')){
      
      _self.createDom();
      _self.beforeRenderUI();
      _self.renderUI();
      _self.set('rendered',true);
      node = _self.get('node');
      if(this.get('visible') == false){
          this.hide();
      }

      Util.each(attrs,function(v,k){
        var m = _self['_onRender' + Util.ucfirst(k)];
        if(m){
          m.call(_self,v);
        }
      });
     
      _self.bindUI();
    }
  },

  /**
   * @protected
   * 创建dom
   */
  createDom : function(){

  },

  /**
   * @protected
   * 渲染控件
   */
  renderUI : function(){

  },
  /**
   * @protected
   * 绑定事件
   */
  bindUI : function(){

  },
  /**
   * 移除，从父元素中移除
   * @param  {Boolean} [destroy=true] 
   */
  remove : function(destroy){
    if(destroy == undefined){
      destroy = true;
    }
    var _self = this;
    if(_self.get('parent')){
      _self.get('parent').removeChild(_self,destroy);
          _self.set('parent',null);
    }
    if(destroy){
      _self.destroy();
    }
  },
  /**
   * 析构函数
   */
  destroy : function(){
    var _self = this,
      destroyed = _self.destroyed,
      node = _self.get('node');

    if(destroyed){
        return;
    }
    node.parentNode && node.parentNode.removeChild(node);
    _self._attrs = {};
    _self.events = {};
    _self.destroyed = true;
  }

});
  
module.exports = Base;
