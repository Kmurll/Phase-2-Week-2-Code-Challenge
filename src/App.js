import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';

function App() {
  const [army, setArmy] = useState([]);

  const addToArmy = (bot) => {
    if (!army.some(item => item.id === bot.id)) {
      setArmy([...army, bot]);
    }
  };

  const releaseBot = (bot) => {
    setArmy(army.filter(item => item.id !== bot.id));
  };

  const dischargeBot = async (bot) => {
    try {
      await fetch(`http://localhost:8001/bots/${bot.id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error discharging bot:', error);
    }
  };

  return (
      <div className="App">
          <h1>Bot App</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Bot Collection</Link>
              </li>
              <li>
                <Link to="/yourbotarmy">Your Bot Army</Link>
              </li>
            </ul>
          </nav>
        <main>
          <Routes>
            <Route path="/" element={<BotCollection addToArmy={addToArmy} />} />
            <Route
              path="/yourbotarmy"
              element={<YourBotArmy army={army} releaseBot={releaseBot} dischargeBot={dischargeBot} />}
            />
          </Routes>
        </main>
      </div>
  );
}

export default App;
