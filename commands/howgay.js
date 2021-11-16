const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'howgay',
    description: 'shows how gay you or someone is',
    execute(client, message) {
        const GayPercentage = Math.floor(Math.random() * (100 - 80 + 1) + 80);
        let compliment;
        if(GayPercentage < 95) {
            compliment = "Nice 😌🏳️‍🌈";
        } else if(GayPercentage < 100) {
            compliment = "**Amazing** 😍🏳️‍🌈";
        } else if(GayPercentage == 100) {
            compliment = "**__PERFECT!!__** 🥺🏳️‍🌈";
        }
        const mentionedUser = message.mentions.users.first();

        if(mentionedUser) {
            const userNickname = mentionedUser.username;
            const embedMsg = new MessageEmbed()
            .setTitle("How Gay Machine >:3")
            .setDescription(`${userNickname} is **${GayPercentage}%** gay! ${compliment}`)
            .setColor("RED");
    
            message.reply({embeds: [embedMsg]});
        } else {
        const embedMsg = new MessageEmbed()
        .setTitle("How Gay Machine >:3")
        .setDescription(`You're **${GayPercentage}%** gay! ${compliment}`)
        .setColor("RED");

        message.reply({embeds: [embedMsg]});
        }
    }
}