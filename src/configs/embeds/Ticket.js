const {EmbedBuilder} = require('discord.js');

const embedAdd = new EmbedBuilder()
    .setTitle('Ticket')
    .setColor(process.env.discord_color)
    .setTimestamp();

const embedRemove = new EmbedBuilder()
    .setTitle('Ticket')
    .setColor(process.env.discord_color)
    .setTimestamp();
    
module.exports = { embedAdd, embedRemove };