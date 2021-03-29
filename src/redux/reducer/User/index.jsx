export const User=(state={},action)=>{
    switch (action.type) {
        case 'Login':return {...action.payload}
        case 'Auth':return {...action.payload}
        default:return state
    }
}