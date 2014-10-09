
var Util = require('svg-util');

var REG_PATH_CHAR = /([a-z])([^a-z]*)/ig,
  MAP_PATH_LEN = { //Path 类型中点的数目
      'L' : 2,
      'H' : 1,
      'V' : 1,
      'C' : 6,
      'S' : 4,
      'Q' : 4,
      'T' : 2,
      'A' : 7
  };

//将path 分解成一个个的点
function parsePathArray(arr){
    var type = arr[0].toUpperCase(),
        len = MAP_PATH_LEN[type],
        rst = [];
    if(!len || arr.length <= (len + 1)){ 
        rst.push(arr);
    }else{
        for(var i = 1;i < arr.length; i = i + len){
            var sub = arr.slice(i,i + len);
            sub.unshift(arr[0]);
            rst.push(sub);
        }
    }
    return rst;
}

Util.mix(Util,{
  /**
   * 将path数组转换成字符串
   * @param  {Array} array 数组
   * @return {String}  字符串
   */
  parsePathArray : function(array){
    if(Util.isArray(array)){
      var path = Util.map(array,function(item){
        var str = item.join(' ');
        return str.replace(/([a-z,A-Z])\s+/,'$1');
      });
      return path.join(' ');
    }
    return array;
  },
  /**
   * 将path字符串转换成数组
   * @param  {String} str 字符串
   * @return {Array}  数组
   */
  parsePathString : function(str){
    var arr = [];
    if(Util.isArray(str)){
        arr = str;
    }else{
      str.replace(REG_PATH_CHAR,function(match,cmd,points){
          var sub = [cmd];
          points = points.trim();
          if(points){
              var pArray = points.split(/[\s,]/); 
              sub = sub.concat(pArray.map(function(item){
                  return +item;
              }));
          }
          arr = arr.concat(parsePathArray(sub));
          //arr.push(sub);
      });
    }
    return arr;
  },
  transform : function(el,ts){

  },
  getTransform : function(el){

  },
  translate : function(el,dx,dy){

  },
  scale : function(el,sx,sy){
    return this;
  },
  rotate : function(el,angle){
    return this;
  }
});

module.exports = Util;