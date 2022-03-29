const type = ['指挥司索', '塔吊司机', '施工电梯司机', '建筑电工', '汽车吊司机', '履带吊司机', '其他']
const res = type.map((cur, index) => {
  return {value: cur === '其他' ? '99' : String(index), label: cur}
})
export default res

