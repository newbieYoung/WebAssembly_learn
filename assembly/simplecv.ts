/**
 * RGBA颜色矩阵
 * rows 行
 * cols 列
 * len 长度
 * data 数据
 */
class CvMat {
  rows: i32
  cols: i32
  len: i8
  data: Array<i8>

  constructor(data: Array<i8>, len: i8, rows: i32, cols: i32) {
    len = len === null ? 4 : len
    rows = rows === null ? 0 : rows
    cols = cols === null ? 0 : cols
    let total = rows * cols * len
    data = data === null ? new Array<i8>(total) : data

    //数据整理
    data = data.slice(0, total) //截取去掉多余
    for (let i = data.length; i < total; i++) {
      data.push(0) //缺失补0
    }

    this.data = data
    this.len = len
    this.rows = rows
    this.cols = cols
  }

  channels(): i8 {
    return this.len
  }
}

export function convolution(): CvMat {
  let cvMat = new CvMat([], 0, 0, 0)
  return cvMat
}
