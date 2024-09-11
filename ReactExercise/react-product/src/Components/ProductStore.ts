import {makeAutoObservable} from 'mobx';
import {IFetchProductData, IProduct} from "../types/productTypes";
import product from "./Product";

class ProductStore {
    categoryList: string[] = [];
    userUrl: string = 'https://dummyjson.com/users/5';
    user: string = '';
    fetchUrl: string = 'https://dummyjson.com/products';
    search: string = "";
    productsDetails: IProduct[] = [];


    constructor() {
        makeAutoObservable(this);
    }

    async fetchUsers() {
        try {
            const response = await fetch(`${this.userUrl}`, {method: 'GET'});
            return await response.json();
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    async fetchProductDetails() {
        try {
            const response = await fetch(this.fetchUrl, {method: 'GET'});
            const productData = await response.json();
            const productInventory: IProduct[] = productData["products"].map((data: IFetchProductData) => {
                return ({
                    product_name: data.title,
                    product_tags: data.tags,
                    description: data.description,
                    category: data.category,
                    price: data.price,
                    discount: data.discountPercentage,
                    thumbnail: data.thumbnail,
                    rating: data.rating,
                    id: data.id,
                    isDeleted: false
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

            const new_added_products = localStorage.getItem('products');
            const existingProducts = new_added_products ? JSON.parse(new_added_products) : [];
            this.productsDetails = [];
            const productsToAdd = result.filter((product) => {
                const existingProduct = existingProducts.find((prod: IProduct) => prod.id === product.id);
                if (existingProduct && existingProduct.isDeleted === false) {
                    product = existingProduct;
                    return product;
                }
                return !existingProduct || (existingProduct && existingProduct.isDeleted !== true);
            });

            this.productsDetails.push(...productsToAdd);

            if (existingProducts) {
                existingProducts.forEach((new_product: IProduct) => {
                    if (!new_product.isDeleted) {
                        const ind = this.productsDetails.findIndex((product: IProduct) => product.id === new_product.id);
                        if (ind === -1) {
                            this.productsDetails.splice(0, 0, new_product);
                        } else {
                            this.productsDetails[ind] = new_product;
                        }
                    }
                });
            }

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

    deleteProduct(id: number) {

        const newlyProducts = localStorage.getItem('products');
        const productsList = newlyProducts ? JSON.parse(newlyProducts) : [];
        const index = productsList.findIndex((product: IProduct) => product.id === id);

        if (index > -1) {
            productsList.splice(index, 1);
        } else {
            const ind = this.productsDetails.findIndex((product) => product.id === id);
            this.productsDetails[ind].isDeleted = true;
            productsList.push(this.productsDetails[ind]);
        }
        localStorage.setItem('products', JSON.stringify(productsList));
        this.productsDetails = this.productsDetails.filter((product) => product.id !== id);
    }
}

export default ProductStore;
