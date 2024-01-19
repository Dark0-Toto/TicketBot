const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

const backButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('back')
            .setLabel('Retour')
            .setStyle('Secondary')
            .setEmoji('⬅️'),
    );

    const openTicket = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('openTicket')
            .setLabel('Ouvrir un Ticket')
            .setStyle('Primary')
            .setEmoji('📩'),
    )

    const closeTicket = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('closeTicket')
            .setLabel('Fermer le Ticket')
            .setStyle('Danger')
            .setEmoji('🔒'),
    )

    const yesnoClose = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('yesopenticket')
            .setLabel('Oui')
            .setStyle('Success'),
        new ButtonBuilder()
            .setCustomId('nocloseticket')
            .setLabel('Non')
            .setStyle('Danger'),
    )

module.exports = { backButton, openTicket, closeTicket, yesnoClose}