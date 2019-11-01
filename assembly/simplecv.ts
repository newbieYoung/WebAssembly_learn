export const INT8ARRAY_ID = idof<Int8Array>()

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

  constructor(data: Array<i8>, rows: i32, cols: i32, len: i8) {
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

/**
 * 卷积
 * @param mat 矩阵
 * @param ker 卷积
 */
export function convolution(
  mat: Array<i8>,
  matRows: i32,
  matCols: i32,
  ker: Array<i8>,
  kerRows: i32,
  kerCols: i32
): i32[] {
  //初始化数据
  let len: i8 = 4
  let matMat = new CvMat(mat, matRows, matCols, len)
  let kerMat = new CvMat(ker, kerRows, kerCols, len)

  //暂不考虑非奇数尺寸卷积核
  if (kerMat.rows % 2 != 1 || kerMat.cols % 2 != 1) {
    return []
  }

  let result: i8[] = []
  let cRow: i32 = (kerMat.rows - 1) / 2 //卷积核中心
  let cCol: i32 = (kerMat.cols - 1) / 2

  //一般而言卷积核所有元素之和等于1；否则大于1时生成的图片亮度会增加，小于1时生成的图片亮度会降低
  let eles: i8[] = []
  let sums: i32[] = [0, 0, 0, 0]
  for (let z: i8 = 0; z < len; z++) {
    for (let i: i32 = 0; i < kerMat.rows; i++) {
      for (let j: i32 = 0; j < kerMat.cols; j++) {
        let no: i32 = i * kerMat.rows * len + j * len
        sums[z] += kerMat.data[no + z]
        eles[no + z] = kerMat.data[no + z]
      }
    }
  }
  return sums
  // let keles: f32[] = []
  // for (let z: i8 = 0; z < len; z++) {
  //   for (let i: i32 = 0; i < kerMat.rows; i++) {
  //     for (let j: i32 = 0; j < kerMat.cols; j++) {
  //       let no: i32 = i * kerMat.rows * len + j * len
  //       keles[no + z] = <f32>(eles[no + z] / sums[z])
  //     }
  //   }
  // }

  //卷积计算
  // for (let r: i32 = 0; r < matMat.rows; r++) {
  //   for (let c: i32 = 0; c < matMat.cols; c++) {
  //     let rs: i32 = r - cRow
  //     let cs: i32 = c - cCol
  //     let noCur: i32 = r * matMat.rows * len + c * matMat.cols
  //     for (let z: i8 = 0; z < len; z++) {
  //       let sum: f32 = 0
  //       if (z == len - 1) {
  //         //透明通道不参与计算
  //         sum = <f32>matMat.data[noCur + z]
  //       } else {
  //         for (let i: i32 = 0; i < kerMat.rows; i++) {
  //           for (let j: i32 = 0; j < kerMat.cols; j++) {
  //             let r1: i32 = rs + i
  //             let c1: i32 = cs + j

  //             let n1: i32 = r1 * matMat.rows * len + c1 * len
  //             let v1: i8 = matMat.data[n1 + z]
  //             v1 = v1 == null ? 0 : v1 //超出范围使用常量0代替

  //             let r2: i32 = kerMat.rows - 1 - i //卷积核旋转180度
  //             let c2: i32 = kerMat.cols - 1 - j

  //             let n2: i32 = r2 * kerMat.rows + c2 * len
  //             let v2: f32 = eles[n2 + z]

  //             sum += v1 * v2
  //           }
  //         }
  //       }
  //       result[noCur + z] = <i8>sum
  //     }
  //   }
  // }

  //return result
}
