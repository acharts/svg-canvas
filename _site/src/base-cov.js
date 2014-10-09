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
_$jscoverage_init(_$jscoverage, "/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js",[2,10,11,12,16,17,18,19,20,25,64,71,78,79,80,82,89,97,104,105,106,113,114,115,125,130,131,132,134,135,143,147,148,149,150,153,154,156,158,159,161,168,171,172,173,180,185,186,188,189,191,195,197,198,199,200,206,208,209,211,225,231,233,234,235,236,237,238,239,242,243,244,245,249,280,281,283,284,285,286,288,289,296,300,301,303,304,305,306,311]);
_$jscoverage_init(_$jscoverage_cond, "/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js",[19,79,105,114,131,147,158,171,185,188,197,199,208,231,238,244,280,284,288,300]);
_$jscoverage["/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js"].source = ["  ","var "," ","  Util = require('./util');","","/**"," * @class Chart.Canvas.Base"," * 图形控件或者分组的基类"," */","var Base = function(cfg){","  this.cfg = cfg;","  this._attrs = {","    autoRender : true,","    visible : true","  };","  this.events = {};","  var defaultCfg = this.getDefaultCfg();","  Util.mix(this._attrs,defaultCfg,cfg);","  if(this.get('autoRender')){","    this.render();","  }","      ","};","","Base.ATTRS = {","  /**","   * 所在父元素中的优先级，仅在父元素排序时有效","   * @type {Number}","   */","  zIndex : null,","  /**","   * @protected","   * 底层使用了raphael 所以此属性对应raphael的对对象","   */","  el : null,","  /**","   * svg或者vml对象","   * @type {HTMLElement}","   */","  node : null,","  /**","   * 画布","   * @type {Chart.Canvas}","   */","  canvas : null,","  /**","   * 是否显示","   * @type {Boolean}","   */","  visible : true  ","","  /**","   * @event hide","   * 隐藏","   */","  ","  /**","   * @event 显示","   * 显示","   */","  ","};","","Util.augment(Base,{","","  /**","   * 获取默认的配置信息","   * @return {Object} 默认的属性","   */","  getDefaultCfg : function(){","    return {};","  },","  /**","   * 设置属性信息","   * @protected","   */","  set : function(name,value){","    var m = '_onRender' + Util.ucfirst(name);","    if(this[m]){","      this[m](value,this._attrs[name]);","    }","    this._attrs[name] = value;","  },","  /**","   * 获取属性信息","   * @protected","   */","  get : function(name){","    return this._attrs[name];","  },","  /**","   * 获取初始配置的信息","   * @param  {String} name 配置项名称","   * @return {*}  初始值","   */","  getCfgAttr : function(name){","      return this.cfg[name];","","  },","  /**","   * 显示","   */","  show : function(){","    this.set('visible',true);","    if(!this.get('visible')){","      this.fire('show');","    }","  },","  /**","   * 隐藏","   */","  hide : function(){","    this.set('visible',false);","    if(this.get('visible')){","      this.fire('hide');","    }","  },  ","  ","  /**","   * 附加事件","   * @param  {String}   eventType 事件类型","   * @param  {Function} fn  事件处理函数","   */","  on : function(eventType,fn){","    var _self = this,","      node = _self.get('node'),","      events = this.events,","      callbacks = events[eventType];","","    Util.addEvent(node,eventType,fn);","    if(!callbacks){","      callbacks = events[eventType] = [];","    }","    callbacks.push(fn);","    return this;","  },","  /**","   * 移除事件","   * @param  {String}   eventType 事件类型","   * @param  {Function} fn  事件处理函数","   */","  off : function(eventType,fn){","    var _self = this,","      node = _self.get('node'),","      events = this.events,","      callbacks = events[eventType];","    if(!eventType){","      Util.each(events,function(callbacks,type){","          Util.each(callbacks,function(m){","            Util.removeEvent(node,type,m);","          });","      });","      this.events = {};","      return this;","    }","    Util.removeEvent(node,eventType,fn);","    ","    if(callbacks){","      Util.remove(callbacks,fn);","    }","    return this;","  },","  /**","   * 触发事件","   * @param  {String} eventType 事件类型","   */","  fire : function(eventType,eventObj){","    var _self = this,","      events = _self.events,","      callbacks = events[eventType];","    if(callbacks){","      Util.each(callbacks,function(m){","        m(eventObj);","      });","    }","  },","  ","  //渲染应用的 class","  _onRenderElCls : function(cls,pre){","    var _self = this,","      node = _self.get('node'),","      oldCls = node.getAttribute('class'),","      arr = oldCls ? oldCls.split(' ') : [];","","    if(pre){","      Util.remove(arr,pre);","    }","    if(cls){","      arr.push(cls);              ","    }","    node.setAttribute('class',arr.join(' ')); ","  },","  //设置zIndex","  _onRenderZIndex : function(zIndex){","    var _self = this,","      node = _self.get('node');","    if(zIndex != null){","        node.setAttribute('zIndex',zIndex);","        if(Util.vml){","            node.style.zIndex = zIndex;","        }","    }","  },","  //设置显示隐藏","  _onRenderVisible : function(visible){","    var _self = this,","      node = _self.get('node');","    if(visible){","      node.style.display = '';","    }else{","      node.style.display = 'none';","    }","  },","  /**","   * @protected","   * 渲染控件","   */","  beforeRenderUI : function(){","","  },","  /**","   * 渲染控件/图形","   */","  render : function(){","    var _self = this,","      //cls = _self.get('elCls'),","      zIndex = _self.get('zIndex'),","      attrs = _self._attrs,","      node;","","    if(!_self.get('rendered')){","      ","      _self.createDom();","      _self.beforeRenderUI();","      _self.renderUI();","      _self.set('rendered',true);","      node = _self.get('node');","      if(this.get('visible') == false){","          this.hide();","      }","","      Util.each(attrs,function(v,k){","        var m = _self['_onRender' + Util.ucfirst(k)];","        if(m){","          m.call(_self,v);","        }","      });","     ","      _self.bindUI();","    }","  },","","  /**","   * @protected","   * 创建dom","   */","  createDom : function(){","","  },","","  /**","   * @protected","   * 渲染控件","   */","  renderUI : function(){","","  },","  /**","   * @protected","   * 绑定事件","   */","  bindUI : function(){","","  },","  /**","   * 移除，从父元素中移除","   * @param  {Boolean} [destroy=true] ","   */","  remove : function(destroy){","    if(destroy == undefined){","      destroy = true;","    }","    var _self = this;","    if(_self.get('parent')){","      _self.get('parent').removeChild(_self,destroy);","          _self.set('parent',null);","    }","    if(destroy){","      _self.destroy();","    }","  },","  /**","   * 析构函数","   */","  destroy : function(){","    var _self = this,","      destroyed = _self.destroyed,","      node = _self.get('node');","","    if(destroyed){","        return;","    }","    node.parentNode && node.parentNode.removeChild(node);","    _self._attrs = {};","    _self.events = {};","    _self.destroyed = true;","  }","","});","  ","module.exports = Base;",""];
_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 2);
var Util = require("./util");

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 10);
var Base = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 11);
    this.cfg = cfg;
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 12);
    this._attrs = {
        autoRender: true,
        visible: true
    };
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 16);
    this.events = {};
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 17);
    var defaultCfg = this.getDefaultCfg();
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 18);
    Util.mix(this._attrs, defaultCfg, cfg);
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 19);
    if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 19, this.get("autoRender"))) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 20);
        this.render();
    }
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 25);
Base.ATTRS = {
    zIndex: null,
    el: null,
    node: null,
    canvas: null,
    visible: true
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 64);
Util.augment(Base, {
    getDefaultCfg: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 71);
        return {};
    },
    set: function(name, value) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 78);
        var m = "_onRender" + Util.ucfirst(name);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 79);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 79, this[m])) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 80);
            this[m](value, this._attrs[name]);
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 82);
        this._attrs[name] = value;
    },
    get: function(name) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 89);
        return this._attrs[name];
    },
    getCfgAttr: function(name) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 97);
        return this.cfg[name];
    },
    show: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 104);
        this.set("visible", true);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 105);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 105, !this.get("visible"))) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 106);
            this.fire("show");
        }
    },
    hide: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 113);
        this.set("visible", false);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 114);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 114, this.get("visible"))) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 115);
            this.fire("hide");
        }
    },
    on: function(eventType, fn) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 125);
        var _self = this, node = _self.get("node"), events = this.events, callbacks = events[eventType];
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 130);
        Util.addEvent(node, eventType, fn);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 131);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 131, !callbacks)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 132);
            callbacks = events[eventType] = [];
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 134);
        callbacks.push(fn);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 135);
        return this;
    },
    off: function(eventType, fn) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 143);
        var _self = this, node = _self.get("node"), events = this.events, callbacks = events[eventType];
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 147);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 147, !eventType)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 148);
            Util.each(events, function(callbacks, type) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 149);
                Util.each(callbacks, function(m) {
                    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 150);
                    Util.removeEvent(node, type, m);
                });
            });
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 153);
            this.events = {};
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 154);
            return this;
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 156);
        Util.removeEvent(node, eventType, fn);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 158);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 158, callbacks)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 159);
            Util.remove(callbacks, fn);
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 161);
        return this;
    },
    fire: function(eventType, eventObj) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 168);
        var _self = this, events = _self.events, callbacks = events[eventType];
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 171);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 171, callbacks)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 172);
            Util.each(callbacks, function(m) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 173);
                m(eventObj);
            });
        }
    },
    _onRenderElCls: function(cls, pre) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 180);
        var _self = this, node = _self.get("node"), oldCls = node.getAttribute("class"), arr = oldCls ? oldCls.split(" ") : [];
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 185);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 185, pre)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 186);
            Util.remove(arr, pre);
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 188);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 188, cls)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 189);
            arr.push(cls);
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 191);
        node.setAttribute("class", arr.join(" "));
    },
    _onRenderZIndex: function(zIndex) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 195);
        var _self = this, node = _self.get("node");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 197);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 197, zIndex != null)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 198);
            node.setAttribute("zIndex", zIndex);
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 199);
            if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 199, Util.vml)) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 200);
                node.style.zIndex = zIndex;
            }
        }
    },
    _onRenderVisible: function(visible) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 206);
        var _self = this, node = _self.get("node");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 208);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 208, visible)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 209);
            node.style.display = "";
        } else {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 211);
            node.style.display = "none";
        }
    },
    beforeRenderUI: function() {},
    render: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 225);
        var _self = this, zIndex = _self.get("zIndex"), attrs = _self._attrs, node;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 231);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 231, !_self.get("rendered"))) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 233);
            _self.createDom();
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 234);
            _self.beforeRenderUI();
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 235);
            _self.renderUI();
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 236);
            _self.set("rendered", true);
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 237);
            node = _self.get("node");
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 238);
            if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 238, this.get("visible") == false)) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 239);
                this.hide();
            }
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 242);
            Util.each(attrs, function(v, k) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 243);
                var m = _self["_onRender" + Util.ucfirst(k)];
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 244);
                if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 244, m)) {
                    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 245);
                    m.call(_self, v);
                }
            });
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 249);
            _self.bindUI();
        }
    },
    createDom: function() {},
    renderUI: function() {},
    bindUI: function() {},
    remove: function(destroy) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 280);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 280, destroy == undefined)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 281);
            destroy = true;
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 283);
        var _self = this;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 284);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 284, _self.get("parent"))) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 285);
            _self.get("parent").removeChild(_self, destroy);
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 286);
            _self.set("parent", null);
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 288);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 288, destroy)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 289);
            _self.destroy();
        }
    },
    destroy: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 296);
        var _self = this, destroyed = _self.destroyed, node = _self.get("node");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 300);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 300, destroyed)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 301);
            return;
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 303);
        node.parentNode && node.parentNode.removeChild(node);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 304);
        _self._attrs = {};
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 305);
        _self.events = {};
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 306);
        _self.destroyed = true;
    }
});

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/base.js", 311);
module.exports = Base;