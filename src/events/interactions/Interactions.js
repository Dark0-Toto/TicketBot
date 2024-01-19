const { Events, PermissionFlagsBits} = require('discord.js');
const { embed, embed2 } = require('../../configs/embeds/embedTicket');
const rowCategory = require('../../configs/rows/rowTickets/rowCategory');
const rowChannel = require('../../configs/rows/rowTickets/rowChannel');
const { backButton, yesnoClose, closeTicket } = require('../../configs/buttons/Buttons');
const row = require('../../configs/rows/rowTickets/row');
const { embedTicketOpen } = require('../../configs/embeds/embedTicketOpen');
const transticket = require('discord-html-transcripts')

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (interaction.isButton()) {
            //await interaction.deferUpdate();
            let channelTicket = [];
            const req = await interaction.client.db.selectone('tickets', 'guildId', interaction.guild.id);
            let category;
            if(req.length < 1) {
                category = interaction.channel.parent.id;
            } else {
                if(req[0].category === 'false') {
                    category = interaction.channel.parent.id;
                } else {
                    category = req[0].category;
                }
            }

            if(interaction.customId === 'openTicket') {
                embed2.setDescription(`Veuillez patienter...`);
                const msg = await interaction.reply({ embeds: [embed2], ephemeral: true });
                setTimeout(async() => {
                    const channel = await interaction.guild.channels.create({
                        name: `ticket-${interaction.user.username}`,
                        type: 0,
                        parent: category,

                        permissionOverwrites: [
                            {
                                id: interaction.user.id,
                                allow: [
                                    PermissionFlagsBits.ViewChannel,
                                    PermissionFlagsBits.SendMessages,
                                    PermissionFlagsBits.ReadMessageHistory,
                                    PermissionFlagsBits.EmbedLinks,
                                    PermissionFlagsBits.AttachFiles,
                                    PermissionFlagsBits.UseExternalEmojis,
                                    PermissionFlagsBits.AddReactions,
                                ],
                            },
                            {
                                id: interaction.guild.roles.everyone.id,
                                deny: [
                                    PermissionFlagsBits.ViewChannel,
                                    PermissionFlagsBits.SendMessages,
                                    PermissionFlagsBits.ReadMessageHistory,
                                    PermissionFlagsBits.EmbedLinks,
                                    PermissionFlagsBits.AttachFiles,
                                    PermissionFlagsBits.UseExternalEmojis,
                                    PermissionFlagsBits.AddReactions,
                                ],
                            },
                        ],
                    });
                    channelTicket.push({
                        channelId: channel.id,
                        guildId: interaction.guild.id,
                        userId: interaction.user.id,
                        parentId: category,
                    });
                    embed2.setDescription(`Création du ticket...`);
                    msg.edit({ embeds: [embed2], ephemeral: true });
                }, 2000);

                setTimeout(() => {
                    const storedChannelInfo = channelTicket[0];
                    const { channelId, parentId, userId, guildId } = storedChannelInfo;
                    const channel = interaction.client.channels.cache.get(channelId);
                    embedTicketOpen.setDescription(`Merci d'avoir ouvert ce ticket !\nPour avoir de l'aide, merci de patientez le temps qu'un membre du staff arrive !`);
                    channel.send({ embeds: [embedTicketOpen], components: [closeTicket] });
                    embed2.setDescription(`Envoie de l'embed dans le ticket...`);
                    msg.edit({ embeds: [embed2], ephemeral: true });
                }, 4000);

                setTimeout(() => {
                    const storedChannelInfo = channelTicket[0];
                    const { channelId, parentId, userId, guildId } = storedChannelInfo;
                    const channel = interaction.client.channels.cache.get(channelId);
                    channel.setTopic(`${userId}`)
                    embed2.setDescription(`Votre ticket est prêt !\n<#${channelId}>`);
                    msg.edit({ embeds: [embed2], ephemeral: true });
                    channel.send({ content: `<@${userId}>` }).then(msg => {
                        msg.delete();
                    });
                }, 6000);
            };

            if(interaction.customId === 'closeTicket') {
                interaction.deferUpdate();
                return interaction.message.edit({ components: [yesnoClose] });
            };
            if(interaction.customId === 'yesopenticket') {
                const user = await interaction.client.users.fetch(interaction.channel.topic);
                interaction.deferUpdate();
                await interaction.message.edit({ components: [] });
                embed2.setDescription(`Veuillez patienter...`);
                const msg = await interaction.channel.send({embeds: [embed2]});
                setTimeout(async() => {
                    embed2.setDescription(`Création du transcript...`);
                    msg.edit({ embeds: [embed2], ephemeral: true });
                }, 2000);
                setTimeout(() => {
                    embed2.setDescription(`Fermeture du ticket...`);
                    msg.edit({ embeds: [embed2], ephemeral: true });
                }, 4000);
                setTimeout(async () => {
                    const transcript = await transticket.createTranscript(interaction.channel, { limit: 1000000, reason: `Ticket ferme par ${interaction.user.tag}` });
                    interaction.channel.delete();
                    embed2.setDescription(`Votre ticket a été fermé sur le serveur \`${interaction.guild.name}\``);
                    user.send({ embeds: [embed2], files: [transcript]});
                }, 8000);
            }
            if(interaction.customId === 'nocloseticket') {
                interaction.deferUpdate();
                return interaction.message.edit({ components: [closeTicket] });
            }

            if (interaction.customId === 'category') {
                return interaction.message.edit({ embeds: [embed], components: [rowCategory, backButton] });
            };
            if(interaction.customId === 'channel') {
                return interaction.message.edit({ embeds: [embed], components: [rowChannel, backButton] });
            };
            if(interaction.customId === 'back') {
                return interaction.message.edit({ embeds: [embed], components: [row] });
            };
            if(interaction.customId === 'valid') {
                let category = interaction.client.channels.cache.find(channel => channel.name === embed.data.fields[0].value);
                if(category === ':x:' || category === 'undefined' || category === undefined) category = 'false';
                let channel = interaction.client.channels.cache.find(channel => channel.name === embed.data.fields[1].value);
                if(channel === ':x:' || channel === 'undefined' || channel === undefined) channel = 'false';
                const req = await interaction.client.db.selectone('tickets', 'guildId', interaction.guild.id);
                try {
                    if(req.length < 1) {
                        await interaction.client.db.insert('tickets', ['guildId', 'category', 'channel'], [interaction.guild.id, category.id, channel.id]);
                        return interaction.message.edit({components: [] });
                    } else {
                        await interaction.client.db.update('tickets', 'category', category.id, 'guildId', interaction.guild.id);
                        await interaction.client.db.update('tickets', 'channel', channel.id, 'guildId', interaction.guild.id);
                        return interaction.message.edit({components: [] });
                    }
                } catch (err) {
                    return interaction.reply({ content: 'Une erreur est survenue', ephemeral: true });
                }
            };
        }
        if(interaction.isChannelSelectMenu()) {
            if (interaction.customId === 'selectCategory') {
                let field = embed.data.fields[0];
                const channel = interaction.client.channels.cache.get(interaction.values[0]);
                field.value = channel.name;
                await interaction.update({ embeds: [embed], components: [row] });
            }
            if(interaction.customId === 'selectChannel') {
                let field = embed.data.fields[1];
                const channel = interaction.client.channels.cache.get(interaction.values[0]);
                field.value = channel.name;
                await interaction.update({ embeds: [embed], components: [row] });
            }
        }
    }
}