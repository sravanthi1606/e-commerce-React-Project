let initialState = {
    products :[],
    error : "",
};

export const ProductReducer = (state=initialState,action)=>{
    if(action.type === "FECTH_PRODUCTS_SUCCESS"){
        return {
            products : action.payload,
            error:""
        }
    }

    else if(action.type === "FECTH_PRODUCTS_FAILURE"){
        return {
            products : [],
            error:action.payload,
        }
    }
    return state;
}
