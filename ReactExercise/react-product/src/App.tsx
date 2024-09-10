import './App.css';
import CartPage from "./Components/CartPage";
import HomePage from "./Components/HomePage";
import Cartstore from "./Components/Cartstore";
import {observer} from "mobx-react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductStore from "./Components/ProductStore";
import NewProductPage from "./Components/NewProductPage";
import {initRouter} from './Components/RouterStore';
const cartStore = new Cartstore();
const productStore=new ProductStore();

const App = observer(() => {
    const routerStore =initRouter();
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage cartStore={cartStore} productStore={productStore}/>}/>
                    <Route path="/cart" element={<CartPage cartStore={cartStore} productStore={productStore}/>}/>
                    <Route path="/new-product-page" element={<NewProductPage productStore={productStore}/>}/>
                </Routes>
            </Router>

            {/*<RouterContext.Provider value={routerStore}>*/}
            {/*    <RouterView viewMap={viewMap} />*/}
            {/*</RouterContext.Provider>*/}
        </div>
    );
})

export default App;
