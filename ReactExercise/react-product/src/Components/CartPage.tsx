import React from 'react';
import CartComponent from "./CartComponent";
import {observer} from "mobx-react";
import {useNavigate} from "react-router-dom";
import {ICartType} from "../types/cartTypes";

const Cart = observer(({cartStore, productStore}: { cartStore: any, productStore: any }) => {
    const cartLength: number = cartStore.length();
    const cartProduct: ICartType[] = cartStore.cartDetails;
    const navigate = useNavigate();
    return (
        <>
            <div className="user-cart-page">
                <h1> Items Selected By the user {productStore.user}</h1>
                <button className="go-back-from-cart" onClick={() => navigate(-1)}>Go back</button>
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