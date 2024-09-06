import {action, computed, makeObservable, observable, toJS} from 'mobx';
import {IProduct} from "../types/productTypes";
import {ICartType} from "../types/cartTypes";

class Cartstore {
    cartStoreDetails: ICartType[] = [];

    constructor() {
        makeObservable(this,
            {
                cartStoreDetails: observable,
                addToCart: action,
                deleteFromCart: action,
                setCheckCart: action,
                length: action,
                cartDetails: computed
            });
        const storedCartDetails: string | null = localStorage.getItem('cart_details');

        if (storedCartDetails !== null) {
            this.cartStoreDetails = JSON.parse(storedCartDetails) as ICartType[];
        }
    }

    addToCart(item: IProduct) {
        this.cartStoreDetails.push(
            {
                productDetail: item,
                isCart: true
            });
        localStorage.setItem('cart_details', JSON.stringify(this.cartStoreDetails));
    }

    get cartDetails(): ICartType[] {
        return toJS(this.cartStoreDetails);
    }

    deleteFromCart(id: number) {
        this.cartStoreDetails = this.cartStoreDetails.filter((data: ICartType) => data["productDetail"].id !== id);
        localStorage.setItem('cart_details', JSON.stringify(this.cartStoreDetails));
    }

    setCheckCart(exp: boolean, id: number): void {
        this.cartStoreDetails[id].isCart = exp;
    }

    length(): number {
        return this.cartStoreDetails.length;
    }
}

export default Cartstore;
