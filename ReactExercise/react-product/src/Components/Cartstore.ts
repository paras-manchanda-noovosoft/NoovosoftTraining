import {action, computed, makeObservable, observable, toJS} from 'mobx';
import {IProduct} from "./interfaces";
import {ICartType} from "./interfaces";

class CartStore {

    // @ts-ignore
    cartStoreDetails: ICartType[] = JSON.parse(localStorage.getItem('cart_details'));
    constructor() {
        makeObservable(this,
            {
                cartStoreDetails: observable,
                addToCart: action,
                deleteFromCart: action,
                checkCart: action,
                setCheckCart : action,
                length: action,
                cartDetails: computed
            });
    }

    addToCart(item: IProduct) {
        this.cartStoreDetails.push(
            {
                productDetail: item,
                isCart: true
            });

        localStorage.setItem('cart_details',JSON.stringify(this.cartStoreDetails));
    }

    get cartDetails(): ICartType[] {
        return toJS(this.cartStoreDetails);
    }

    deleteFromCart(id: number) {
        this.cartStoreDetails = this.cartStoreDetails.filter((data: ICartType) => data["productDetail"].id !== id);
        localStorage.setItem('cart_details',JSON.stringify(this.cartStoreDetails));
    }

    checkCart(id: number): boolean {
        return this.cartStoreDetails.some((item: ICartType) => item.productDetail.id === id)
    }

    setCheckCart(exp: boolean, id: number): void {
        this.cartStoreDetails[id].isCart = exp;
    }

    length(): number {
        return this.cartStoreDetails.length;
    }
}

export default CartStore;
