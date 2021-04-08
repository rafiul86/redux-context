


const reducer = (state = 0, action)=>{
    switch(action.type){
        case 'plus' :
            return state + action.payload
            case 'minus' : 
            return state - action.payload
            case 'reset' :
            return 0
            default : 
            return state
    }
}
export default reducer;