import bg from './bg.png';
import React, {useEffect, useState} from 'react';
import { init, getBalance } from './components/web3/web3Client';
import './App.css';

function App() {
  const [balance, setBalance] = useState(0);
  const fetchBalance = () => [
    getBalance().then(balance => {
      setBalance(balance);
    }).catch(err => {
      console.log(err);
    })

  ]
  
  useEffect(() => {
   init();
  })
  return (
    <body class="Main" >
      <header class="header">Header</header>
      <div class="body">
        <main class="content">
       
        </main>
        <nav class="nav">Nav</nav>
        <aside class="ads">Ads</aside>
      </div>
      <footer class="footer">Footer</footer>
    </body>
  );
}

export default App;
