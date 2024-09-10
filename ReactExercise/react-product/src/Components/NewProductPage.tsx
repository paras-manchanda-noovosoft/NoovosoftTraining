import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import NewProductFormValidation from './NewProductFormValidation';
import {useLocation, useNavigate} from 'react-router-dom';
import ProductStore from './ProductStore';
import CategoryDropDown from './CategoryDropDown';
import {IProduct} from "../types/productTypes";
import {runInAction} from "mobx";

const newProductStore = new NewProductFormValidation();

const NewProductPage = observer(({productStore}: { productStore: ProductStore }) => {


    useEffect(() => {
        if (product !== undefined) {
            newProductStore.setNewProductDetails(product);
        } else {
            newProductStore.newProduct = {
                product_name: "",
                product_tags: [],
                description: "",
                category: "",
                price: 0,
                discount: 0,
                thumbnail: "https://picsum.photos/id/0/5000/3333",
                rating: 0,
                id: 0
            };
        }
    }, []);
    const navigate = useNavigate();
    const location = useLocation();
    const productId = location.state?.productId;
    const isEditMode: boolean = !!productId;
    const index: number = productStore.productsDetails.findIndex(product => product.id === productId);
    const product: IProduct = productStore.productsDetails[index];


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newProductStore.isFormValid()) {
            if (isEditMode) {
                newProductStore.newProduct.id = productId;
                newProductStore.updateProduct();
                productStore.productsDetails[index] = newProductStore.newProduct;
            } else {
                newProductStore.setAddProduct();
                productStore.productsDetails.push(newProductStore.newProduct);
            }
            navigate('/');
        }
    };

    const handleCategoryChange = (category: string): void => {
        newProductStore.newProduct.category = category;
    };

    return (
        <div className="add-cart-page">
            <h2>{isEditMode ? 'Edit Product' : 'Add a New Product'}</h2>
            <form onSubmit={handleSubmit} className="add-form">
                <div>
                    <label>Name:</label>
                    <input type="text" name="product_name"
                           onChange={(e) => runInAction(() => newProductStore.setProductName(e.target.value))} required
                           value={newProductStore.newProduct.product_name}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <CategoryDropDown categoryData={productStore.categoryList} onSelect={handleCategoryChange}
                     value ={newProductStore.newProduct.category}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="product_price" required
                           value={newProductStore.newProduct.price}
                           onChange={(e) => (newProductStore.newProduct.price = +e.target.value)}/>
                </div>
                <div>
                    <label>Discount Price:</label>
                    <input type="number" name="product_discount_price" required
                           value={newProductStore.newProduct.discount}
                           onChange={(e) => (newProductStore.newProduct.discount = +e.target.value)}/>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        style={{
                            textAlign: 'left',
                            verticalAlign: 'top',
                            wordWrap: 'break-word',
                            width: "93%",
                            height: "200px",
                            padding: "20px",
                            fontSize: "20px"
                        }}
                        name="product_description"
                        required
                        value={newProductStore.newProduct.description}
                        onChange={(e) => runInAction(() => (newProductStore.newProduct.description = e.target.value))}
                    />
                </div>
                <div>
                    <input type="submit" value={isEditMode ? 'Update Product' : 'Add Product'}/>
                </div>
            </form>
            {newProductStore.formChecked && newProductStore.errors.length > 0 &&
                <>
                    {newProductStore.errors.map((err, index) => {
                        return <p key={index}>{err}</p>;
                    })}
                </>
            }
        </div>
    );
});

export default NewProductPage;
