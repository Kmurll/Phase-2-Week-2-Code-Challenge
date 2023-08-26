import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BotCollection.css';


function BotCollection({ addToArmy }) {
  const [bots, setBots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8001/bots')
      .then(response => response.json())
      .then(data => setBots(data))
      .catch(error => console.error('Error fetching bots:', error));
  }, []);

  const handleAddToArmy = (bot) => {
    addToArmy(bot);
    navigate('/yourbotarmy');
  };

  const handleReleaseBot = async (bot) => {
    try {
      await fetch(`http://localhost:8001/bots/${bot.id}`, {
        method: 'DELETE',
      });
      setBots(bots.filter(item => item.id !== bot.id));
    } catch (error) {
      console.error('Error releasing bot:', error);
    }
  };

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
            <div style={{ fontWeight: 'bold' }}>Name: {bot.name}</div>
            <div>Health: {bot.health}</div>
            <div>Damage: {bot.damage}</div>
            <div>Armor: {bot.armor}</div>
            <div>Class: {bot.bot_class}</div>
            <div>Catchphrase: {bot.catchphrase}</div>
            <div>Created at: {bot.created_at}</div>
            <div>Updated at: {bot.updated_at}</div>
            <div>
              <button onClick={() => handleAddToArmy(bot)} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', marginRight: '5px' }}>Add to Army</button>
              <button onClick={() => handleReleaseBot(bot)} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Release</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
  
  );
}

export default BotCollection;
