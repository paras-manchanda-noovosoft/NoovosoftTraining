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

export interface IFetchData {
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

export interface ICartType {
    productDetail: IProduct,
    isCart: boolean
}
