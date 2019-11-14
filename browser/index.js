"use strict";

const loader = require("../assemblyscript/lib/loader");
console.log(loader);

let myImport = {
  env: {
    memory: new WebAssembly.Memory({
      initial: 256
    }),
    abort: function () {
      throw Error("abort called");
    }
  },
  Date: Date
}
loader.preInstantiate(myImport);

//计算斐波那契数列
function fib(n) {
  if (n < 2) {
    return 1
  }
  return fib(n - 2) + fib(n - 1)
}

fetch("../build/optimized.wasm")
  .then(response => response.arrayBuffer())
  .then(buffer => WebAssembly.instantiate(buffer, myImport))
  .then(module => {
    let myModule = loader.postInstantiate(myImport, module.instance); //改造 assemblyscript default loader 支持浏览器环境
    let exports = module.instance.exports;

    console.log(module);
    console.log(exports);
    console.log(myModule);

    //简单运算
    console.log('---');
    console.log(exports.add(1, 2));
    console.log(exports.minus(2, 1));

    //for循环
    console.log('---');
    console.log(exports.forLoop(5));

    //类型转换
    console.log('---');
    console.log(exports.i32Tof32(255));

    //直接操作内存
    console.log('---');
    exports.fib3();
    let mem = new Uint32Array(exports.memory.buffer);
    console.log(Array.from(mem.slice(0, myModule.fibLen + 1)));

    //字符串读取和传参
    console.log('---');
    let p0 = exports.hello();
    console.log(myModule.__getString(p0));

    let name = 'tencent';
    let ptr = myModule.__allocString(name)
    let p1 = exports.hi(ptr); //进行数组操作之前需要执行该方法，进行一次内存数据变换，否则会报错；暂时不清楚具体原因。
    console.log(myModule.__getString(p1));

    //数组读取和传参数
    console.log('---');
    let arr = [7, 2, 4, 3, 9];
    let p2 = myModule.__allocArray(myModule.INT32ARRAY_ID, arr);
    let p3 = exports.bubbleSort(p2, arr.length);
    console.log(myModule.__getInt32Array(p3));

    //截取数组
    let p4 = exports.sliceArray(p2, 0, 2);
    console.log(myModule.__getInt32Array(p4));

    /**
     * Date 对象目前需要先从外部导入
     */
    console.log('---');
    console.log(exports.dateNow());

    // Math 对象使用
    console.log('---');
    console.log(exports.random());

    /**
     * 计算斐波那契数列时间消耗对比
     * assemblyscript 1600
     * javascript 2600
     * emscripten 1000
     */
    console.log('---');
    let a0 = window.performance.now();
    exports.fib(42)
    let a1 = window.performance.now();
    console.log('assemblyscript ' + (a1 - a0) + ' ms');

    let j0 = window.performance.now();
    fib(42)
    let j1 = window.performance.now();
    console.log('javascript ' + (j1 - j0) + ' ms');

  }).catch(err => {
    alert("Failed to load WASM: " + err.message + " (ad blocker, maybe?)");
    console.log(err.stack);
  });