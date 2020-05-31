function demo(){
    return {"name":"张三","age":21}
}
var {name,age} = demo();

let str = `我叫 ${name}，今年${age}`

console.log(str);

const obj = {
    a: 1,
    b: 3,
}
const obj2 = {
    ...obj,
    b: 2,
}
