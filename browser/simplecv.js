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
  }
}
loader.preInstantiate(myImport);

fetch("../build/optimized.wasm")
  .then(response => response.arrayBuffer())
  .then(buffer => WebAssembly.instantiate(buffer, myImport))
  .then(module => {
    let myModule = loader.postInstantiate(myImport, module.instance); //改造 assemblyscript default loader 支持浏览器环境
    let exports = module.instance.exports;

    let mat = getCvMat('mat');
    let pMat = myModule.__retain(myModule.__allocArray(myModule.INT8ARRAY_ID, mat.data)); //数组转换为指针
    let ker = getCvMat('ker');
    console.log(ker.data);
    let kMat = myModule.__retain(myModule.__allocArray(myModule.INT8ARRAY_ID, ker.data));
    let pConv = exports.convolution(pMat, mat.width, mat.height, kMat, ker.width, ker.height);
    console.log(pConv);
    console.log(myModule.__getInt32Array(pConv));



  }).catch(err => {
    alert("Failed to load WASM: " + err.message + " (ad blocker, maybe?)");
    console.log(err.stack);
  });

//解析图片数据至 CvMat 格式
function getCvMat(imageId) {
  let $img = document.querySelector('#' + imageId);
  let width = $img.width;
  let height = $img.height;

  let $canvas = document.createElement('canvas');
  $canvas.width = width;
  $canvas.height = height
  let ctx = $canvas.getContext('2d');
  ctx.drawImage($img, 0, 0, width, height);

  return ctx.getImageData(0, 0, width, height);
}