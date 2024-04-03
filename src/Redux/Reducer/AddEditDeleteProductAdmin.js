let initialState = {
    products: []
};

export const AddEditDeleteReducer = (state = initialState, action) => {
    switch (action.type) {

        case "ADD_PRODUCT" : 
        return {
            ...state,
            products: [...state.products, action.payload]
        };


        case "EDIT_UPDATE_PRODUCT":
            const updatedProducts = state.products.map((product) =>
                product.id === action.payload.id ? action.payload : product
            );
            return {
                ...state,
                products: updatedProducts
            };

        case "DELETE_PRODUCT":
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload)
            };
        
        default:
            return state;
    }
};