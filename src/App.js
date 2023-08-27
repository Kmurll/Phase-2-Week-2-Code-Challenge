// Import necessary dependencies
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';

// Define the main App component
function App() {
  // State to store the selected bots in the army
  const [army, setArmy] = useState([])

  // Function to add a bot to the army
  const addToArmy = (bot) => {
    // Check if the bot is not already in the army
    if (!army.some(item => item.id === bot.id)) {
      setArmy([...army, bot]); // Add the bot to the army state
    }
  }

  // Function to release a bot from the army
  const releaseBot = (bot) => {
    setArmy(army.filter(item => item.id !== bot.id)); // Remove the bot from the army state
  }

  // Function to discharge a bot from the server
  const dischargeBot = async (bot) => {
    try {
      await fetch(`http://localhost:8001/bots/${bot.id}`, {
        method: 'DELETE', // Send a DELETE request to the server to discharge the bot
      });
    } catch (error) {
      console.error('Error discharging bot:', error); // Log any errors that occur
    }
  }

  // Render the App component
  return (
      <div className="App">
          <h1>Bot App</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Bot Collection</Link> {/* Navigation link to the Bot Collection page */}
              </li>
              <li>
                <Link to="/yourbotarmy">Your Bot Army</Link> {/* Navigation link to the Your Bot Army page */}
              </li>
            </ul>
          </nav>
        <main>
          <Routes>
            <Route path="/" element={<BotCollection addToArmy={addToArmy} />} /> {/* Render the BotCollection component */}
            <Route
              path="/yourbotarmy"
              element={<YourBotArmy army={army} releaseBot={releaseBot} dischargeBot={dischargeBot} />} // Render the YourBotArmy component with army data and functions
            />
          </Routes>
        </main>
      </div>
  )
}

export default App; // Export the App component as the default export
