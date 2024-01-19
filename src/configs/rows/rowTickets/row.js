const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

const row = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
        .setCustomId('category')
        .setLabel('Catégorie')
        .setStyle('Primary'),
    new ButtonBuilder()
        .setCustomId('channel')
        .setLabel('Salon')
        .setStyle('Primary'),
    new ButtonBuilder()
        .setCustomId('valid')
        .setLabel('Valider')
        .setStyle('Success'),
)

module.exports = row