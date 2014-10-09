var Util = require('./util');

var Attribute = function  () {
  // body...
};


Attribute.prototype = {
  /**
   * 设置或者设置属性，有一下3中情形：
   *
   *   - name为字符串，value 为空，获取属性值
   *   - name为字符串，value不为空，设置属性值，返回this
   *   - name为键值对，value 为空，设置属性值
   *   
   * @param  {String|Object} name  属性名
   * @param  {*} value 属性值
   * @return {*} 属性值
   */
  attr : function(name,value){
    var _self = this,
      el = _self.get('el');
    if(Util.isObject(name)){
      Util.each(name,function(v,k){
        _self.attr(k,v);
      });
      return _self;
    }
    if(value !== undefined){
      return _self._setAttr(name,value);
    }
    return _self._getAttr(name);
  },
  //获取属性值
  _getAttr : function(name){
    var _self = this,
      node = _self.get('node'),
      value = Util.attr(node,name) || '',
      m = '__get' + Util.ucfirst(name);
    if(_self[m]){
      value = _self[m](value);
    }
    return value;
  },
  //设置属性值
  _setAttr : function(name,value){
    var _self = this,
      node = _self.get('node'),
      m = '__set' + Util.ucfirst(name);
    if(_self[m]){
      var parseValue = _self[m](value);
      if(parseValue != undefined){
        Util.attr(node,name,parseValue);
      }
    }else{
      Util.attr(node,name,value);
    }
    return _self;
  }

};

module.exports = Attribute;