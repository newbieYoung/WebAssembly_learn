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
