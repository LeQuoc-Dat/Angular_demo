import { createAction, props } from "@ngrx/store"
import {Cart, Product} from '../../shared/models/carts.model'


export const loadCart = createAction('[Cart] Load Cart')
export const loadCartSuccess = createAction('[Cart] Load Cart Success', props<{cart: Cart|null}>())
export const setCart = createAction('[Cart] Set Cart', props<{cart: Cart}>())
export const removeCart = createAction('[Cart] Remove Cart',props<{id: number}>())
export const addItemToCart = createAction('[Cart] Add Item To Cart', props<{product: Product}>())
export const removeItemFromCart = createAction('[Cart] Remove Item From Cart', props<{id: number}>())
export const updateCartStatus =  createAction('[Cart] Update Cart Status')
export const updateProductQuanlity =  createAction('[Cart] Update Product Quantity', props<{id: number, quantity: number}>())
export const productQuantityIncr =  createAction('[Cart] Product Quantity Increase', props<{id: number}>())
export const productQuantityDecr =  createAction('[Cart] Product Quantity Decrease', props<{id: number}>())
