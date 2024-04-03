import { combineReducers } from "redux";
import {CartReducer} from './CartReducer'
import { ProductReducer } from "./ProductReducer";
import {AddEditDeleteReducer} from "./AddEditDeleteProductAdmin"
import {SingleProductReducer} from "./SingleProductReducer"
import wishlistReducer from "./WishlistReducer";


const rootReducers=combineReducers({
    CartPage : CartReducer,
    ProductPage : ProductReducer,
    DeletePage : AddEditDeleteReducer,
    SingleProduct:SingleProductReducer,
    wishlist : wishlistReducer
})
export default rootReducers;