// import React,{useState, useEffect} from 'react';
// import * as string_decoder from "node:string_decoder";
// // @ts-ignore
// import Dropdown from "./dropdown";
// import Profile from './profile';
// import {cartStore} from "./profile";
// import ProductStore from "./productStore";
//
// export interface IProduct {
//     product_name: string,
//     product_tags: string[],
//     description: string,
//     category: string,
//     price: number,
//     discount: number,
//     thumbnail: string,
//     rating: number,
//     id: number
// }
//
// interface IFetchData {
//     title: string,
//     tags: string[],
//     discountPercentage: number,
//     description: string,
//     category: string,
//     price: number,
//     thumbnail: string,
//     rating: number,
//     id: number
// }
//
// const Home2 = () => {
//     const [searchBoxData,setSearchBoxData]=useState<string>();
//     /* useEffect created to fetch the particular data whenever a user will type something on the searchbox     */
//     useEffect(() => {
//         ProductStore.searchBoxData !== null && setTimeout(() => {
//             ProductStore.fetchUrl=`${ProductStore.baseProductUrl}${searchBoxData}`;
//         }, 2000);
//     }, [searchBoxData]);
//
//     /* function to get the category selected url */
//
//     const handleCategoryChange = (category: string) => {
//         if (category === 'All') {
//             ProductStore.fetchUrl=ProductStore.baseProductUrl;
//         } else {
//             ProductStore.fetchUrl = ProductStore.baseProductUrl + "/category/" + category;
//         }
//     };
//
//     /* function to extract the data in the search box */
//     const handleSearchData = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchBoxData(e.target.value);
//     }
//
//     const cartItemsCount=(e: React.ChangeEvent<HTMLInputElement>)=>{
//         // @ts-ignore
//         ProductStore.cartItemsCount=e.target.value;
//     }
//
//     const ProductStore.fetchProductDetails();
//
//
//     return (
//         <>
//             <div className="search-bar">
//                 <input type="text" placeholder="Search ..." className="search-box" onChange={handleSearchData}/>
//                 {ProductStore.categoryList !==undefined && <Dropdown categoryData={ProductStore.categoryList} onSelect={handleCategoryChange}/>}
//                 <div className="user-cart">
//                     <p>{ProductStore.user}</p>
//                     <button className="user-cart-quantity-button"> User Cart {ProductStore.cartItemsCount} </button>
//                 </div>
//             </div>
//             {ProductStore.productDetail !== undefined && ProductStore.productDetail.map((product: IProduct, ind: number) => {
//                 // @ts-ignore
//                 return <Profile product={product} key={product.id} cartItemsCount={cartItemsCount}/>
//             })}
//         </>
//     );
// };
//
// export default Home2;