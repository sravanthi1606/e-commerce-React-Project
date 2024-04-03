import axios from "axios"

export const fetchProductsSuccess = (product) => {
    return {
        type: "PRODUCT_SUCCESS",
        payload: product
    }
};

export const fetchProductsFailure = (error) => {
    return {
        type: "PRODUCT_FAILURE",
        payload: error
    }
};


export const fetchProduct = (id) => {
    return function (dispatch) {
        axios.get(`https://products-9fsh.onrender.com/products/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(fetchProductsSuccess(response.data))
                }
                else {
                    dispatch(fetchProductsSuccess(response.statusMessage))
                }
            })
            .catch((error) => {
                dispatch(fetchProductsFailure(error.message));
            })
    }
}



export const addToWishlist = (productId) => ({
    type: "ADD_TO_WISHLIST",
    payload: productId,
});

export const removeFromWishlist = (productId) => ({
    type: "REMOVE_FROM_WISHLIST",
    payload: productId,
});


export const clearCart = () => ({
    type: "CLEAR_CART"
});

export const addCart = (product) => {
    return {
        type: "ADDITEM",
        payload: product,
    }
}



export const delCart = (product) => {
    return {
        type: "DELITEM",
        payload: product,
    }
}

export const setErrorMessage = (message) => ({
    type: "SET_ERROR_MESSAGE",
    payload: message
});


export const updateCartItemQuantity = (productId, newQuantity) => ({
    type: "UPDATE_CART_ITEM_QUANTITY",
    payload: { productId, newQuantity }
});


export const incrementQuantity = (productId) => ({
    type: "INCREMENT_QUANTITY",
    payload: productId
});

export const decrementQuantity = (productId) => ({
    type: "DECREMENT_QUANTITY",
    payload: productId
});




export const fetchProductSuccess = (products) => {
    return {
        type: "FECTH_PRODUCTS_SUCCESS",
        payload: products,
    }
}
export const fetchProductFailure = (error) => {
    return {
        type: "FECTH_PRODUCTS_FAILURE",
        payload: error,
    }
}

export const fetchProducts = () => {
    return function (dispatch) {
        axios.get("https://products-9fsh.onrender.com/products")
            .then((response) => {
                if (response.status === 200) {
                    dispatch(fetchProductSuccess(response.data))
                }
                else {
                    dispatch(fetchProductSuccess(response.statusMessage))
                }
            })
            .catch((error) => {
                dispatch(fetchProductFailure(error.message));
            })
    }
}



export const DeleteProducts = (productId) => {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`https://products-9fsh.onrender.com/products/${productId}`)

            if (response.status === 200) {
                dispatch({
                    type: "DELETE_PRODUCT",
                    payload: productId
                })
                
            }
        } catch (error) {
            console.error("Error Deleting product:", error);
        }
    };
};





export const AddingProducts = (data) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`https://products-9fsh.onrender.com/products`, data);
            if (response.status === 200) {
                dispatch({
                    type: "ADD_PRODUCT",
                    payload: data
                });
               
            }
        } catch (error) {
            console.error("Error Adding product:", error);
        }
    };
};


export const EditProducts = (data,id) => {
    return async function (dispatch) {
        try {
            const response = await axios.put(`https://products-9fsh.onrender.com/products/${id}`, data)

            if (response.status === 200) {
                dispatch({
                    type: "EDIT_UPDATE_PRODUCT",
                    payload: data
                })
            }
        } catch (error) {
            console.error("Error Editing product:", error);
        }
    };
};


















// export const AddingProducts = (data) => {
//     return  function (dispatch) {
//        axios.post(`https://products-9fsh.onrender.com/products`, data)
//             .then(() => {
//                 dispatch({
//                     type: "ADD_PRODUCT",
//                     payload: data
//                 })
//             })
//             // .then((response) => {
//             //     if (response.status === 200) {
//             //         // dispatch(fetchProductSuccess(response.data))
//             //         dispatch({
//             //                     type: "ADD_PRODUCT",
//             //                     payload: data
//             //                 })
//             //     }
                
//             // })
//             .catch((error) => {
//                 console.error("Error Adding product:", error);
//             })
//     }
// }


// export const EditProducts = (data, id) => {
//     return function (dispatch) {
//         axios.put(`https://products-9fsh.onrender.com/products/${id}`, data)
//             .then(() => {
//                 dispatch({
//                     type: "EDIT_UPDATE_PRODUCT",
//                     payload: data
//                 })
//             })
//             .catch((error) => {
//                 console.error("Error Adding product:", error);
//             })
//     }
// }




// export const DeleteProducts = (productId) => {
//     return function (dispatch) {
//         axios.delete(`https://products-9fsh.onrender.com/products/${productId}`)
//             .then(() => {
//                 dispatch({
//                     type: "DELETE_PRODUCT",
//                     payload: productId
//                 })
//             })
//             .catch((error) => {
//                 console.error("Error deleting product:", error);
//             })
//     }
// }


 // Dispatch an action to indicate that product has been added
                // dispatch({
                //     type: "PRODUCT_ADDED_SUCCESSFULLY",
                //     payload: data
                // });