const { SlashCommandBuilder } = require('discord.js');
const { embedAdd } = require('../../configs/embeds/Ticket');
const { embed3 } = require('../../configs/embeds/embedTicket');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Ajouter un membre au ticket')
        .setDMPermission(false)
        .setDefaultMemberPermissions(null)
        .setNSFW(false)
        .addUserOption(option => option.setName('membre').setDescription('Membre a ajouter').setRequired(true)),

        async execute(interaction) {
            embed3.setDescription('Ajout du membre en cours');
            const msg = await interaction.reply({ embeds: [embed3], ephemeral: true });
            setTimeout(() => {
                embed3.setDescription('Ajout du membre en cours.');
                msg.edit({ embeds: [embed3], ephemeral: true });
            }, 1000);
    
            setTimeout(() => {
                embed3.setDescription('Ajout du membre en cours..');
                msg.edit({ embeds: [embed3], ephemeral: true });
            }, 2000);
    
            setTimeout(() => {
                embed3.setDescription('Ajout du membre en cours...');
                msg.edit({ embeds: [embed3], ephemeral: true });
            }, 3000);
    
            setTimeout(() => {
                msg.delete();
            }, 4000);
    
            setTimeout(async() => {
                await interaction.channel.permissionOverwrites.create(interaction.options.getUser('membre').id, {
                    SendMessages: true,
                    ReadMessageHistory: true,
                    ViewChannel: true
                })
                embedAdd.setDescription(`${interaction.options.getUser('membre')} a bien été ajouter au ticket.`)
                interaction.channel.send({embeds: [embedAdd]})
            }, 5000)
        }
}