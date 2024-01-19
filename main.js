const Discord = require('discord.js');
const client = new Discord.Client({intents: require('./src/configs/intents')});
require('dotenv').config();
const loadEvents = require('./src/Loaders/loadEvents');
loadEvents(client);
const loadDatabase = require('./src/Loaders/loadDatabase');
client.db = new loadDatabase();
client.login(process.env.token);