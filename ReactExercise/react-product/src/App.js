import './App.css';
import CartPage from "./Components/CartPage";
import HomePage from "./Components/HomePage";
import Cartstore from "./Components/Cartstore";
import {observer} from "mobx-react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductStore from "./Components/ProductStore";
import NewProductPage from "./Components/NewProductPage";
import NewProductStore from "./Components/NewProductStore";

const cartStore = new Cartstore();
const productStore=new ProductStore();
const newProductStore = new NewProductStore();

const App = observer(() => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage cartStore={cartStore} productStore={productStore}/>}/>
                    <Route path="/cart" element={<CartPage cartStore={cartStore} productStore={productStore}/>}/>
                </Routes>
            </Router>
            <NewProductPage />
        </div>
    );
})

export default App;
