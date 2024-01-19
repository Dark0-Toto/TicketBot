const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const eventsPath = path.join(__dirname, '../events');
    const eventFolder = fs.readdirSync(eventsPath);
    let events = [];
    
    for (const folder of eventFolder) {
        const commandsPath = path.join(eventsPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else if (!event.once) {
                client.on(event.name, (...args) => event.execute(...args));
            }
            delete require.cache[require.resolve(filePath)];
            events.push(event.name);
        }
    }

    console.log(`Events loaded: ${events.length}`);
}