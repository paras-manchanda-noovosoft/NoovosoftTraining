import Cartstore from "./Components/Cartstore";
import ProductStore from "./Components/ProductStore";
import NewProductFormValidation from "./Components/NewProductFormValidation";

class RootStore {
    cartstore: Cartstore = new Cartstore();
    productstore : ProductStore = new ProductStore();
    newProductStore = new NewProductFormValidation();
}

export default RootStore;