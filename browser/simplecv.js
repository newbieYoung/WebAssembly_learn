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

    let arr = [];
    let p1 = myModule.__allocArray(myModule.INT32ARRAY_ID, arr);
    let p2 = exports.sliceArray(p1, 0, 0);
    console.log(myModule.__getInt32Array(p2));

    let ker = getCvMat('ker');
    let mat = getCvMat('mat');
    let data = ker.data.concat(mat.data);
    let pData = myModule.__allocArray(myModule.INT32ARRAY_ID, data);
    let pConv = exports.convolution(pData, ker.width, ker.height, mat.width, mat.height);
    console.log(pConv);
    console.log(myModule.__getFloat32Array(pConv));

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

  let dataImage = ctx.getImageData(0, 0, width, height);
  let data = [];
  for (let i = 0; i < dataImage.data.length; i++) {
    data.push(dataImage.data[i]);
  }

  return {
    data: data,
    width: dataImage.width,
    height: dataImage.height
  }
}