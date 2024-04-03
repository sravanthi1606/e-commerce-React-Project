const initialState = {
    cart: [],
    errorMessage:""
};

export const CartReducer = (state = initialState, action) => {

    switch (action.type) {

        case "ADDITEM":
            const productToAdd = action.payload;
            const existingProductIndex = state.cart.findIndex((products) => products.id === productToAdd.id);

            if (existingProductIndex !== -1) {
                const updatedCart = state.cart.map((products, index) =>
                    index === existingProductIndex ? { ...products, qty: products.qty  } : products

                );

                return {
                    ...state,
                    cart: updatedCart
                };
            } 
            else {
                return {
                    ...state,
                    cart: [...state.cart, { ...productToAdd, Originalqty: productToAdd.qty }]
                };
            }

        case "DELITEM":
            const productToRemove = action.payload;
            const existingProduct = state.cart.find((product) => product.id === productToRemove.id);
            if (!existingProduct) {
                return state;
            }
            if (existingProduct.qty >= 1) {
                return {
                    ...state,
                    cart: state.cart.filter((product) => product.id !== productToRemove.id)
                };
            }


            case "UPDATE_CART_ITEM_QUANTITY":
                const { productId, newQuantity } = action.payload;
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === productId ? { ...item, qty: newQuantity, Originalqty: newQuantity } : item
                    )
                };


        case "INCREMENT_QUANTITY":
            
            const incProductId = action.payload;
            const productToIncrement = state.cart.find((product) => product.id === incProductId);
            if (productToIncrement && productToIncrement.qty < productToIncrement.Originalqty) {
                return {
                    ...state,
                    cart: state.cart.map((product) =>
                        product.id === incProductId ? { ...product, qty: product.qty + 1 } : product
                    ),
                };
            } 

            else {
                return state;
                
            }
        

        case "DECREMENT_QUANTITY":
            const decProductId = action.payload;
            return {
                ...state,
                cart: state.cart.map((product) =>
                    product.id === decProductId && product.qty > 1 ? { ...product, qty: product.qty - 1 } : product
                ),
            }

        case "SET_ERROR_MESSAGE":
            return {
                ...state,
                errorMessage: action.payload
            }

        case "CLEAR_CART":
            return {
                ...state,
                cart: []
            };

        default:
            return state;
    }
};
