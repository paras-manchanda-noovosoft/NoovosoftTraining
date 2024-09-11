import {makeAutoObservable} from "mobx";
import {IProduct} from "../types/productTypes";

class NewProductFormValidation {
        newProduct: IProduct = {
        product_name: "",
        product_tags: [],
        description: "",
        category: "",
        price: 0,
        discount: 0,
        thumbnail: "https://picsum.photos/id/0/5000/3333",
        rating: 0,
        id: 0,
        isDeleted: false
    };
    errors: string[] = [];
    formChecked: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setNewProductDetails(product: IProduct) {
        this.newProduct.product_name = product.product_name;
        this.newProduct.id = product.id;
        this.newProduct.description = product.description;
        this.newProduct.price = product.price;
        this.newProduct.discount = product.discount;
        this.newProduct.thumbnail = product.thumbnail;
        this.newProduct.rating = product.rating;
        this.newProduct.category = product.category;
    }

    setProductName(str: string) {
        this.newProduct.product_name = str;
    }

    validateForm() {
        this.errors = [];
        if (this.newProduct.price <= 0) {
            this.errors.push("Please enter a price greater than zero.");
        }
        if (this.newProduct.discount <= 0) {
            this.errors.push("Please enter a discounted price greater than zero.");
        }
        if (this.newProduct.discount > this.newProduct.price) {
            this.errors.push("Discounted price must be less than or equal to the price.");
        }
        this.formChecked = true;
    }

    isFormValid() {
        this.validateForm();
        return this.errors.length === 0;
    }

    setAddProduct() {
        const item = localStorage.getItem('idNumber');
        if (item === null) {
            this.newProduct.id = 40;
            localStorage.setItem('idNumber', JSON.stringify(this.newProduct.id));
        } else {
            this.newProduct.id = +item + 1;
            localStorage.setItem('idNumber', JSON.stringify(this.newProduct.id));
        }
        this.saveProductToLocalStorage(0);
    }

    updateProduct() {
        this.saveProductToLocalStorage(1);
    }

    saveProductToLocalStorage(id: number) {
        const existingProducts = localStorage.getItem('products');
        const products = existingProducts ? JSON.parse(existingProducts) : [];
        if (id === 0) {
            products.push(this.newProduct);
        } else {
            const checkIndex = products.findIndex((product: IProduct) => product.id === this.newProduct.id);
            if (checkIndex > -1) {
                products[checkIndex] = this.newProduct;
            } else {
                products.push(this.newProduct);
            }
        }
        localStorage.setItem('products', JSON.stringify(products));
    }
}

export default NewProductFormValidation;
