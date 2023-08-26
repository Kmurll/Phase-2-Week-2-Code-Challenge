import React from 'react';
import './YourBotArmy.css';


function YourBotArmy({ army, releaseBot, dischargeBot }) {
  const handleRelease = (bot) => {
    releaseBot(bot);
  };

  const handleDischarge = async (bot) => {
    try {
      await dischargeBot(bot);
      releaseBot(bot); // Remove the bot from the army on the frontend
    } catch (error) {
      console.error('Error discharging bot:', error);
    }
  };

  return (
    <div>
      <h2>Your Bot Army</h2>
      <ul>
        {army.map(bot => (
          <li key={bot.id}>
            <div>Name: {bot.name}</div>
            <div>Health: {bot.health}</div>
            <div>Damage: {bot.damage}</div>
            <div>Armor: {bot.armor}</div>
            <div>Class: {bot.bot_class}</div>
            <div>Catchphrase: {bot.catchphrase}</div>
            <div>Created at: {bot.created_at}</div>
            <div>Updated at: {bot.updated_at}</div>
            <div>
              <img src={bot.avatar_url} alt={`${bot.name} Avatar`} />
            </div>
            <button onClick={() => handleRelease(bot)}>Release</button>
            <button className="delete-button" onClick={() => handleDischarge(bot)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YourBotArmy;
