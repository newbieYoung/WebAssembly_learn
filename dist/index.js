!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";const r=-8,o=-4,a=0,i=1,l=1,c=2,s=5,u=1024,f=2048,y=8192,g=0,b=4,p=8,d=12,A=12,_=16,w="undefined"!=typeof BigUint64Array,m=Symbol(),h=1024;function U(t,e){const n=new Uint32Array(t),r=new Uint16Array(t);var a=n[e+o>>>2]>>>1,i=e>>>1;if(a<=h)return String.fromCharCode.apply(String,r.subarray(i,i+a));const l=[];do{const t=r[i+h-1],e=t>=55296&&t<56320?h-1:h;l.push(String.fromCharCode.apply(String,r.subarray(i,i+=e))),a-=e}while(a>h);return l.join("")+String.fromCharCode.apply(String,r.subarray(i,i+a))}function v(t){const e={};function n(t,e){return t?U(t.buffer,e):"<yet unknown>"}const r=t.env=t.env||{};return r.abort=r.abort||function(t,o,a,i){const l=e.memory||r.memory;throw Error("abort: "+n(l,t)+" at "+n(l,o)+":"+a+":"+i)},r.trace=r.trace||function(t,o){const a=e.memory||r.memory;console.log("trace: "+n(a,t)+(o?" ":"")+Array.prototype.slice.call(arguments,2,2+o).join(", "))},t.Math=t.Math||Math,t.Date=t.Date||Date,e}function S(t,e){const n=e.exports,m=n.memory,h=n.table,v=n.__alloc,S=n.__retain,I=n.__rtti_base||-1;function O(t){const e=new Uint32Array(m.buffer);if((t>>>=0)>=e[I>>>2])throw Error("invalid id: "+t);return e[(I+4>>>2)+2*t]}function j(t){const e=new Uint32Array(m.buffer);if((t>>>=0)>=e[I>>>2])throw Error("invalid id: "+t);return e[(I+4>>>2)+2*t+1]}function M(t){return 31-Math.clz32(t>>>s&31)}function W(t,e,n){const r=m.buffer;if(n)switch(t){case 2:return new Float32Array(r);case 3:return new Float64Array(r)}else switch(t){case 0:return new(e?Int8Array:Uint8Array)(r);case 1:return new(e?Int16Array:Uint16Array)(r);case 2:return new(e?Int32Array:Uint32Array)(r);case 3:return new(e?BigInt64Array:BigUint64Array)(r)}throw Error("unsupported align: "+t)}function C(t){const e=new Uint32Array(m.buffer),n=e[t+r>>>2],a=O(n);if(!(a&l))throw Error("not an array: "+n);const i=M(a);var s=e[t+b>>>2];const y=a&c?e[t+A>>>2]:e[s+o>>>2]>>>i;return W(i,a&u,a&f).subarray(s>>>=i,s+y)}function E(t,e,n){const r=m.buffer,a=new Uint32Array(r),i=a[n+b>>>2];return new t(r,i,a[i+o>>>2]>>>e)}return t.__allocString=function(t){const e=t.length,n=v(e<<1,i),r=new Uint16Array(m.buffer);for(var o=0,a=n>>>1;o<e;++o)r[a+o]=t.charCodeAt(o);return n},t.__getString=function(t){const e=m.buffer;if(new Uint32Array(e)[t+r>>>2]!==i)throw Error("not a string: "+t);return U(e,t)},t.__allocArray=function(t,e){const n=O(t);if(!(n&(l|c)))throw Error("not an array: "+t+" @ "+n);const r=M(n),o=e.length,i=v(o<<r,a),s=v(n&c?_:d,t),w=new Uint32Array(m.buffer);w[s+g>>>2]=S(i),w[s+b>>>2]=i,w[s+p>>>2]=o<<r,n&c&&(w[s+A>>>2]=o);const h=W(r,n&u,n&f);if(n&y)for(let t=0;t<o;++t)h[(i>>>r)+t]=S(e[t]);else h.set(e,i>>>r);return s},t.__getArrayView=C,t.__getArray=function(t){const e=C(t),n=e.length,r=new Array(n);for(let t=0;t<n;t++)r[t]=e[t];return r},t.__getArrayBuffer=function(t){const e=m.buffer,n=new Uint32Array(e)[t+o>>>2];return e.slice(t,t+n)},t.__getInt8Array=E.bind(null,Int8Array,0),t.__getUint8Array=E.bind(null,Uint8Array,0),t.__getUint8ClampedArray=E.bind(null,Uint8ClampedArray,0),t.__getInt16Array=E.bind(null,Int16Array,1),t.__getUint16Array=E.bind(null,Uint16Array,1),t.__getInt32Array=E.bind(null,Int32Array,2),t.__getUint32Array=E.bind(null,Uint32Array,2),w&&(t.__getInt64Array=E.bind(null,BigInt64Array,3),t.__getUint64Array=E.bind(null,BigUint64Array,3)),t.__getFloat32Array=E.bind(null,Float32Array,2),t.__getFloat64Array=E.bind(null,Float64Array,3),t.__instanceof=function(t,e){const n=new Uint32Array(m.buffer);var o=n[t+r>>>2];if(o<=n[I>>>2])do{if(o==e)return!0}while(o=j(o));return!1},t.memory=t.memory||m,t.table=t.table||h,P(n,t)}function I(t,e){var n=(...n)=>(e(n.length),t(...n));return n.original=t,n}function O(t){return"undefined"!=typeof Response&&t instanceof Response}async function j(t,e){return O(t=await t)?M(t,e):S(v(e||(e={})),await WebAssembly.instantiate(t instanceof WebAssembly.Module?t:await WebAssembly.compile(t),e))}async function M(t,e){return WebAssembly.instantiateStreaming?S(v(e||(e={})),(await WebAssembly.instantiateStreaming(t,e)).instance):j(O(t=await t)?t.arrayBuffer():t,e)}function P(t,e){var n=e?Object.create(e):{},r=t.__setargc||function(){};function o(t,e){return Object.prototype.hasOwnProperty.call(t,e)}for(let e in t){if(!o(t,e))continue;let a=t[e],i=e.split("."),l=n;for(;i.length>1;){let t=i.shift();o(l,t)||(l[t]={}),l=l[t]}let c=i[0],s=c.indexOf("#");if(s>=0){let n=c.substring(0,s),i=l[n];if(void 0===i||!i.prototype){let t=function(...e){return t.wrap(t.prototype.constructor(0,...e))};t.prototype={valueOf:function(){return this[m]}},t.wrap=function(e){return Object.create(t.prototype,{[m]:{value:e,writable:!1}})},i&&Object.getOwnPropertyNames(i).forEach(e=>Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))),l[n]=t}if(c=c.substring(s+1),l=l[n].prototype,/^(get|set):/.test(c)){if(!o(l,c=c.substring(4))){let n=t[e.replace("set:","get:")],r=t[e.replace("get:","set:")];Object.defineProperty(l,c,{get:function(){return n(this[m])},set:function(t){r(this[m],t)},enumerable:!0})}}else"constructor"===c?l[c]=I(a,r):Object.defineProperty(l,c,{value:function(...t){return r(t.length),a(this[m],...t)}})}else/^(get|set):/.test(c)?o(l,c=c.substring(4))||Object.defineProperty(l,c,{get:t[e.replace("set:","get:")],set:t[e.replace("get:","set:")],enumerable:!0}):l[c]="function"==typeof a?I(a,r):a}return n}e.preInstantiate=v,e.postInstantiate=S,e.instantiate=j,e.instantiateSync=function(t,e){return S(v(e||(e={})),new WebAssembly.Instance(t instanceof WebAssembly.Module?t:new WebAssembly.Module(t),e))},e.instantiateStreaming=M,e.demangle=P},function(t,e,n){"use strict";const r=n(0);console.log(r);let o={env:{memory:new WebAssembly.Memory({initial:256}),abort:function(){throw Error("abort called")}},Date:Date};r.preInstantiate(o),fetch("../build/optimized.wasm").then(t=>t.arrayBuffer()).then(t=>WebAssembly.instantiate(t,o)).then(t=>{let e=r.postInstantiate(o,t.instance),n=t.instance.exports;console.log(t),console.log(n),console.log(e),console.log("---"),console.log(n.add(1,2)),console.log(n.minus(2,1)),console.log("---");let a=n.hello();console.log(a),console.log(e.__getString(a));let i=e.__allocString("tencent"),l=n.hi(i);console.log(l),console.log(e.__getString(l)),console.log("---");let c=[7,2,4,3,9],s=e.__retain(e.__allocArray(e.INT32ARRAY_ID,c)),u=n.bubbleSort(s,c.length);console.log(e.__getInt32Array(u));let f=n.sliceArray(s,0,2);console.log(e.__getInt32Array(f)),console.log("---"),console.log(n.dateNow()),console.log("---"),console.log(n.random()),console.log("---");let y=window.performance.now();n.fib(42);let g=window.performance.now();console.log("assemblyscript "+(g-y)+" ms");let b=window.performance.now();!function t(e){return e<2?1:t(e-2)+t(e-1)}(42);let p=window.performance.now();console.log("javascript "+(p-b)+" ms")}).catch(t=>{alert("Failed to load WASM: "+t.message+" (ad blocker, maybe?)"),console.log(t.stack)})}]);
//# sourceMappingURL=index.js.map