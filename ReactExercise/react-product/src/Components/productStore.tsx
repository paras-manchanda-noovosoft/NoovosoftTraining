import {action, makeObservable, observable} from "mobx";
// @ts-ignore
 import {IFetchData, IProduct} from "./home";
import Profile from "./profile";

class ProductStore {
    productDetail: IProduct[] = [];
    categoryList: string []= [];
    fetchUrl: string = "https://dummyjson.com/products";
    baseProductUrl: string = 'https://dummyjson.com/products';
    cartItemsCount: number = 0;
    user: string = "";
    searchBoxData: string = "";
    searchBaseUrl: string = 'https://dummyjson.com/products/search?q=';

    constructor() {
        makeObservable(this, {
            productDetail: observable,
            categoryList: observable,
            fetchUrl: observable,
            cartItemsCount: observable,
            user: observable,
            searchBoxData: observable,
            fetchUserDetails: action,
            fetchProductDetails: action,
            fetchCategoryList: action,
        });
    }

    fetchUserDetails = async () => {
        const response = await fetch('https://dummyjson.com/users/5');
        const userdata = await response.json();
        this.user = userdata["firstName"] + " " + userdata["maidenName"];
    };

    fetchProductDetails = async () :Promise<void>  => {
        const response = await fetch(this.fetchUrl);
        const productData = await response.json();
        this.productDetail = productData["products"].map((data: IFetchData) => {
            return ({
                product_name: data.title,
                product_tags: data.tags,
                description: data.description,
                category: data.category,
                price: data.price,
                discount: data.discountPercentage,
                thumbnail: data.thumbnail,
                rating: data.rating,
                id: data.id
            });
        });
    };

    fetchCategoryList=async () =>{
        try {
            const response = await fetch('https://dummyjson.com/products/category-list');
            const categoryData=await response.json();
            categoryData.push('All');
            this.categoryList= await response.json();
        } catch (error) {
            console.error('Error fetching category list:', error);
        }
    }
}

export default new ProductStore();