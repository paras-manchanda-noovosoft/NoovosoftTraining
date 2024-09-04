import {autorun, action, computed, makeObservable,observable} from 'mobx';
import {IProduct} from "./home";
import {observer} from "mobx-react";

interface ICartType{
    productDetail : IProduct,
    isCart        : boolean
}


class CartStore {
    cartStoreDetails : ICartType[]=[];

    constructor() {
        makeObservable(this,
            {
                cartStoreDetails : observable,
                addToCart: action,
                deleteFromCart : action,
                checkCart   : action ,
                length      : action
            });
        autorun(()=>{
            console.log("store length is : " ,this.cartStoreDetails.length);
            this.cartStoreDetails.map( (data : ICartType)=> {
                console.log(data.productDetail["product_name"]);
            });
        });
    }
    addToCart(item : IProduct){
        this.cartStoreDetails.push(
            {
                productDetail: item,
                isCart: true
            });
    }
    deleteFromCart(id : number){
         this.cartStoreDetails=this.cartStoreDetails.filter((data : ICartType)=> data["productDetail"].id !== id);
    }

    checkCart(id : number) : boolean{
        return this.cartStoreDetails.some((item : ICartType) => item.productDetail.id === id)
    }

    length() :number{
        return this.cartStoreDetails.length;
    }
}

const cartStore=new CartStore();
export default cartStore;
