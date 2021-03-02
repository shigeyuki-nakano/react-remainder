const nullToUndefined = (obj: {[key: string]: any}): {[key: string]: any} => {
    const _obj = obj as any;
    let newObj = {}
    Object.keys(obj).forEach((key) => {
        Object.assign(newObj, {[key]: _obj[key] || undefined})
    })

    return newObj;
}

export default nullToUndefined;