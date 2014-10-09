var expect = require('expect.js');
var Util = require('../src/util'),
  $ = require('jquery'),
  sinon = require('sinon'),
  Canvas = require('../src/canvas'),
  simulate = require('event-simulate');

$('<div id="c1"></div>').appendTo('body');

describe('svg canvas create',function() {

  var canvas = new Canvas({
    id : 'c1',
    width : 300,
    height : 300
  });

  var node = canvas.get('node');

  it('测试生成dom',function(){
    expect(node).not.to.be(undefined);
  });
  it('测试默认属性',function(){
    expect(Util.attr(node,'width')).to.be(canvas.get('width'));
    expect(Util.attr(node,'height')).to.be(canvas.get('height'));

    expect(canvas.getViewWidth()).to.be(canvas.get('width'));
    expect(canvas.getViewHeight()).to.be(canvas.get('height'));
  });



  it('test getPoint',function(){
    var offset = node.getBoundingClientRect(),
      point = canvas.getPoint(offset.left + 200,offset.top + 200);

    expect(point.x).to.be(200);

    expect(point.y).to.be(200);
  });

  it('destroy',function(){
    canvas.destroy();
    expect(canvas.destroyed).to.be(true);
    expect($.contains(document.body,node)).to.be(false);
  });
});


describe('init viewbox',function() {

  var canvas = new Canvas({
    id : 'c1',
    width : 500,
    height : 500,
    viewbox : {
      x : 0,
      y : 0,
      width : 1000,
      height : 1000
    }
  });

  var node = canvas.get('node');

  Util.attr(node,'id','s2');

  it('测试生成dom',function(){
    expect(node).not.to.be(undefined);
  });
  it('测试默认属性',function(){
    expect(Util.attr(node,'width')).to.be(canvas.get('width'));
    expect(Util.attr(node,'height')).to.be(canvas.get('height'));

     expect(canvas.getViewWidth()).not.to.be(canvas.get('width'));
    expect(canvas.getViewHeight()).not.to.be(canvas.get('height'));
  });

  it('test getPoint',function(){
    var offset = node.getBoundingClientRect(),
      point = canvas.getPoint(offset.left + 200,offset.top + 200);

    expect(point.x).to.be(400);
    expect(point.y).to.be(400);
  });

  describe('测试画板操作',function(){

    it('更改宽度,高度',function(){
      expect(Util.attr(node,'width')).to.be(500);
      canvas.setSize(300,300);
      expect(Util.attr(node,'width')).to.be(300);
    });
    
    it('更改viewbox',function(){
      canvas.setViewBox(0,0,600,600);
      expect(canvas.get('viewbox').width).to.be(600);
    });

    it('test getPoint',function(){
      var offset = node.getBoundingClientRect(),
        point = canvas.getPoint(offset.left + 200,offset.top + 200);

      expect(point.x).to.be(400);

      expect(point.y).to.be(400);
    });
    
    it('test relative x',function(){
      var point = canvas.getRelativePoint(200,200);
      expect(point.x).to.be(400);
    });

    it('更改viewbox',function(){
      canvas.setSize(600,600);

      expect(canvas.get('viewbox').width).to.be(600);
    });
  });

  describe('evnet',function(){
    it('on off',function(){

      var callback = sinon.spy();
      canvas.on('click',callback);
      simulate.simulate(node,'click');

      expect(callback.called).to.be(true);
      callback.called = false;

      canvas.off('click',callback);
      simulate.simulate(node,'click');

      expect(callback.called).to.be(false);
    }); 

    it('custom event',function(){
      var callback = sinon.spy();
      canvas.on('test',callback);

      canvas.fire('test');
      expect(callback.called).to.be(true);
      callback.called = false;

      canvas.off('test',callback);
      canvas.fire('test');
      expect(callback.called).to.be(false);
    });
  });
});

