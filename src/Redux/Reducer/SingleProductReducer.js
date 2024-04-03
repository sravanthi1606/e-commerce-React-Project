const initialState = {
    products: [],
    error: ""
  };
  
 export const SingleProductReducer = (state = initialState, action) => {
    switch (action.type) {

      case "PRODUCT_SUCCESS":
        return {
          ...state,
          products: action.payload,
          error: ""
        };
      case "PRODUCT_FAILURE":
        return {
          ...state,
          products: [],
          error: action.payload
        };
      default:
        return state;
    }
  };
  
