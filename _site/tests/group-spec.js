var expect = require('expect.js');
var Util = require('../src/util'),
  $ = require('jquery'),
  sinon = require('sinon'),
  Canvas = require('../src/canvas'),
  Group = require('../src/group'),
  simulate = require('event-simulate');

$('<div id="g1"></div>').appendTo('body');

var canvas = new Canvas({
    id : 'g1',
    width : 500,
    height : 500
});

describe('group create',function () {
  it('create',function(){
    var g = canvas.addGroup({
      elCls : 'g-class',
      zIndex : 1
    });

    expect(g.get('node')).not.to.be(undefined);
    expect(g.get('node').tagName).to.be('g');
  });
  it('zIndex',function(){
    var g1 = canvas.addGroup({
      elCls : 'g1-class',
      id : 'g1',
      zIndex : 0
    });
    expect(canvas.get('node').childNodes[0]).to.be(g1.get('node'));
    expect(g1.index()).to.be(0);
  });
  it('find',function(){
    var g1 = canvas.find('g1');
    expect(g1).not.to.be(null);
    expect(g1).not.to.be(undefined);
  });
});

describe('group operation',function () {
  it('add shape',function(){

  });
});

describe('group operation',function () {
  it('change zIndex',function(){
    
    var g1 = canvas.find('g1')
    g1.set('zIndex',2);
    expect(g1.index()).to.be(1);
  });

  it('add zindex',function(){
    var g2 = canvas.addGroup({
      elCls : 'g2-class',
      id : 'g2',
      zIndex : 2
    });
    expect(g2.index()).to.be(2);
  });

  it('to back',function(){
    var g1 = canvas.find('g1');
    g1.toBack();
    expect(g1.index()).to.be(0);
  });

  it('to front',function(){
    var g1 = canvas.find('g1');
    g1.toFront();
    expect(g1.index()).to.be(2);
  });

  it('translate',function(){

  });

  it('scale',function(){

  });

  it('rotate',function(){

  });


  it('transform',function(){

  });

});


describe('group event',function () {
  it('on off',function(){

  });
  it('custom',function(){

  });
});