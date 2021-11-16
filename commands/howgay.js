const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'howgay',
    description: 'shows how gay you or someone is',
    execute(client, message) {
        const GayPercentage = Math.floor(Math.random() * (100 - 80 + 1) + 80);

        const mentionedUser = message.mentions.users.first();

        if(mentionedUser) {
            const userNickname = mentionedUser.username;
            const embedMsg = new MessageEmbed()
            .setTitle("How Gay Machine >:3")
            .setDescription(`${userNickname} is **${GayPercentage}%** gay! Nice 😌🏳️‍🌈`)
            .setColor("RED");
    
            message.reply({embeds: [embedMsg]});
        } else {
        const embedMsg = new MessageEmbed()
        .setTitle("How Gay Machine >:3")
        .setDescription(`You're **${GayPercentage}%** gay! Nice 😌🏳️‍🌈`)
        .setColor("RED");

        message.reply({embeds: [embedMsg]});
        }
    }
}