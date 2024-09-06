import React from 'react';
import { observer } from 'mobx-react';
import NewProductComponent from "./NewProductComponent";
import NewProductStore from "./NewProductStore";

const newProductStore=new NewProductStore();
const NewProductPage = observer(() => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        newProductStore.isFormValid();
    };

    return (
        <div className="add-cart-page">
            <h2>Add a New Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="product_name" onChange={(e) => (newProductStore.product_name = e.target.value)}required/>

                </div>
                <div>
                    <label>Category:</label>
                    <input type="text" name="product_category" required onChange={(e) => (newProductStore.product_category = e.target.value)}/>
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="product_price" required onChange={(e) => (newProductStore.product_price = +e.target.value)}/>
                </div>
                <div>
                    <label>Discount Price:</label>
                    <input type="number" name="product_discount_price" required onChange={(e) => (newProductStore.product_discountPrice = +e.target.value)}/>
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" name="product_description" required onChange={(e) => (newProductStore.product_description = e.target.value)}/>
                </div>

                <div>
                    <input type="submit"/>
                </div>
            </form>

            {newProductStore.errors.length == 0 && newProductStore.formChecked &&
                <>
                <p>Data Rendered Successfully</p>
                <NewProductComponent />
                </>
            }

        </div>
    )
});

export default NewProductPage;
