const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Shows the help message',
    execute(client, message) {
        const embedMsg = new MessageEmbed()
        .setTitle("Killugon Bot")
        .setDescription("About Killugon Bot")
        .addFields(
            {name: '\u200b', value: 'Commands:'},
            {name: "!kg img", value: "Send a random killugon image from Pinterest"},
            {name: "!kg gif", value: "Send a random killugon GIF from Pinterest"},
            {name: "!kg kiss @user", value: "Kiss an user"},
            {name: "!kg hug @user/@role", value: "Hugs an user or everyone in a role"},
            {name: "!kg howgay @user", value: "Shows how much gay someone is >:3"},
            {name: 'Prefixes: !killugon, !gonkillu, !kg, !gk', value: '\u200b'},
            {name: "Developed by:", value: "rach#7705", inline: true},
            {name: "For the server:", value: "⚡Killua_Zoldyck Original Server⚡", inline: true},
        )
        .setImage('https://cdn.discordapp.com/app-icons/903714022975746108/4cd1dda28fae71e3c228708f2ea28eb5.png')
        .setFooter('Killugon IS canon >:3 🏳️‍🌈')
        .setColor('ORANGE');

        message.channel.send({embeds: [embedMsg]})
    }
}