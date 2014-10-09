
var objectPrototype = Object.prototype,
  toString = objectPrototype.toString;

var MAX_LEVEL = 5;

function deepMix(dst,src,level){
  level = level || 0;
  for(var k in src){
    if(src.hasOwnProperty(k)){
      var value = src[k];
      if(value !== null && Util.isObject(value)){
        if(!Util.isObject(dst[k])){
          dst[k] =  {};
        }
        if(level < MAX_LEVEL){
          deepMix(dst[k],src[k]);
        }else{
          dst[k] = src[k];
        }
      }else if(Util.isArray(value)){
        //if(!Util.isArray(dst[k])){
        dst[k] = [];
        //}
        dst[k] = dst[k].concat(value);
      }else if(value !== undefined){
        dst[k] = src[k];
      }
    }
  }
}

/**
 * @class Util
 * @singleton
 * 绘图的工具类
 */
var Util = {

  /**
     * 替换字符串中的字段.
     * @param {String} str 模版字符串
     * @param {Object} o json data
     * @param {RegExp} [regexp] 匹配字符串的正则表达式
     */

    substitute: function (str, o) {
      if(!str || !o){
        return str;
      }
      return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
        if (match.charAt(0) === '\\') {
            return match.slice(1);
        }
        return (o[name] === undefined) ? '' : o[name];
      });
    },
    /**
     * 使第一个字母变成大写
     * @param  {String} s 字符串
     * @return {String} 首字母大写后的字符串
     */
    ucfirst : function(s){
        s += '';
        return s.charAt(0).toUpperCase() + s.substring(1);
    },
    /**
     * 判断是否是字符串
     * @return {Boolean} 是否是字符串
     */
    isString : function(value){
        return typeof value === 'string';
    },
    /**
     * 判断是否数字
     * @return {Boolean} 是否数字
     */
    isNumber : function(value){
        return typeof value === 'number';
    },
    /**
     * 判断是否数字或者数字字符串，由于$.isNumberic方法会把 '123'认为数字
     * @return {Boolean} 是否数字
     */
    isNumeric : function(value){
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    /**
     * 是否是布尔类型
     *
     * @param {Object} value 测试的值
     * @return {Boolean}
     */
    isBoolean: function(value) {
        return typeof value === 'boolean';
    },
    /**
     * 是否为函数
     * @param  {*} fn 对象
     * @return {Boolean}  是否函数
     */
    isFunction : function(fn){
        return typeof(fn) === 'function';
    },
    /**
     * 是否数组
     * @method
     * @param  {*}  obj 是否数组
     * @return {Boolean}  是否数组
     */
    isArray : ('isArray' in Array) ? Array.isArray : function(value) {
        return toString.call(value) === '[object Array]';
    },

    /**
     * 是否日期
     * @param  {*}  value 对象
     * @return {Boolean}  是否日期
     */
    isDate: function(value) {
        return toString.call(value) === '[object Date]';
    },
    /**
     * 是否是javascript对象
     * @param {Object} value The value to test
     * @return {Boolean}
     * @method
     */
    isObject: (toString.call(null) === '[object Object]') ?
        function(value) {
            // check ownerDocument here as well to exclude DOM nodes
            return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
        } :
        function(value) {
            return toString.call(value) === '[object Object]';
        },

    /**
     * 实现类的继承，通过父类生成子类
     * @param  {Function} subclass
     * @param  {Function} superclass 父类构造函数
     * @param  {Object} overrides  子类的属性或者方法
     * @return {Function} 返回的子类构造函数
     * 示例:
     *      @example
     *      //父类
     *      function base(){
     *  
     *      }
     *
     *      function sub(){
     * 
     *      }
     *      //子类
     *      Util.extend(sub,base,{
     *          method : function(){
     *    
     *          }
     *      });
     *
     *      //或者
     *      var sub = Util.extend(base,{});
     */
    extend : function(subclass,superclass,overrides, staticOverrides){
        //如果只提供父类构造函数，则自动生成子类构造函数
        if(!Util.isFunction(superclass))
        {
            overrides = superclass;
            superclass = subclass;
            subclass =  function(){};
        }

        var create = Object.create ?
          function (proto, c) {
              return Object.create(proto, {
                  constructor: {
                      value: c
                  }
              });
          } :
          function (proto, c) {
              function F() {
              }

              F.prototype = proto;

              var o = new F();
              o.constructor = c;
              return o;
          };
            
        var superObj = create(superclass.prototype,subclass);//new superclass(),//实例化父类作为子类的prototype
        subclass.prototype = Util.mix(superObj,subclass.prototype);     //指定子类的prototype
        subclass.superclass = create(superclass.prototype,superclass);
        Util.mix(superObj,overrides);
        Util.mix(subclass,staticOverrides);
        return subclass;
    },
    /**
     * 复制到原型链上
     * @param  {Function} c   类
     * @param  {Object} obj 对象
     */
    augment : function(c){

      var args = Util.toArray(arguments);
      for(var i = 1;i < args.length; i++){
        var obj = args[i];
        if(Util.isFunction(obj)){
            obj = obj.prototype;
        }
        Util.mix(c.prototype,obj);
      }
    },
    /**
     * 转换成数组
     * @param  {*} value 需要转换的对象
     * @return {Array}  数组
     */
    toArray: function (value) { 
      if(!value || !value.length){
        return [];
      }
      if(Util.vml){
        var rst = [];
        for(var i = 0; i < value.length; i++){
          rst.push(value[i]);
        }
        return rst;
      }else{
        return Array.prototype.slice.call(value); 
      }
      
    },
    /**
     * 合并数据
     * @return {Object} 将数据合并到第一个
     */
    mix : function(){
      var args = Util.toArray(arguments),
        obj = args[0];
      if(obj == true){
        obj = args[1];
        for(var i = 2;i < args.length; i++){
          var source = args[i];
          deepMix(obj,source);
        }
      }else{
        for(var i = 1;i < args.length; i++){
          var source = args[i];
          for(var k in source){
            if(source.hasOwnProperty(k) && k != 'constructor'){
              obj[k] = source[k];
            }
          }
        }
      }

      
      return obj;
    },
    mixin : function(c,mixins){
      if(c && mixins){
        c._mixins = mixins;
        c.ATTRS = c.ATTRS || {};
        var temp = {};
        Util.each(mixins,function(mixin){
          Util.augment(c,mixin);
          var attrs = mixin.ATTRS;
          if(attrs){
            Util.mix(temp,attrs);
          }
        });

        c.ATTRS = Util.mix(temp,c.ATTRS);
      }
    },
    /**
     * map 数组
     * @param  {Array} arr 数组
     * @return {Array} map后的数组
     */
    map : function(arr,func){
      var result = [];
      Util.each(arr,function(value,index){
        result.push(func(value,index));
      });
      return result;
    },
   /**
     * 过滤数组
     * @param {Object|Array} element/Object 数组中的元素或者对象的值 
     * @param {Function} func 遍历的函数 function(elememt,index){} 或者 function(value,key){},如果返回true则添加到结果集
     * @return {Array} 过滤的结果集
     */
    filter : function(array,func){
      var result = [];
      Util.each(array,function(value,index){
        if(func(value,index)){
          result.push(value);
        }
      });
      return result;
    },
    /**
     * 遍历数组或者对象
     * @param {Object|Array} element/Object 数组中的元素或者对象的值
     * @param {Function} func 遍历的函数 function(elememt,index){} 或者 function(value,key){}
     */
    each : function (elements,func) {
      if(!elements){
          return;
      }
      if(Util.isObject(elements)){
        for(var k in elements){
          if(elements.hasOwnProperty(k)){
           var rst = func(elements[k],k);
           if(rst == false){
             break;
           }
          }
        }
      }else if(elements.length){
        for (var i = 0; i < elements.length ; i++) {
          var rst = func(elements[i],i);
          if(rst == false){
             break;
           }
        };
      }
    },
    requestAnimationFrame : function(fn){
        var method = window.requestAnimationFrame 
        || window.webkitRequestAnimationFrame 
        || function(fn){
           return setTimeout(fn,16);
        };
        
        return method(fn);
    },
    cancelAnimationFrame : function(id){
        var method = window.cancelAnimationFrame 
        || window.webkitCancelAnimationFrame 
        || function(id){
           return clearTimeout(id);
        }; 
        return  method(id);
    },
    /**
     * 生成唯一的Id
     * @method
     * @param {String} prefix 前缀
     * @return {String} 唯一的编号
     */
    guid : (function(){
        var map = {};
        return function(prefix){
            prefix = prefix || 'acharts';
            if(!map[prefix]){
                map[prefix] = 1;
            }else{
                map[prefix] += 1;
            }
            return prefix + map[prefix];
        };
    })(),

    indexOf : function(arr,obj){
      var m = Array.prototype.indexOf;
      if(m){
        return m.call(arr,obj);
      }
      var index = -1;

      for(var i = 0 ; i < arr.length; i++){
        if(arr[i] == obj){
          index = i;
          break;
        }
      }
      return index;
    },
    /**
     * 删除
     */
    remove : function(arr,obj){
      var index = Util.indexOf(arr,obj);
      if(index !== -1){
        arr.splice(index,1);
      }
    },
    /**
     * 清空
     * @param  {Array} array 数组
     */
    empty : function(array){
      if(!(array instanceof(Array))){
        for (var i = array.length - 1; i >= 0; i--) {
          delete array[i];
        }
      }
      array.length = 0;
    },
    /**
     * 2个数组是否等同
     * @param  {Array} a1 数组1
     * @param  {Array} a2 数组2
     * @return {Boolean} 2个数组相等或者内部元素是否相等
     */
    equalsArray : function(a1,a2){
      if(a1 == a2){
        return true;
      }
      if(!a1 || !a2){
        return false;
      }

      if(a1.length != a2.length){
        return false;
      }
      var rst = true;
      for(var i = 0 ;i < a1.length; i++){
        if(a1[i] !== a2[i]){
          rst = false;
          break;
        }
      }
      return rst;
    },
    /**
     * 封装事件，便于使用上下文this,和便于解除事件时使用
     * @protected
     * @param  {Object} self   对象
     * @param  {String} action 事件名称
     */
    wrapBehavior : function(self, action) {
        return self['_wrap_' + action] = function (e) {
          self[action](e);
        };
    },
    /**
     * 获取封装的事件
     * @protected
     * @param  {Object} self   对象
     * @param  {String} action 事件名称
     */
    getWrapBehavior : function(self, action) {
        return self['_wrap_' + action];
    }
};


module.exports = Util;

