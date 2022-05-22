import { 
    ALL_PRODUCT_FAIL, 
    ALL_PRODUCT_REQUEST, 
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from "../constants/productContants";

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                product: []
            };
        case ALL_PRODUCT_SUCCESS: 
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productCount,
                resPerPage: action.payload.resPerPage,
                filterProductCount: action.payload.filterProductCount
            };
        case ALL_PRODUCT_FAIL: 
            return {
                loading: false,
                error: action.payload.errors
            };

        case CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

export const productDetailsReducer = (state = { product : {}}, action) => {
   
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST: 
            return {
                ...state,
                loading: true,
            }
        
        case PRODUCT_DETAILS_SUCCESS: 
            return {
                loading: false,
                product: action.payload
            }    

        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error: null
            }
        case CLEAR_ERRORS : 
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export {
    
}
