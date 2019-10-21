const fs = require('fs');
const loader = require('../assemblyscript/lib/loader'); //默认加载器
const buffer = fs.readFileSync(__dirname + '/../build/untouched.wasm');
var myModule = loader.instantiateSync(buffer, {});
console.log(myModule.add(1, 1));