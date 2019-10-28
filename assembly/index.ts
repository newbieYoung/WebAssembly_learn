// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b
}

export function minus(a: i32, b: i32): i32 {
  return a - b
}

export function hello(): string {
  return 'hello webassembly'
}

export function hi(name: string): string {
  return 'hi ' + name
}

//计算斐波那契数列
export function fib(n: i32): i32 {
  if (n < 2) {
    return 1
  }
  return fib(n - 2) + fib(n - 1)
}

//斐波那契数列 非递归实现
export function fib2(n: i32): i32 {
  var a = 0,
    b = 1
  for (let i = 0; i < n; i++) {
    let t = a + b
    a = b
    b = t
  }
  return b
}
