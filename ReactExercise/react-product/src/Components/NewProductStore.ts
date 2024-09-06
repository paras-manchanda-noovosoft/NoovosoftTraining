import { makeAutoObservable } from "mobx";

class NewProductStore {
    product_name: string = "";
    product_category: string = "";
    product_price: number = 0;
    product_description: string = "";
    product_discountPrice: number = 0;
    errors: string[] = ['error'];
    formChecked : boolean =false;

    constructor() {
        makeAutoObservable(this);
    }

    validateForm() {
        this.errors = [];
        if (this.product_price <= 0) {
            this.errors.push("Please enter a price greater than zero.");
        }
        if (this.product_discountPrice <= 0) {
            this.errors.push("Please enter a discounted price greater than zero.");
        }
        if (this.product_discountPrice > this.product_price) {
            this.errors.push("Discounted price must be less than or equal to the price.");
        }
        this.formChecked=true;
    }

    isFormValid() {
        this.validateForm();
        return this.errors.length === 0;
    }
}

export default NewProductStore;
