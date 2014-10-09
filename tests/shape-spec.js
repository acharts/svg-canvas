var expect = require('expect.js');
var Util = require('../src/util'),
  $ = require('jquery'),
  sinon = require('sinon'),
  Canvas = require('../src/canvas'),
  Group = require('../src/group'),
  simulate = require('event-simulate');

$('<div id="s1"></div>').appendTo('body');

var canvas = new Canvas({
    id : 's1',
    width : 500,
    height : 500
});

describe('shape create',function () {

  it('画圆',function(){
    var circle = canvas.addShape('circle',{
      cx : 100,
      cy : 100,
      r : 20,
      fill : 'red'
    });
    var nEl = $(circle.get('node'));
    expect(circle.get('node')).not.to.be(undefined);
    if(Util.svg){
      expect(nEl.attr('cx')).to.be(circle.attr('cx').toString());
    }
    
  });
  it('画线',function(){
    var line = canvas.addShape('line',{
      x1 : 10,
      y1 : 10,
      x2 : 50,
      y2 : 50,
      stroke : 'red',
      'arrow-end' : 'classic'
    });

    var nEl = $(line.get('node'));
    expect(line.get('node')).not.to.be(undefined);
    if(Util.svg){
      expect(line.attr('x1')).to.be(10);
      expect(line.attr('x2')).to.be(50);
    }
    
    expect(line.attr('stroke')).to.be('red');
  });

  it('矩形',function(){
    var rect = canvas.addShape('rect',{
      x : 20,
      y : 20,
      width : 30,
      height : 20,
      stroke : 'blue',
      fill : 'none'
    });
    var nEl = $(rect.get('node'));
    expect(rect.get('node')).not.to.be(undefined);
  });
  it('多边形',function(){

    var polygon = canvas.addShape('polygon',{
      points : ['0,0','60,0','0,60'],
      fill : 'none',
      stroke : 'blue'
    });

    var nEl = $(polygon.get('node'));
    expect(polygon.get('node')).not.to.be(undefined);

  });
  it('椭圆',function(){
    var ellipse = canvas.addShape('ellipse',{
      cx : 200,
      cy : 100,
      rx : 20,
      ry : 50,
      fill : 'yellow'
    });

    var nEl = $(ellipse.get('node'));
    expect(ellipse.get('node')).not.to.be(undefined);
    expect(ellipse.attr('ry')).to.be(50);
    ellipse.attr('ry',60);
    expect(ellipse.attr('ry')).to.be(60);
  });
  it('path',function(){
    var str = 'M10 120 L10 50';
    var path = canvas.addShape('path',{
      path : str,
      stroke : 'blue'
    });

    var nEl = $(path.get('node'));
    expect(path.get('node')).not.to.be(undefined);
    if(Util.svg){
      //expect(path.getTotalLength()).to.be(70);
    }
    
    expect(Util.parsePathArray(path.getPath())).to.be(str);
  });

  it('文本',function(){
    var text = canvas.addShape('text',{
      x : 100,
      y : 10,
      "text-anchor":"middle",
      text : '你好么\n我很好'
    });
    var nEl = $(text.get('node'));
    expect(text.get('node')).not.to.be(undefined);

    if(Util.svg){
      expect(nEl.children().length).to.be(2);
    }
  });
/*
  it('label',function(){
    var text = canvas.addShape('label',{
      x : 100,
      y : 30,
      rotate : -45,
      text : '你好么\n我很好'
    });

    var nEl = $(text.get('node'));
    expect(text.get('el')).not.to.be(undefined);
    expect(text.get('node')).not.to.be(undefined);

  

  });

  it('图片',function(){
    var image = canvas.addShape('image',{
      x : 100,
      y : 100,
      width: 200,
      height: 100,
      src : 'http://gtms01.alicdn.com/tps/i1/T1oM_QFb8iXXcKT9UI-120-160.jpg_120x160q90.jpg'
    });
    var nEl = $(image.get('node'));
    expect(image.get('el')).not.to.be(undefined);
    expect(image.get('node')).not.to.be(undefined);

  });*/
});


describe('shape transform',function(){

});