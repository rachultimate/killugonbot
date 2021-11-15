//Consts and Libraries
const {Discord, Intents, Client, Collection} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, "GUILDS", "GUILD_MESSAGES"], partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const {token} = require('./config.json');

client.commands = new Collection();
client.events = new Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handler/${handler}`)(client, Discord);
});

//Log in on Discord using the bot's token
client.login(token);












//OLD CODE

/*
//Variables and constants
const {Client, Collection, Intents, MessageAttachment, MessageEmbed, Message, MessageActionRow, MessageButton, Guild} = require('discord.js');
const client = new Client({ 
    allowedMentions: { parse: ['users', 'roles'] }, 
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'], 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, "GUILDS", "GUILD_MESSAGES"] }); 
const {token, prefix} = require('./config.json');
const fs = require('fs');

client.commands = new Collection();

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

//Rtr
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('!kg', { type: 'WATCHING' });

    //Change avatar image randomly
    function changeAvatar() {
        const images = fs.readdirSync('./avatars');
        const path = "./avatars/"
        const randomAvatar = path + random(images);
        client.user.setAvatar(randomAvatar)
        console.log("Avatar changed for: " + randomAvatar);
    };
    setInterval(changeAvatar, 500000);
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

//Prefix commands


const path = './imgs/';

    client.on('messageCreate', message => {
        const cmd = message.content.toLowerCase();
        var commandValue = message.content.toLowerCase();

        if(cmd.startsWith("!gonkillu")) {
            commandValue = cmd.replace(/!gonkillu/, '!killugon');
        }

        if(cmd.startsWith("!kg")) {
            commandValue = cmd.replace(/!kg/, '!killugon');
            console.log(commandValue);
        }

        if(cmd.startsWith("!gk")) {
            commandValue = cmd.replace(/!gk/, '!killugon');
        }

        if(!commandValue.startsWith("!killugon") || message.author.bot) return;

        console.log(`${message.member.nickname} in #${message.channel.name} triggered an interaction!`);

        if(commandValue === "!killugon" || commandValue === "!killugon help" || commandValue === "!killugon commands") {
           
            const embedMsg = new MessageEmbed()
                .setTitle("Killugon Bot")
                .setDescription("About Killugon Bot")
                .addFields(
                    {name: '\u200b', value: 'Commands:'},
                    {name: "!kg img", value: "Send a random killugon image from Pinterest"},
                    {name: "!kg gif", value: "Send a random killugon GIF from Pinterest"},
                    {name: "!kg kiss @user", value: "Kiss an user"},
                    {name: "!kg hug @user", value: "Hugs an user"},
                    {name: 'Prefixes: !killugon, !gonkillu, !kg, !gk', value: '\u200b'},
                    {name: "Developed by:", value: "rach#7705", inline: true},
                    {name: "For the server:", value: "⚡Killua_Zoldyck Original Server⚡", inline: true},
                )
                .setImage('https://cdn.discordapp.com/app-icons/903714022975746108/4cd1dda28fae71e3c228708f2ea28eb5.png')
                .setFooter('Killugon IS canon >:3 🏳️‍🌈')
                .setColor('ORANGE');

                message.channel.send({embeds: [embedMsg]})
        }else if(commandValue === "!killugon ping") {
            const ping = Date.now() - message.createdTimestamp;
            message.channel.send(`Pong! ${ping}ms`)
        }else if(commandValue === "!killugon img") {
            const images = fs.readdirSync('./imgs').filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.PNG') || file.endsWith('.JPG') || file.endsWith('.JPEG'));
            const randomImage = random(images);
            const attachImg = new MessageAttachment(path + randomImage, randomImage);

            const embedMsg = new MessageEmbed()
                .setTitle("Killua x Gon")
                .setDescription("Killugon fanart from Pinterest :3")
                .setImage(`attachment://${randomImage}`)
                .setColor('AQUA');

            message.channel.send({ embeds: [embedMsg], files: [path + randomImage] });
            console.log(`${message.member.nickname} used "${commandValue}". File sent: ${path}${randomImage}`);
        } else if(commandValue === "!killugon gif") {
            const images = fs.readdirSync('./imgs').filter(file => file.endsWith('.gif') || file.endsWith('.GIF'));
            const randomImage = random(images);
            const attachImg = new MessageAttachment(path + randomImage, randomImage);

            const embedMsg = new MessageEmbed()
                .setTitle("Killua x Gon")
                .setDescription("Killugon GIF from Pinterest :3")
                .setImage(`attachment://${randomImage}`)
                .setColor('GREEN');

            message.channel.send({ embeds: [embedMsg], files: [path + randomImage] });
            console.log(`${message.member.nickname} used "${commandValue}". File sent: ${path}${randomImage}`);
         } else if(commandValue === "!killugon hentai" || commandValue === "!killugon porn" || commandValue === "!killugon nsfw") {
            if(message.channel.nsfw) {
                message.channel.send(`I didn't create this command yet cuz I don't wanna search for this kind of thing...`);
            } else {
                message.channel.send('This command is only allowed on NSFW channels!');
            }
        } else if(commandValue.startsWith("!killugon kiss")) {
            const targetUser = message.mentions.users.first();
            if(targetUser) {
                const images = fs.readdirSync('./kisses/');
                const kPath = './kisses/'
                const randomImage = random(images);
                const attachImg = new MessageAttachment(kPath + randomImage, randomImage);

                const embedMsg = new MessageEmbed()
                    .setTitle(`${message.member.nickname} kissed ${targetUser.username}! How cute :3`)
                    .setDescription("All the kiss images are safe of NSFW")
                    .setColor("GOLD")
                    .setImage(`attachment://${randomImage}`)
                message.channel.send({embeds: [embedMsg], files: [kPath + randomImage]});
                console.log(`${message.member.nickname} used "${commandValue}". File sent: ${kPath}${randomImage}`);
            } else {
                message.channel.send("You mentioned an invalid user.");
            }
        } else if(commandValue.startsWith("!killugon hug")) {
            const targetUser = message.mentions.users.first();
            if(targetUser) {
                const images = fs.readdirSync('./hugs/');
                const kPath = './hugs/'
                const randomImage = random(images);
                const attachImg = new MessageAttachment(kPath + randomImage, randomImage);

                const embedMsg = new MessageEmbed()
                    .setTitle(`${message.member.nickname} hugs ${targetUser.username}! Aww 🥺`)
                    .setDescription("All the hugs images are safe of NSFW")
                    .setColor("GOLD")
                    .setImage(`attachment://${randomImage}`)
                message.channel.send({embeds: [embedMsg], files: [kPath + randomImage]});
                console.log(`${message.member.nickname} used "${commandValue}". File sent: ${kPath}${randomImage}`);
            } else {
                message.channel.send("You mentioned an invalid user.");
            }
        } else {
            message.channel.send("You typed an invalid command.");
        }
    });
    */