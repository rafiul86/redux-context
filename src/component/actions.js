
export const reset = () =>{
    return {
        type : 'reset',
    }
}

export const plus = (a) =>{
    return {
        type : 'plus',
        payload : a
    }
}

export const minus = (a) =>{
    return {
        type : 'minus',
        payload : a
    }
}