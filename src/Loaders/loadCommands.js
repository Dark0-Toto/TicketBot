const fs = require('fs')
const path = require('path')
const { REST, Routes, Collection } = require('discord.js');

module.exports = (client) => {
    client.commands = new Collection()
    const commands = [];
    const foldersPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(foldersPath);
    
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                commands.push(command.data.toJSON());
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
    
    const rest = new REST().setToken(process.env.token);

    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(process.env.id),
                { body: commands },
            );
        } catch (error) {}
    })();

    console.log('Commands loaded: ' + client.commands.size);
}