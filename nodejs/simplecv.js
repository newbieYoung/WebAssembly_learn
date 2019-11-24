const fs = require("fs");
const loader = require("../assemblyscript/lib/loader"); //默认加载器
const buffer = fs.readFileSync(__dirname + "/../build/simplecv.wasm");
const getPixels = require("get-pixels");

var myModule = loader.instantiateSync(buffer, {});

//浮雕
getPixels('../images/img-3.jpg', function (err, pixels) {
  err && console.log(err);
  console.log(pixels);

  //获取像素数据
  let shape = pixels.shape;
  let imageData = [];
  for (let i = 0; i < shape[0]; i++) {
    for (let j = 0; j < shape[1]; j++) {
      for (let z = 0; z < shape[2]; z++) {
        imageData.push(pixels.get(i, j, z));
      }
    }
  }

  let img3 = {
    data: imageData,
    width: shape[0],
    height: shape[1]
  }
  let kerRelievo = [
    -2, -2, -2, 255, -1, -1, -1, 255, 0, 0, 0, 255,
    -1, -1, -1, 255, 1, 1, 1, 255, 1, 1, 1, 255,
    0, 0, 0, 255, 1, 1, 1, 255, 2, 2, 2, 255
  ];
  let data3 = kerRelievo.concat(img3.data);
  let pData3 = myModule.__allocArray(myModule.INT32ARRAY_ID, data3);
  let pRelievo = myModule.convolution(pData3, 3, 3, img3.height, img3.width);
  let relievo = myModule.__getFloat32Array(pRelievo);
  console.log(relievo.length);
});