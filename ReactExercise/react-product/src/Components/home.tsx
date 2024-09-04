import {useState, useEffect} from 'react';
import * as string_decoder from "node:string_decoder";
// @ts-ignore
import Dropdown from "./dropdown";
import Profile from './profile';
import {cartStore} from "./profile";

export interface IProduct {
    product_name: string,
    product_tags: string[],
    description: string,
    category: string,
    price: number,
    discount: number,
    thumbnail: string,
    rating: number,
    id: number
}

interface IFetchData {
    title: string,
    tags: string[],
    discountPercentage: number,
    description: string,
    category: string,
    price: number,
    thumbnail: string,
    rating: number,
    id: number
}

const Home = () => {
    const [productDetail, setProductDetail] = useState<IProduct []>();
    const [categoryList, setCategoryList] = useState<string[]>();
    const [fetchUrl, setFetchUrl] = useState<string>('https://dummyjson.com/products');
    const baseProductUrl: string = 'https://dummyjson.com/products';
    const [cartItemsCount, setCartItemsCount] = useState<number>(cartStore.length());
    const [user, setUser] = useState<string | null>(null);
    const [searchBoxData, setSearchBoxData] = useState<string | null>(null);
    const searchBaseUrl: string = 'https://dummyjson.com/products/search?q=';

    /* api call for the user */
    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await fetch('https://dummyjson.com/users/5');
            return await response.json();
        }

        fetchUserDetails()
            .then((data) => setUser(data["firstName"] + " " + data["maidenName"]))
            .catch((err) => console.log(err));
    }, []);


    /* api call to fetch the product detail */

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(fetchUrl);
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
                    });
                });
                return productInventory;
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails()
            .then((productInventory)=>{
            setProductDetail(productInventory);
        })
            .catch((err)=>{
                console.log(err);
            })
    }, [fetchUrl]);

    /* api call to fetch the particular category */

    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/category-list');
                const categoryData = await response.json();
                categoryData.push('All');
                setCategoryList(categoryData);
            } catch (error) {
                console.error('Error fetching category list:', error);
            }
        };

        fetchCategoryList();
    }, []);

    /* useEffect created to fetch the particular data whenever a user will type something on the searchbox     */
    useEffect(() => {
        searchBoxData !== null && setTimeout(() => {
            setFetchUrl(`${searchBaseUrl}${searchBoxData}`);
        }, 2000);
    }, [searchBoxData]);

    /* function to get the category selected url */

    const handleCategoryChange = (category: string) => {
        if (category === 'All') {
            setFetchUrl(baseProductUrl);
        } else {
            const newUrl: string = baseProductUrl + "/category/" + category;
            setFetchUrl(newUrl);
        }
    };

    /* function to extract the data in the search box */
    const handleSearchData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBoxData(e.target.value);
    }

    return (
        <>
            <div className="search-bar">
                <input type="text" placeholder="Search ..." className="search-box" onChange={handleSearchData}/>
                {categoryList !==undefined && <Dropdown categoryData={categoryList} onSelect={handleCategoryChange}/>}
                <div className="user-cart">
                    <p>{user}</p>
                    <button className="user-cart-quantity-button"> User Cart {cartItemsCount} </button>
                </div>
            </div>
            {productDetail !== undefined && productDetail.map((product: IProduct, ind: number) => {
                return <Profile product={product} key={product.id} cartItemsCount={setCartItemsCount}/>
            })}
        </>
    );
};

export default Home;