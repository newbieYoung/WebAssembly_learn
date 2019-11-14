const fs = require('fs');
const loader = require('../assemblyscript/lib/loader'); //默认加载器
const buffer = fs.readFileSync(__dirname + '/../build/untouched.wasm');
var myModule = loader.instantiateSync(buffer, {});

//简单运算
console.log('---');
console.log(myModule.add(1, 2));
console.log(myModule.minus(2, 1));

//for循环
console.log('---');
console.log(myModule.forLoop(5));

//类型转换
console.log('---');
console.log(myModule.i32Tof32(255));

//直接操作内存
console.log('---');
myModule.fib3();
let mem = new Uint32Array(myModule.memory.buffer);
console.log(Array.from(mem.slice(0, myModule.fibLen + 1)));

//字符串读取和传参
console.log('---');
let p0 = myModule.hello();
console.log(myModule.__getString(p0));

let name = 'tencent';
let ptr = myModule.__allocString(name)
let p1 = myModule.hi(ptr); //进行数组操作之前需要执行该方法，进行一次内存数据变换，否则会报错；暂时不清楚具体原因。
console.log(myModule.__getString(p1));

//数组读取和传参数
console.log('---');
let len = 2300;
let arr = [];
for (let i = 0; i < len; i++) {
  arr.push(parseInt(Math.random() * len));
}
let p2 = myModule.__allocArray(myModule.INT32ARRAY_ID, arr);
let p3 = myModule.bubbleSort(p2, arr.length);
console.log(myModule.__getInt32Array(p3).length);