import cartStore from "./cartstore";
import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {IProduct} from "./home";


const Profile = observer( ({product, cartItemsCount}: {product : IProduct,cartItemsCount : React.Dispatch<React.SetStateAction<number>>}) => {
    const [isInCart,setIsInCart] = useState<boolean>(cartStore.checkCart(product.id));
    // @ts-ignore
    const handleAddCart=(e : MouseEvent<HTMLButtonElement>) => {
        cartStore.addToCart(product);
        setIsInCart(true);
        cartItemsCount(cartStore.length());
    }

    // @ts-ignore
    const handleDeleteCart=(e : MouseEvent<HTMLButtonElement>) => {
        cartStore.deleteFromCart(product.id);
        setIsInCart(false);
        cartItemsCount(cartStore.length());
    }
    return (
        <>
            <div className="product-item">
                <img src={product.thumbnail} alt={product.product_name} className="product-thumbnail"/>
                <div className="product-details">
                    <h4>
                        {product.product_name} (
                        {product.product_tags.map((tag, index) => (
                            <span style={{paddingLeft: '7px'}} key={index}>{tag}</span>
                        ))}
                        )
                    </h4>
                    <p>Price: ${product.discount} <span className="original-price">(${product.price})</span></p>
                    <p>Category: {product.category}</p>
                    <p>{product.description}</p>
                    <p>Rating: {product.rating}</p>
                    {isInCart? (
                        <button className="add-cart remove-cart" onClick={handleDeleteCart}>
                            Remove from Cart
                        </button>
                    ) : (
                        <button className="add-cart" onClick={handleAddCart}>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </>
    )
});

export {cartStore};

export default Profile;