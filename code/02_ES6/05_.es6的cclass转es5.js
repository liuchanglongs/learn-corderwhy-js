/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2022-06-05 16:03:16
 * @LastEditors: lcl
 * @LastEditTime: 2022-08-31 09:45:26
 * @Description: lcl
 */
'use strict';

function _classCallCheck(instance, Constructor) {
  console.log('instance', instance);
  console.log('Constructor', Constructor);
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

// Constructor：函数
// protoProps：原型
// staticProps：静态函数
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, 'prototype', { writable: false });
  return Constructor;
}

// 纯函数: 相同输入一定产生相同的输出, 并且不会产生副作用
// 立即执行函数-->加载类方法、原型方法
var Person = /*#__PURE__*/ (function () {
  // debugger;

  function Person(name, age) {
    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
  }

  _createClass(
    Person,
    [
      {
        key: 'running',
        value: function running() {},
      },
      {
        key: 'eating',
        value: function eating() {},
      },
    ],
    [
      {
        key: 'randomPerson',
        value: function randomPerson() {},
      },
    ]
  );

  return Person;
})();

var p1 = new Person('why', 18);
console.log(p1);
