import './App.css';
import {Demo} from './Components/button';
import Button from './Components/button.js';
import Clock from './Components/clock';
import {useState} from "react";


const obj=[{name:'paras',age:21},{name:'rachit',age:22},{name:'anuj',age:22}];
function App() {
    const [date,setDate]=useState(new Date());
    const timesheet={
        color : 'Red',
        time : date
    }
  return (

      <div>
          <article>
              <h1>My First Component</h1>
              <ol>
                  <li>Components: UI Building Blocks</li>
                  <li>Defining a Component</li>
                  <li>Using a Component</li>
              </ol>
          </article>
          <Button/>
          <Demo/>
          {/*{*/}
          {/*    obj.map((x)=>{*/}
          {/*        console.log(x["name"]+" "+x["age"]);*/}
          {/*    })*/}
          {/*      while(true){*/}
          {/*        setTimeout(()=>{*/}
          {/*            setDate(new Date());*/}
          {/*       },1000);*/}
          {/*   }*/}
          {/*}*/}
          <Clock {...timesheet} />
      </div>
  );
}

export default App;
