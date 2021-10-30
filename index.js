//Variables and constants
const {Client, Collection, Intents, Interaction} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const {token} = require('./config.json');
const fs = require('fs');

client.commands = new Collection();

//Rdr
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('/killugon', { type: 'WATCHING' });
});

//Registering events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for(const file of eventFiles) {
    const event = require(`./events/${file}`);
    if(event.once) {
        client.once(event.name, (...args) => event.execute(... args));
    } else {
        client.on(event.name, (...args) => event.execute(... args));
    }
}

//Registering commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction)
    } catch (error) {
        console.log(error);
        await interaction.reply({content: "An error occured while trying to execute this command.", ephemeral: true});
    }
});

//Login on DC with token
client.login(token);