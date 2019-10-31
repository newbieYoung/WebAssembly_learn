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
    var myModule = loader.postInstantiate(myImport, module.instance); //改造 assemblyscript default loader 支持浏览器环境
    var exports = module.instance.exports;

    var $mat = getCvMat('mat');
    var $ker = getCvMat('ker');

  }).catch(err => {
    alert("Failed to load WASM: " + err.message + " (ad blocker, maybe?)");
    console.log(err.stack);
  });

//解析图片数据至 CvMat 格式
function getCvMat(imageId) {
  var $img = document.querySelector('#' + imageId);
  var width = $img.width;
  var height = $img.height;

  var $canvas = document.createElement('canvas');
  $canvas.width = width;
  $canvas.height = height
  var ctx = $canvas.getContext('2d');
  ctx.drawImage($img, 0, 0, width, height);

  var data = ctx.getImageData(0, 0, width, height);
  console.log(data);
}