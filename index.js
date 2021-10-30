//Variables and constants
const {Client, Collection, Intents, MessageAttachment, MessageEmbed, Message, MessageActionRow, MessageButton} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES"] }); 
const {token, prefix} = require('./config.json');
const fs = require('fs');

client.commands = new Collection();

//Rdr
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('!killugon', { type: 'WATCHING' });
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

//Prefix commands
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const path = './imgs/';

    client.on('messageCreate', message => {
        if(!message.content.startsWith(prefix) || message.author.bot) return;

        const commandValue = message.content.toLowerCase();
        console.log(`${message.member.nickname} in #${message.channel.name} triggered an interaction!`);

        if(commandValue === "!killugon") {
            const embedMsg = new MessageEmbed()
                .setTitle("Killugon Bot")
                .setDescription("About Killugon Bot")
                .addFields(
                    {name: '\u200b', value: '\u200b'},
                    {name: "!killugon img", value: "Send a random killugon image from Pinterest"},
                    {name: "!killugon gif", value: "Send a random killugon GIF from Pinterest", inline: true},
                    {name: '\u200b', value: '\u200b'},
                    {name: "Developed by:", value: "rach#7705", inline: true},
                    {name: "For the server:", value: "⚡Killua_Zoldyck Original Server⚡", inline: true},
                )
                .setImage('https://cdn.discordapp.com/app-icons/903714022975746108/4cd1dda28fae71e3c228708f2ea28eb5.png')
                .setFooter('Killugon IS canon >:3 🏳️‍🌈')
                message.channel.send({embeds: [embedMsg]})
        } else if(commandValue === "!killugon img") {
            const images = fs.readdirSync('./imgs').filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.PNG') || file.endsWith('.JPG') || file.endsWith('.JPEG'));
            const randomImage = random(images);
            const attachImg = new MessageAttachment(path + randomImage, randomImage);
            const embedMsg = new MessageEmbed()
                .setTitle("Killua x Gon")
                .setDescription("Killugon fanart from Pinterest :3")
                .setImage(`attachment://${randomImage}`);
            message.channel.send({ embeds: [embedMsg], files: [path + randomImage] })
        } else if(commandValue === "!killugon gif") {
            const images = fs.readdirSync('./imgs').filter(file => file.endsWith('.gif') || file.endsWith('.GIF'));
            const randomImage = random(images);
            const attachImg = new MessageAttachment(path + randomImage, randomImage);
            const embedMsg = new MessageEmbed()
                .setTitle("Killua x Gon")
                .setDescription("Killugon GIF from Pinterest :3")
                .setImage(`attachment://${randomImage}`);
            message.channel.send({ embeds: [embedMsg], files: [path + randomImage] })
        } else if(commandValue === "!killugon hentai" || commandValue === "!killugon porn" || commandValue === "!killugon nsfw") {
            if(message.channel.nsfw) {
                message.channel.send(`I didn't create this command yet cuz I don't wanna search for this kind of thing...`);
            } else {
                message.channel.send('This command is only allowed on NSFW channels!');
            }
        }
    });

//Login on DC with token
client.login(token);