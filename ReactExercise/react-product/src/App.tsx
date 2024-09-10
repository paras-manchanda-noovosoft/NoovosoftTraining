import './App.css';
import {observer} from "mobx-react";
import {initRouter} from './Components/RouterStore';
import {RouterContext, RouterView} from 'mobx-state-router';
import {viewMap} from "./Components/viewMap";
import RootStore from "./RootStore";
import { createContext } from 'react'
const rootstore=new RootStore();
export const RootContext=createContext(rootstore);

const App = observer(() => {
    const routerStore =initRouter();


    return (
        <div className="App">
            <RouterContext.Provider value ={routerStore}>
            <RootContext.Provider value={rootstore}>
                    <RouterView viewMap={viewMap} />
            </RootContext.Provider>
            </RouterContext.Provider>
        </div>
    );
})

export default App;
