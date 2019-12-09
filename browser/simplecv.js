"use strict";

const loader = require("../assemblyscript/lib/loader");
console.log(loader);

let myImport = {
  env: {
    memory: new WebAssembly.Memory({
      initial: 256
    }),
    abort: function (err) {
      throw Error(err);
    }
  }
}
loader.preInstantiate(myImport);

fetch("../build/simplecv.wasm")
  .then(response => response.arrayBuffer())
  .then(buffer => WebAssembly.instantiate(buffer, myImport))
  .then(module => {
    let myModule = loader.postInstantiate(myImport, module.instance); //改造 assemblyscript default loader 支持浏览器环境
    let exports = module.instance.exports;

    //内存hack操作
    let arr = [];
    let p1 = myModule.__allocArray(myModule.INT32ARRAY_ID, arr);
    let p2 = exports.sliceArray(p1, 0, 0);

    //膨胀操作
    let ker = getCvMat('ker');
    let img1 = getCvMat('img1');
    let data1 = ker.data.concat(img1.data);
    let d0 = window.performance.now();
    let pData1 = myModule.__allocArray(myModule.INT32ARRAY_ID, data1);
    let pDilate = exports.dilate(pData1, ker.height, ker.width, img1.height, img1.width);
    let dilate = myModule.__getFloat32Array(pDilate);
    let d1 = window.performance.now();
    console.log('dilate ' + (d1 - d0) + 'ms');
    putCvData(dilate, img1.width, img1.height);

    //腐蚀操作
    let img2 = getCvMat('img2');
    let data2 = ker.data.concat(img2.data);
    let e0 = window.performance.now();
    let pData2 = myModule.__allocArray(myModule.INT32ARRAY_ID, data2);
    let pErode = exports.erode(pData2, ker.height, ker.width, img2.height, img2.width);
    let erode = myModule.__getFloat32Array(pErode);
    let e1 = window.performance.now();
    console.log('erode ' + (e1 - e0) + 'ms');
    putCvData(erode, img2.width, img2.height);

    /**
     * 浮雕
     * [
     * -2,-1,0,
     * -1,1,1,
     * 0,1,2
     * ]
     */
    let kerRelievo = [
      -2, -2, -2, 255, -1, -1, -1, 255, 0, 0, 0, 255,
      -1, -1, -1, 255, 1, 1, 1, 255, 1, 1, 1, 255,
      0, 0, 0, 255, 1, 1, 1, 255, 2, 2, 2, 255
    ]
    let img3 = getCvMat('img3');
    let data3 = kerRelievo.concat(img3.data);
    let r0 = window.performance.now();
    let pData3 = myModule.__allocArray(myModule.INT32ARRAY_ID, data3);
    let pRelievo = exports.convolution(pData3, 3, 3, img3.height, img3.width);
    let relievo = myModule.__getFloat32Array(pRelievo);
    let r1 = window.performance.now();
    console.log('relievo ' + (r1 - r0) + 'ms');
    console.log(relievo);
    putCvData(relievo, img3.width, img3.height);
  }).catch(err => {
    // 在浏览器环境中错误信息较为简略，很难排查问题，建议在 Node 环境中调试。
    console.log(err);
  });

function putCvData(conv, width, height) {
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext('2d');
  let imageData = ctx.getImageData(0, 0, width, height);
  for (let i = 0; i < conv.length; i++) {
    imageData.data[i] = conv[i];
  }
  ctx.putImageData(imageData, 0, 0);
  document.body.appendChild(canvas);
}

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