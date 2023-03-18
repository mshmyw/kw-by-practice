
// // 思路： 分而治之
// const deepCopy = (obj: Record<string, any>) => {
//     const originObj = Array.isArray(obj) ? obj : [obj]
//     const result = []
//     for(const item of originObj) {
//         const newItem = _deepCopy(item)
//         result.push(newItem)
//     }
//     return result
// }

// const _deepCopy = (obj: Record<string, any>) => {
//         if( typeof obj !== 'object') {
//             return obj
//         }

//         if(!obj) {
//             return obj
//         }

//         let newObj = {}
//         for(const key of Object.keys(obj)) {
//              const value = obj[key]
//              if(typeof value !== 'object'){
//                 newObj[key] = value
//                 continue
//              }
//              const newValueList =  Array.isArray(value) ? value : [value]
//              newObj[key] = deepCopy(newValueList)
//         }

//         return newObj
// }


	//函数拷贝（此方式更简洁） 参考 https://juejin.cn/post/7109843641677398053
    const deepCopy = (obj = {}) => {
        //变量先置空
        let newobj = null;

        //判断是否需要继续进行递归
        if (typeof (obj) == 'object' && obj !== null) {
            newobj = obj instanceof Array ? [] : {};
            //进行下一层递归克隆
            for (var i in obj) {
                newobj[i] = deepCopy(obj[i])
            }
            //如果不是对象直接赋值
        } else newobj = obj;

        return newobj;
    }

// const test = [1,2]
// const test = {'a': '123', b: [1,2]}
const test = {name:'gjf',age:{age:18},a:/\d/,b:function(){},c:undefined}
// TODO: 当前实现对正则和日期仍有问题  https://juejin.cn/post/6844903762788614152
const result = deepCopy(test)

console.log("result ", result)