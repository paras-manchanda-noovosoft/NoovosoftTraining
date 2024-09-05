import {makeAutoObservable} from 'mobx';
import {IFetchData, IProduct} from "./interfaces";

class ProductStore {
    productsDetails: IProduct[] = [];
    categoryList: string[] = [];
    userUrl: string = 'https://dummyjson.com/users/5';
    user: string = '';
    fetchUrl: string = 'https://dummyjson.com/products';
    search: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    async fetchUsers() {
        try {
            const response = await fetch(this.userUrl);
            return await response.json();
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    async fetchProductDetails() {
        try {
            const response = await fetch(this.fetchUrl);
            const productData = await response.json();
            const productInventory: IProduct[] = productData["products"].map((data: IFetchData) => {
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
                })
            });
            return productInventory;
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    async setProductDetails() {
        try {
            const result = await this.fetchProductDetails();
            if (!result) {
                throw new Error("error");
            }

            const product_detail_last = localStorage.getItem('last_product_detail');
            if (product_detail_last === null) {
                localStorage.setItem('last_product_detail', JSON.stringify(result));
            }

            this.productsDetails = result;
        } catch (e) {
            console.log(e);
        }
    }

    async setUserDetails() {
        try {
            const data = await this.fetchUsers();
            if (!data) {
                throw new Error("error")
            }
            const user = localStorage.getItem("user");
            localStorage.setItem('user', this.user);
            this.user = data["firstName"] + " " + data["maidenName"];
        } catch (e) {
            console.log(e);
        }
    }

    async fetchCategoryDetails() {
        try {
            const response = await fetch('https://dummyjson.com/products/category-list');
            return await response.json();
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    async setCategoryDetails() {
        try {
            const data = await this.fetchCategoryDetails();
            if (!data) {
                throw new Error("error")
            }
            data.splice(0, 0, 'all');
            console.log(data);
            this.categoryList = data;
        } catch (e) {
            console.log(e);
        }
    }

    setSearchBoxData(text: string) {
        this.search = text;
    }

    setFetchUrl(url: string) {
        this.fetchUrl = url;
    }
}

export default ProductStore;
