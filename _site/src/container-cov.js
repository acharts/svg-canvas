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
_$jscoverage_init(_$jscoverage, "/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js",[1,12,14,17,19,27,31,45,46,47,49,58,62,63,64,66,72,73,74,75,76,77,85,86,87,89,96,97,98,99,108,109,111,114,116,117,118,120,128,130,131,139,146,153,160,168,169,170,177,180,181,182,184,187,188,191,192,194,195,207,210,211,212,214,215,217,218,221,229,230,237,239,240,242,248,249,250,252,254,260]);
_$jscoverage_init(_$jscoverage_cond, "/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js",[46,62,85,108,117,180,194,211,214,217,249]);
_$jscoverage["/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js"].source = ["var ","  Shape = require('./shape'),","  Base = require('./base'),","  Util = require('./util');","","/**"," * @class Chart.Canvas.Container"," * 图形容器"," * @extends Chart.Canvas.Base"," * @abstract"," */","var Container = function(cfg){","","  Container.superclass.constructor.call(this,cfg);","};","","Util.extend(Container,Base);","","Container.ATTRS = {","  /**","   * 子节点","   * @type {Array}","   */","  children : []","}","","Util.augment(Container,{","","  isContainer : true,","  beforeRenderUI : function(){","    this.set('children',[]);","  },","  /**","   * @protected","   * @ignore","   */","  getGroupClass : function(){","","  },","  /**","   * @protected","   * @ignore","   */","  getShapeClass : function(type){","    var cName = Util.ucfirst(type);","    if(Shape[cName]){","      return Shape[cName];","    }","    return Shape;","  },","  /**","   * 添加图形","   * @param {String | Object} type 类型或者配置项","   * @param {String} attrs 属性","   * @return {Chart.Canvas.Shape} 图形","   */","  addShape : function(type,attrs){","    var _self = this,","      C,","      cfg,","      shape;","    if(Util.isObject(type)){","      cfg = type;","      type = cfg.type;","    }else{","      cfg = {","        type : type,","        attrs : attrs,","        canvas : _self.get('canvas')","      };","    }","    cfg.parent = _self;","    C = _self.getShapeClass(type);","    shape = new C(cfg);","    shape.set('canvas',_self.get('canvas'));","    _self.addChild(shape);","    return shape;","  },","  /**","   * 添加分组","   * @param {Function} C 构造函数,可以为空，默认为Chart.Canvas.Group","   * @return {Chart.Canvas.Group} 分组","   */","  addGroup : function(C,cfg){","    if(Util.isObject(C)){","      cfg = C;","      C = null;","    }","    var _self = this,","      cfg = Util.mix({","        parent : _self,","        canvas : _self.get('canvas')","      },cfg),","      group;","","    C = C || _self.getGroupClass();","    group = new C(cfg);","    _self.addChild(group);","    return group;","  },","  /**","   * 移除子图形","   * @protected","   * @param  {*} item 子图形或者分组","   * @param  {Boolean} [destroy=true] 是否同时从控件移除","   */","  removeChild : function(item,destroy){","    if(destroy == undefined){","      destroy = true;","    }","    var _self = this,","      node = _self.get('node'),","      children = _self.get('children');","    Util.remove(children,item);","    ","    node.removeChild(item.get('node'));","    if(destroy){","      item.destroy();","    }","    return item;","  },","  /**","   * @protected","   * 添加图形或者分组","   * @param {Chart.Canvas.Base} item 图形或者分组","   */","  addChild : function(item){","    var _self = this,","      children = _self.get('children');","    children.push(item);","    item.parent = item;","  },","  /**","   * 获取子控件根据索引","   * @param  {Number} index 索引值","   * @return {Chart.Canvas.Base} 图形或者分组","   */","  getChildAt : function(index){","    return this.get('children')[index];","  },","  /**","   * 获取子控件数目","   * @return {Number} 数目","   */","  getCount : function(){","    return this.get('children').length;","  },","  /**","   * 获取最后一个控件","   * @return {Chart.Canvas.Base} 图形或者分组","   */","  getLast : function(){","    return this.getChildAt(this.getCount() - 1);","  },","  /**","   * 获取第一个控件","   * @return {Chart.Canvas.Base} 图形或者分组","   */","  getFirst : function(){","    return this.getChildAt(0);","  },","  /**","   * 根据id查找分组或者图形","   * @param  {String} id id","   * @return {Chart.Canvas.Base} 分组或者图形","   */","  find : function(id){","    var _self = this;","    return _self.findBy(function(item){","      return item.get('id') == id;","    });","  },","  /**","   * 排序，将子元素按照zIndex进行排序","   */","  sort : function(){","    var _self = this,","      node = _self.get('node'),","      children = Util.toArray(node.childNodes);","    if(Util.svg){","      children.sort(function(obj1,obj2){","        var zIndex1 = obj1.getAttribute('zIndex') || 0,","          zIndex2 = obj2.getAttribute('zIndex') || 0;","        return (+zIndex1) - (+zIndex2);","      });","","      Util.each(children,function(item){","        node.appendChild(item);","      });","    }else{","      Util.each(children,function(item){","        var zIndex = item.getAttribute('zIndex');","","        if(zIndex){","          item.style.zIndex = zIndex;","        } ","      });","    }","    ","  },","  /**","   * 根据查找函数查找分组或者图形","   * @param  {Function} fn 匹配函数","   * @return {Chart.Canvas.Base} 分组或者图形","   */","  findBy : function(fn){","    var _self = this,","      children = _self.get('children'),","      rst = null;","    Util.each(children,function(item){","      if(fn(item)){","        rst = item;","        ","      }else if(item.findBy){","        rst = item.findBy(fn);","      }","      if(rst){","        return false;","      }","    });","    return rst;","  },","  /**","   * 根据dom查找","   * @param  {HTMLElement} node 节点","   * @return {Chart.Canvas.Base} 返回分组或者图形","   */","  findByNode : function(node){","    return this.findBy(function(item){","      return item.get('node') == node;","    });","  },","  /**","   * 清除容器内的图形或者分组","   */","  clear : function(){","    var _self = this,","      children = _self.get('children');","    Util.each(children,function(item){","      item.destroy();","    });","    children && Util.empty(children);","  },","  /**","   * 析构函数","   */","  destroy : function(){","    var _self = this;","    if(_self.destroyed){","      return;","    }","    _self.clear();","","    Container.superclass.destroy.call(this);","","  }","","});","","module.exports = Container;",""];
_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 1);
var Shape = require("./shape"), Base = require("./base"), Util = require("./util");

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 12);
var Container = function(cfg) {
    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 14);
    Container.superclass.constructor.call(this, cfg);
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 17);
Util.extend(Container, Base);

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 19);
Container.ATTRS = {
    children: []
};

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 27);
Util.augment(Container, {
    isContainer: true,
    beforeRenderUI: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 31);
        this.set("children", []);
    },
    getGroupClass: function() {},
    getShapeClass: function(type) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 45);
        var cName = Util.ucfirst(type);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 46);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 46, Shape[cName])) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 47);
            return Shape[cName];
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 49);
        return Shape;
    },
    addShape: function(type, attrs) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 58);
        var _self = this, C, cfg, shape;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 62);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 62, Util.isObject(type))) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 63);
            cfg = type;
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 64);
            type = cfg.type;
        } else {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 66);
            cfg = {
                type: type,
                attrs: attrs,
                canvas: _self.get("canvas")
            };
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 72);
        cfg.parent = _self;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 73);
        C = _self.getShapeClass(type);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 74);
        shape = new C(cfg);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 75);
        shape.set("canvas", _self.get("canvas"));
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 76);
        _self.addChild(shape);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 77);
        return shape;
    },
    addGroup: function(C, cfg) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 85);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 85, Util.isObject(C))) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 86);
            cfg = C;
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 87);
            C = null;
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 89);
        var _self = this, cfg = Util.mix({
            parent: _self,
            canvas: _self.get("canvas")
        }, cfg), group;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 96);
        C = C || _self.getGroupClass();
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 97);
        group = new C(cfg);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 98);
        _self.addChild(group);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 99);
        return group;
    },
    removeChild: function(item, destroy) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 108);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 108, destroy == undefined)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 109);
            destroy = true;
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 111);
        var _self = this, node = _self.get("node"), children = _self.get("children");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 114);
        Util.remove(children, item);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 116);
        node.removeChild(item.get("node"));
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 117);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 117, destroy)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 118);
            item.destroy();
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 120);
        return item;
    },
    addChild: function(item) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 128);
        var _self = this, children = _self.get("children");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 130);
        children.push(item);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 131);
        item.parent = item;
    },
    getChildAt: function(index) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 139);
        return this.get("children")[index];
    },
    getCount: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 146);
        return this.get("children").length;
    },
    getLast: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 153);
        return this.getChildAt(this.getCount() - 1);
    },
    getFirst: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 160);
        return this.getChildAt(0);
    },
    find: function(id) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 168);
        var _self = this;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 169);
        return _self.findBy(function(item) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 170);
            return item.get("id") == id;
        });
    },
    sort: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 177);
        var _self = this, node = _self.get("node"), children = Util.toArray(node.childNodes);
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 180);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 180, Util.svg)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 181);
            children.sort(function(obj1, obj2) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 182);
                var zIndex1 = obj1.getAttribute("zIndex") || 0, zIndex2 = obj2.getAttribute("zIndex") || 0;
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 184);
                return +zIndex1 - +zIndex2;
            });
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 187);
            Util.each(children, function(item) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 188);
                node.appendChild(item);
            });
        } else {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 191);
            Util.each(children, function(item) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 192);
                var zIndex = item.getAttribute("zIndex");
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 194);
                if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 194, zIndex)) {
                    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 195);
                    item.style.zIndex = zIndex;
                }
            });
        }
    },
    findBy: function(fn) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 207);
        var _self = this, children = _self.get("children"), rst = null;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 210);
        Util.each(children, function(item) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 211);
            if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 211, fn(item))) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 212);
                rst = item;
            } else {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 214);
                if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 214, item.findBy)) {
                    _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 215);
                    rst = item.findBy(fn);
                }
            }
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 217);
            if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 217, rst)) {
                _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 218);
                return false;
            }
        });
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 221);
        return rst;
    },
    findByNode: function(node) {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 229);
        return this.findBy(function(item) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 230);
            return item.get("node") == node;
        });
    },
    clear: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 237);
        var _self = this, children = _self.get("children");
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 239);
        Util.each(children, function(item) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 240);
            item.destroy();
        });
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 242);
        children && Util.empty(children);
    },
    destroy: function() {
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 248);
        var _self = this;
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 249);
        if (_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 249, _self.destroyed)) {
            _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 250);
            return;
        }
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 252);
        _self.clear();
        _$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 254);
        Container.superclass.destroy.call(this);
    }
});

_$jscoverage_done("/Users/dxq613/Desktop/work/web/graphic/svg/src/container.js", 260);
module.exports = Container;