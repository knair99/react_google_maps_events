
export default (state = {
}, action) => {
    switch(action.type){
        case 'add':
            return action.data;
        default:
            return state;
    }
}