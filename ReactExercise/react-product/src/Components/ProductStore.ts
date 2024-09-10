import {makeAutoObservable} from 'mobx';
import {IFetchProductData, IProduct} from "../types/productTypes";

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

            const new_added_products = localStorage.getItem('new-products');
            this.productsDetails = [];
            if (new_added_products !== null) {
                JSON.parse(new_added_products).map((new_product: IProduct) => {
                    this.productsDetails.push(new_product);
                })
            }
            result.forEach((product) => {
                this.productsDetails.push(product);
            });

            const deletedProductsList = localStorage.getItem('deleteProducts');
            if (deletedProductsList !== null) {
                const deletedProducts = JSON.parse(deletedProductsList);

                this.productsDetails = this.productsDetails.filter((product: IProduct) => {
                    return !deletedProducts.some((deletedProduct: { id: string }) => +deletedProduct.id === product.id);
                });
            }

            const updatedProductsList=localStorage.getItem('updateProducts');
            if(updatedProductsList !== null){
                const updatedProducts=JSON.parse(updatedProductsList);

                this.productsDetails = this.productsDetails.map(existingProduct => {
                    const updatedProduct = updatedProducts.find((product :IProduct)=> product.id === existingProduct.id);

                    if (updatedProduct) {
                        return {
                            ...existingProduct,
                            ...updatedProduct,
                            tags: existingProduct.product_tags,
                            thumbnail: existingProduct.thumbnail,
                            ratings: existingProduct.rating
                        };
                    }
                    return existingProduct;
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
        const alreadyDeletedProducts = localStorage.getItem('deleteProducts');
        const products = alreadyDeletedProducts ? JSON.parse(alreadyDeletedProducts) : [];
        const obj = this.productsDetails.find((product: IProduct) => product.id === id);
        const alreadyAddedProducts = localStorage.getItem('new-products');
        let addedProducts = alreadyAddedProducts ? JSON.parse(alreadyAddedProducts) : [];

        const newlyAddedProduct = this.productsDetails.find((product: IProduct) => product.id === id);
        if (newlyAddedProduct) {
            addedProducts = addedProducts.filter((addedProduct: IProduct) => addedProduct.id !== id);
            localStorage.setItem('new-products', JSON.stringify(addedProducts));
        }
            // @ts-ignore
            products.push(obj);
            localStorage.setItem('deleteProducts', JSON.stringify(products));
            this.productsDetails = this.productsDetails.filter((product) => product.id !== id);
    }
}
export default ProductStore;
