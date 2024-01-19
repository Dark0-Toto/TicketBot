const { EmbedBuilder } = require('discord.js');

const embed = new EmbedBuilder()
.setTitle('Ticket')
.addFields(
    { name: 'Catégorie', value: ':x:', inline: true },
    { name: 'Salon', value: ':x:', inline: true },
)
.setColor(process.env.discord_color)
.setTimestamp();

const embed2 = new EmbedBuilder()
.setTitle('Ticket')
.setColor(process.env.discord_color)
.setTimestamp();

const embed3 = new EmbedBuilder()
.setTitle('Ticket')
.setColor(process.env.discord_color)
.setTimestamp();

const embed4 = new EmbedBuilder()
.setTitle('Ticket')
.setColor(process.env.discord_color)
.setTimestamp();

module.exports = { embed, embed2, embed3, embed4 };