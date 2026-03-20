import { Cart, Product } from "../../shared/models/carts.model";
import { createReducer, on, State } from "@ngrx/store";
import * as CartAction from '../actions/cart.actions'

interface CartState 
{
    cart: Cart|null
}

export const initialState: CartState = {
    cart: null
}

function recalcTotal(cart: Cart)
{
    let total = 0
    let totalProduct = 0
    let totalQuantity = 0
    cart.products.forEach((product: Product) => {
        total += product.discountedTotal
        totalQuantity += product.quantity
        totalProduct ++
     })

    return {...cart, total, totalProduct, totalQuantity}
}

export const cartReducer = createReducer(
    initialState,
    on(CartAction.loadCartSuccess, (state, {cart}) => ({...state, cart} )),
    on(CartAction.setCart, (state, {cart}) => ({...state, cart})),
    on(CartAction.removeCart, (state)=> ({...state, cart: null})),
    on(CartAction.addItemToCart, (state, {product}) => {
        if (!state.cart)
            return state
        const updateCart = recalcTotal({...state.cart,
                                        products: [...state.cart.products, product]});
        return {...state, cart: updateCart}
    }),

    on(CartAction.removeItemFromCart, (state, {id})=>
    {
        if (!state.cart)
            return state
        const updateCart = recalcTotal({...state.cart,
            products: state.cart.products.filter(p => p.id !== id),
        });
        return {...state, cart: updateCart}
    } ),

    on(CartAction.updateProductQuanlity, (state, {id, quantity}) => {
        if (!state.cart)
            return state;
        const products = state.cart.products.map (
            p =>
            {
                if (p.id !== id) return p
                const updateTotal= p.price*p.quantity
                const updatedDiscountedToTal =  (p.price - p.price*p.discountPercentage/100)*quantity
                return {...p, quantity: quantity, total: updateTotal, discountedTotal: updatedDiscountedToTal}
            }
        )
        return {
            ...state,
            cart: recalcTotal({...state.cart, products})
        }
    }),

    on(CartAction.productQuantityIncr, (state, {id}) => {
        if (!state.cart)
            return state
        const productsUpdate = state.cart.products.map(
            p =>(p.id === id)?
                {
                    ...p,
                    quantity: p.quantity + 1,
                    total: p.price * (p.quantity + 1),
                    discountedTotal: (p.price - (p.price * p.discountPercentage) / 100) * (p.quantity + 1),
                }
                : p
        )
        return {
                ...state,
                cart: recalcTotal({...state.cart, products: productsUpdate})
            }
    }),
    on(CartAction.productQuantityDecr, (state, {id}) => {
        if (!state.cart)
            return state
        const productsUpdate = state.cart.products.map(
            p =>(p.id === id)?
                {
                    ...p,
                    quantity: p.quantity - 1,
                    total: p.price * (p.quantity - 1),
                    discountedTotal: (p.price - (p.price * p.discountPercentage) / 100) * (p.quantity - 1),
                }
                : p
        )
        return {
                ...state,
                cart: recalcTotal({...state.cart, products: productsUpdate})
            }
    })
)