import React, {useContext} from 'react';
import CartComponent from "./CartComponent";
import {observer} from "mobx-react";
import {ICartType} from "../types/cartTypes";
import {useRouterStore} from "mobx-state-router";
import {RootContext} from "../App";

const Cart = observer(() => {
    const rootStore=useContext(RootContext);
    const productStore=rootStore.productstore;
    const cartStore = rootStore.cartstore;

    const cartLength: number = cartStore.length();
    const cartProduct: ICartType[] = cartStore.cartDetails;
    const routerStore = useRouterStore();

    return (
        <>
            <div className="user-cart-page">
                <h1> Items Selected By the user {productStore.user}</h1>
                <button className="go-back-from-cart" onClick={() => routerStore.goTo('HomePage')}>Go back</button>
            </div>
            {cartLength === 0 ? (
                <p style={{textAlign:"center"}}>There are no items to display</p>
            ) : (
                cartProduct.map((data: ICartType) => {
                    return <CartComponent product={data.productDetail} key={data.productDetail.id}
                                          cartStore={cartStore}/>
                }))
            }
        </>
    );
});

export default Cart;