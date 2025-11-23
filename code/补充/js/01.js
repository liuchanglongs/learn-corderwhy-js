/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-24 09:43:34
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-26 15:31:08
 * @Description: lcl
 */

/**
 * 1. 参数默认值
 * */
// 没有传值、传值为undefined才用默认参数
// 函数.length：只返回使用默认前面参数的个数
function name(start, center, over) {
  return 'name';
}
// console.log(name.length); // 3

function name1(start, center, over = 2) {
  console.log(start, center, over);
  return 'name1';
}
// console.log(name1.length); //2
// name1(1, 2); //1 2 2
// name1(1, 2, undefined); //1 2 2

// 暂时性死区：const let 有变量提升，因为暂时性死区才不能提前使用
// 默认值参数也有：
function name2(b) {
  return 'name2';
}
function bar(a = name2(b), b) {
  console.log(a, b);
}
// bar(1, 2); // 1, 2
// bar(undefined, 2); //先传a->调用name2；在传b。b不能提前使用所以报错： Cannot access 'b' before initialization

/**
 * 2. 剩余参数：解决形参不明确
 * 一个函数只能出现一个剩余参数，剩余参数只能放在最后
 * */
// function print() {
// }
// print('log', 1, 2, 3, 5, 8, 7);

function print(way, ...args) {}
print('log', 1, 2, 3, 5, 8, 7);

/**
 * 3. 展开运算符：可迭代对象（数组、伪数组、迭代器改造）
 *  浅拷贝
 * */
// 找出最大值
const num1 = [45, 2, 3, 8];
// console.log(Math.max.apply(null, num1));
// console.log(Math.max(...num1));

// 浅拷贝
// console.log(num1.slice(0) == num1);
// console.log([...num1] == num1);

// ES7草案当中已经加⼊了对 象展开运算符特性。
// 对象后面的会覆前面的key的值
// 对象里面按键值对展开
const obj1 = {
  a: 1,
  b: 1,
};
const obj2 = {
  a: 1,
  c: 1,
};
// console.log({ ...obj1, ...obj2, c: 0 });

/**
 * 4. 函数：对流程的封装
 *箭头函数：没有this、不能被constructor、没有constructor
 **/
const fn2 = () => 2;
const fn3 = function (params) {};
// console.log(fn2.prototype); // undefined
// console.log(fn3.prototype); // {}
// console.log(new fn2()); //fn2 is not a constructor

/**
 * 5. 去重
 * */
const arry2 = [1, 2, 12, 1, 2, 12, 4, 324, 32];
// console.log([...new Set(arry2)]);
// console.log(Array.from(new Set(arry2)));

/**
 * 6. 展开运算符巧用
 * */
function configFn(options = {}) {
  const config = {
    a: 1,
    b: 2,
    c: 3,
    ...options,
  };
  console.log(config);
}
// configFn();
// configFn({ a: 34, d: 0 });

/**
 * 7. 日志记录函数
 * */
// 调用obj3里面的方法的时候，打印日志。
// 新的函数-》日志-》调用原来的函数
const obj3 = {
  add(...arg) {
    console.log(this.move(), 'add-->', arg);
    return 'add';
  },
  move() {
    console.log('move');
    return 1;
  },
  cnter() {
    return 'cnter';
  },
};
for (const key in obj3) {
  const fn = obj3[key];
  obj3[key] = (...arg) => {
    console.log(key + '函数开始执行');
    console.log('satrt');
    const result = fn.call(obj3, ...arg);
    console.log('end');
    return result;
  };
}
obj3.add(1);

/**
7. 浏览器跨域：在浏览器中，发生请求，服务器响应请求。浏览器会限制这个返回的响应，是否允许跨域，然后返回结果
1. 浏览器的同源策略：协议、端口、地址
2. 浏览器跨域限制：对任何请求都有限制，标签发出的请求轻微限制；主要对Ajax进行严厉限制
3. 常见的：content-tyap:
application/json　　　　　 json类型
multipart/form-data             需要在表单中进行文件上传时，使用该格式（FormData）
Content-Type: application/x-www-form-urlcoded 表单格式（默认）
text/plain 　　　　　　　　文本类型
text/css 　　　　　　　　 css类型
text/html 　　 　　　　　　html类型
application/x-javascript 　　js类型
application/json　　　　　 json类型
image/png jpg gif　　　　　 image/*

1. 解决跨域：CORS规则
- 用于浏览器校验跨域请求，只要服务器明确表示允许，则校验通过；服务器明确拒绝或没有表示，则校验不通过
CORS将请求分为两类：简单请求、预检请求

简单请求：
请求方法为:GET、POST、HEAD；
头部字段满足CORS安全规范，详见 W3C规范；
请求头的Content-Type为text/plain、multipart/form-data；application/x-ww-form-urlencoded

当简单请求发送请求，会带上请求源（Origin：http://my.com），然后服务器会返回Access-Control-Allow-Origin：http://my.com/*；
浏览器检验对得上就通过。
当发送预检请求时：发送请求会回去询问服务器（带上请求源Origin、请求方法、请求头），服务器返回允许的Access-Control-Allow-Origin、
请求方法、允许的请求头、Access-Control-Max-Age（时间，在这个时间内不用去询问 ）；然后在发送真实的请求。

2. JSONP： 古老的浏览器没有cors规则-只能get
JSONP是解决跨域问题的古老方案同源策略中，对标签的跨域请求限制较小，JSONP利用了这一点
利用script标签解决，服务器调用callback()函数返回值。

共同特点：都需要服务器配合。

3. proxy代理
 通过中间服务器代理

 * */
