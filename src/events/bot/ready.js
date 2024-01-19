const { Events } = require('discord.js');
const loadCommands = require('../../Loaders/loadCommands');

module.exports = {
    name: Events.ClientReady,
    once: false,
    execute(client) {
        loadCommands(client);
        console.log(`Ready! Logged in as ${client.user.username}`);
    }
}