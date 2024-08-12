import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';

// import Formulario from './Formulario';
// import Timer from './Timer';
// import Password from './Password'
// import RickAndMorty from './RickAndMorty';
// import RickAndMorty2 from './RickAndMorty2';

const root = ReactDOM.createRoot(document.getElementById('root'));

const response1 = await fetch('https://my.api.mockaroo.com/CARS.json?key=8a87e540');
const cars = await response1.json();

const response2 = await fetch('https://my.api.mockaroo.com/USERS.json?key=8a87e540')
const users = await response2.json();

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
