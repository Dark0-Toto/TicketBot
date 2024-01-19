const {EmbedBuilder} = require('discord.js');

const embedTicketOpen = new EmbedBuilder()
    .setTitle('Ouverture de Ticket !')
    .setColor(process.env.discord_color)
    .setTimestamp();

module.exports = { embedTicketOpen };