/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-03-23 09:49:30
 * @LastEditors: lcl
 * @LastEditTime: 2023-03-26 15:23:05
 * @Description: lcl
 */
/**
 * 运算符知识点：http://es5.github.io/#x9.1
 *
 * 1. 类型转换规则:
 *
 * - 所有类型->数字(ToNumber算法)
 * true->1;
 * false->0,
 * null->0;
 * undefidnd->NaN
 * ''->0
 * string:纯数字字符串(前后有无空格)->number; 空字符串、含/n等、纯数字字符串中间有空格 -> NaN
 * 对象：空数组(特殊)->0,[单个数字]->单个数字, 其它->NaN。调用valueOf方法
 *
 * - 所有类型转Boolean(ToBoolean算法)
 * null、undefined ->false
 * '' , 0 -> false; 其它数字\NaN -> true
 * 空字符串->false; 其它字符串->true
 * 对象（[]、{}、Function）->true 调用valueOf方法->number
 * ToPrimitive(通过DefaultValue方法返回)->ToBoolean
 *
 * - 原始->字符串(ToString )
 * null-> 'null'; undefinend->'undefinend'; 数字->'数字'，true/false->'true/false'
 * Object-> 1.  还是对象重新调用toString()； ;再转成对应的类型。是其它类型就按照其它类型转。
 *
 * - 对象转原始类型：
 * 对象原型的valueOf() 方法：返回对象的原始值。
 * [].valueOf() = []、{}.valueOf() = {}
 * 对象原型的toString() 方法将对象作为字符串返回。
 * toString() 方法不能返回字符串，则返回 "[object Object]"。
 * [].valueOf().toString()='';
 *
 *
 * 2. 运算规则
 * 算数运算：
 * 比较运算：
 * 逻辑运算：
 *
 * 3. 表达式
 *
 * 4. 常用简写方法
 */

// 1.原始类型->数字
// console.log(Number(true));
// console.log(Number(false));
// console.log(Number(null));
// console.log(Number(undefined));
// console.log(Number(''));
// console.log(Number('  '));
// console.log(Number(' /n '));
// console.log(Number('/n'));
// console.log(Number('1  2  '));
// console.log(Number('   12  '));

// 2. 转Boolean
// console.log(Boolean(null));
// console.log(Boolean(undefined));
// console.log(Boolean(0));
// console.log(Boolean(NaN));
// console.log(Boolean(1));
// console.log(Boolean('0'));
// console.log(Boolean(''));
// console.log(Boolean([]));
// console.log(Boolean({}));
// console.log(Boolean(() => {}));

// 3. 转字符串
// console.log(String(null));
// console.log(String(undefined));
// console.log(String(0));
// console.log(String(true));

// console.log(new Object({ a: 789 }).valueOf());
// console.log(typeof { a: 1 }.valueOf());

// 4. 对象转原始
const obj = {
  valueOf() {
    console.log('valueOf');
    return 'lcl1';
  },
  toString() {
    console.log('toString');
    return 'lcl';
  },
};
// 先obj.valueOf(),在obj.toString()
// console.log(String(obj));
// console.log(Number(obj));
// console.log(Number(obj));

const arry = [1];
arry.valueOf = () => {
  console.log('valueOf');
  return '';
};
arry.toString = () => {
  console.log('toString');
  return 4;
};
// console.log(arry.valueOf());
// console.log(arry.toString());
// console.log(String(arry));
// console.log(Number(arry));

// 2.
// 算数运算： +-*/% ++ --
// 转化成数字，然后运算
// 特殊情况: x+y， x和y有一个是字符串。转换为字符串，然后拼接
// 特殊情况: NaN和任何类型运算得到的还是NaN
// 特殊情况:含有数组、对象的 运算-》字符串 [] ->'';['lcl',1] -> 'lcl,1'
// console.log([] + []);
// console.log([1] + [1]);
// console.log([] + 1);
// console.log({} + ['55']);
// console.log({ a: 1 } + 1);

// 比较运算：
// > < >= <=
// 转化成数字，然后比较
// 两端全是数字，比较字点排序
// 存在NaN一定为false
// console.log(null > undefined);

// ===
// 类型和值必须都相同
// 特殊情况:两端存在NaN，一定为false

// ==
// 两端类型相同，比较值
// 两端都是原始类型，转换成数字比较
// 一端是原始类型，一蜡是对象类型把对象转换成原始类型后比较
// 特殊情况: undefined和null只有与自身比较或者互相比较时，才会返回true
// 特殊情况:两端存在NaN，一定为fale
// console.log(null == undefined);
// console.log('null' == 2);
// console.log([] == 0);
// console.log([6] == 6);
// console.log({} == 6);

// != !==
// 对相等取反

// 逻辑运算：! && || ?:

// ++ --
let a = 5;
// console.log(++a);
// console.log(a++);
// console.log(--a);
// console.log(a--);
// console.log(a++ + 5); a+5 -> a++
// console.log(++a + 5);

// 3. 表达式
// 数据：字面量 变量 表达式(有返回值)
const obj3 = {
  ment: 0 || 1,
};

// console.log(null + '1' == null + 1);
// console.log(null + 1 == 1);
// console.log(null + 1 == 1);
// console.log(null == 0);
// console.log(null == undefined);
// console.log(null + 1 == undefined + 1);
// console.log(null + null == undefined + undefined);
// console.log(null + null);
// console.log(undefined + undefined);
// null + null == undefined + undefined;

// const a1 = ?;
// console.log(a1 == 1 && a1 == 2 && a1 == 3); //true
// const a1 = {
//   number: 1,
//   valueOf() {
//     return this.number++;
//   },
// };
// console.log(a1 == 1 && a1 == 2 && a1 == 3); //true

// 4. 常用简写方法
// 1.
const user = null;
if (!user) {
  // console.log('---');
}
// console.log(!user && '---');
// console.log(!user, !Boolean(user));

// 2.
const page = '10';
// console.log(+page, Number(page));

const isBoolean = 'lcl';

// console.log(Boolean(isBoolean), !!isBoolean);

// 3.
// limit可能是nu11、undefined、大于0的数字
var limit;
// limit如果是nu11或undefined，
// 给与默认值10
// if (limit === null || limit === undefined) { limit = 10 }
limit = limit || 10;

// 4.
var users = {
  addr: {
    city: ';c;',
  },
};
// 每个属性都有可能为null或者是undefird
// user本身也有可能为nu11或者是undefi
if (users && users.addr) {
  // console.log(users.addr.city);
}
// console.log(users && users.addr && users.addr.city);
