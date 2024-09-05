import './App.css';
import CartPage from "./Components/cartPage";
import HomePage from "./Components/homePage";
import Cartstore from "./Components/cartstore";
import {observer} from "mobx-react";
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import ProductStore from "./Components/productStore";

const cartStore = new Cartstore();
const productStore=new ProductStore();

const App = observer(() => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage cartStore={cartStore} productStore={productStore}/>}/>
                    <Route path="/cart" element={<CartPage cartStore={cartStore} productStore={productStore}/>}/>
                </Routes>
            </Router>

        </div>
    );
})

export default App;
