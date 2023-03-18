const deepCopy = (obj: Record<string, any>) => {
    const originObj = Array.isArray(obj) ? obj : [obj]
    const result = []
    for(const item of originObj) {
        const newItem = _deepCopy(item)
        result.push(newItem)
    }
    return result
}

const _deepCopy = (obj: Record<string, any>) => {
        if( typeof obj !== 'object') {
            return obj
        }

        if(!obj) {
            return obj
        }

        let newObj = {}
        for(const key of Object.keys(obj)) {
             const value = obj[key]
             if(typeof value !== 'object'){
                newObj[key] = value
                continue
             }
             const newValueList =  Array.isArray(value) ? value : [value]
             newObj[key] = deepCopy(newValueList)
        }

        return newObj
}

// const test = [1,2]
const test = {'a': '123', b: [1,2]}

const result = deepCopy(test)

console.log("result ", result)