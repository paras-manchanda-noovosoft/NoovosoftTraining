import './App.css';

import {Demo} from './Components/button';
import Button from './Components/button.js';
import Clock from './Components/clock';
import React, {useState} from "react";
import Counter from './Hooks/useState/use-state-hooks';
import Profile from './Components/Profile';
import MovingDot from './Components/Movingdot';
import Form from './Components/Form.js';
import Toolbar from './EventHandler/Toolbar';
import UseEffected from "./Hooks/useEffect/use-effect";
import FetchingData from './Hooks/useEffect/FetchingData';
import Stopwatch from "./Hooks/useRef/stopwatch";
import Mode from './Hooks/useContext/Mode';
import { useOnlineStatus } from './Hooks/customHook/onlineNotification';
import CountHandler from './Hooks/useReducer/countIncrement';
import Computation from "./Hooks/useMemo/computation";
import AuthBoard from "./HigherOrderFunction/Dashboard";

const Persons = [
    {
        "userId": "rirani",
        "jobTitleName": "Developer",
        "firstName": "Romin",
        "lastName": "Irani",
        "preferredFullName": "Romin Irani",
        "employeeCode": "E1",
        "region": "CA",
        "phoneNumber": "408-1234567",
        "emailAddress": "romin.k.irani@gmail.com"
    },
    {
        "userId": "nirani",
        "jobTitleName": "Developer",
        "firstName": "Neil",
        "lastName": "Irani",
        "preferredFullName": "Neil Irani",
        "employeeCode": "E2",
        "region": "CA",
        "phoneNumber": "408-1111111",
        "emailAddress": "neilrirani@gmail.com"
    },
    {
        "userId": "thanks",
        "jobTitleName": "Program Directory",
        "firstName": "Tom",
        "lastName": "Hanks",
        "preferredFullName": "Tom Hanks",
        "employeeCode": "E3",
        "region": "CA",
        "phoneNumber": "408-2222222",
        "emailAddress": "tomhanks@gmail.com"
    },
    {
        "userId": "thanks",
        "jobTitleName": "Program Directory",
        "firstName": "Tom",
        "lastName": "Hanks",
        "preferredFullName": "Tom Hanks",
        "employeeCode": "E3",
        "region": "CA",
        "phoneNumber": "408-2222222",
        "emailAddress": "tomhanks@gmail.com"
    },
    {
        "userId": "thanks",
        "jobTitleName": "Program Directory",
        "firstName": "Tom",
        "lastName": "Hanks",
        "preferredFullName": "Tom Hanks",
        "employeeCode": "E3",
        "region": "CA",
        "phoneNumber": "408-2222222",
        "emailAddress": "tomhanks@gmail.com"
    },
    {
        "userId": "thanks",
        "jobTitleName": "Program Directory",
        "firstName": "Tom",
        "lastName": "Hanks",
        "preferredFullName": "Tom Hanks",
        "employeeCode": "E3",
        "region": "CA",
        "phoneNumber": "408-2222222",
        "emailAddress": "tomhanks@gmail.com"
    }
    ,
    {
        "userId": "thanks",
        "jobTitleName": "Program Directory",
        "firstName": "Tom",
        "lastName": "Hanks",
        "preferredFullName": "Tom Hanks",
        "employeeCode": "E3",
        "region": "CA",
        "phoneNumber": "408-2222222",
        "emailAddress": "tomhanks@gmail.com"
    }
    ,
    {
        "userId": "thanks",
        "jobTitleName": "Program Directory",
        "firstName": "Tom",
        "lastName": "Hanks",
        "preferredFullName": "Tom Hanks",
        "employeeCode": "E3",
        "region": "CA",
        "phoneNumber": "408-2222222",
        "emailAddress": "tomhanks@gmail.com"
    }];
function SaveButton() {
    const isOnline = useOnlineStatus();
    function handleSaveClick() {
        console.log('✅ Progress saved');
    }
    return (
        <button disabled={!isOnline} onClick={handleSaveClick}>
            {isOnline ? 'Save progress' : 'Reconnecting...'}
        </button>
    );
}

function StatusBar() {
    const isOnline = useOnlineStatus();
    return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}


function Authboard() {
    return null;
}

function App() {
    return (
        <div className="app">
            <h1 className="heading">Working Of Component</h1>
            <div className="profile-section">
                {Persons.map((person) => (
                    <Profile key={person.userId} {...person} />
                ))}
            </div>
            <h1 className="heading">Working with Event Handler</h1>
            <Toolbar onPlayMovie={() => alert("playing")} onUploadImage={() => alert("uploading!")}/>

            <h1 className="heading">Working with objects</h1>
            <MovingDot/>
            <Form/>
            <h1 className="heading">Working Of Hooks</h1>
            <ol>
                <Counter/>
            </ol>

            <h1 className="heading">Working Of Use Effect Hook</h1>
            <UseEffected/>
            <h1 className="heading">Fetching Data Using UseEffect Hook</h1>
            <FetchingData/>
            <h1 className="heading">Working with UseRef Hook</h1>
            <Stopwatch/>

            <h1 className="heading">Working with UseContext Hook</h1>
            <Mode/>

            <h1 className="heading">Working with Custom Hook</h1>
            <SaveButton/>
            <StatusBar/>

            <h1 className="heading">Working with useReducer Hook</h1>
            <CountHandler/>

            <h1 className="heading">Working with useMemo Hook</h1>
            <Computation/>

            <h1 className="heading">Working with Higher Order Component</h1>
            {/*<Authboard />*/}
        </div>
    );
}

export default App;