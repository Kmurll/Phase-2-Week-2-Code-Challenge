import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BotCollection.css';

// BotCollection component
function BotCollection({ addToArmy }) {
  const [bots, setBots] = useState([]) // State to store the fetched bots
  const navigate = useNavigate() // React Router's navigation hook

  // Fetch bots from the server when the component mounts
  useEffect(() => {
    fetch('http://localhost:8001/bots')
      .then(response => response.json())
      .then(data => setBots(data)) // Set the fetched bot data to the state
      .catch(error => console.error('Error fetching bots:', error))
  }, [])

  // Handle adding a bot to the army
  const handleAddToArmy = (bot) => {
    addToArmy(bot); // Call the addToArmy function passed as a prop
    navigate('/yourbotarmy'); // Navigate to the Your Bot Army page
  }

  // Handle releasing a bot from the collection
  const handleReleaseBot = async (bot) => {
    try {
      await fetch(`http://localhost:8001/bots/${bot.id}`, {
        method: 'DELETE', // Send a DELETE request to the server to release the bot
      });
      setBots(bots.filter(item => item.id !== bot.id)); // Remove the bot from the local bots state
    } catch (error) {
      console.error('Error releasing bot:', error); // Log any errors that occur
    }
  }

  // Render the list of bots
  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Bot Collection</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {bots.map(bot => (
          <li key={bot.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <img src={bot.avatar_url} alt={`${bot.name} Avatar`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
            </div>
            <div>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Name: {bot.name}</div>
            <div style={{ marginBottom: '5px' }}>Health: {bot.health}</div>
            <div style={{ marginBottom: '5px' }}>Damage: {bot.damage}</div>
            <div style={{ marginBottom: '5px' }}>Armor: {bot.armor}</div>
            <div style={{ marginBottom: '5px' }}>Class: {bot.bot_class}</div>
            <div style={{ marginBottom: '5px' }}>Catchphrase: {bot.catchphrase}</div>
            <div style={{ marginBottom: '5px' }}>Created at: {bot.created_at}</div>
            <div style={{ marginBottom: '5px' }}>Updated at: {bot.updated_at}</div>
              <div>
                <button onClick={() => handleAddToArmy(bot)} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', marginRight: '5px' }}>Add to Army</button>
                <button onClick={() => handleReleaseBot(bot)} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Release</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BotCollection // Export the BotCollection component
