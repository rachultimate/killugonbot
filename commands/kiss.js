const {MessageAttachment, MessageEmbed} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'kiss',
    description: 'Kiss someone',
    execute(client, message) {
        const commandAuthor = message.author;
        const commandAuthorUsername = commandAuthor.username;
        const commandAuthorTag = (message.author.username) + "#" + (message.author.discriminator);
        const targetUser = message.mentions.users.first();
        const commandValue = message.content;
        
        if(targetUser) {
            const commandTarget = targetUser.username;
            const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
            const images = fs.readdirSync('./kisses/');
            const kPath = './kisses/'
            const randomImage = random(images);
            const attachImg = new MessageAttachment(kPath + randomImage, randomImage);

            const embedMsg = new MessageEmbed()
                .setTitle(`${commandAuthorUsername} kissed ${commandTarget}! How cute :3`)
                .setDescription("All the kiss images are safe of NSFW")
                .setColor("GOLD")
                .setImage(`attachment://${randomImage}`)
                .setFooter(`Request by ${commandAuthorTag}`);
            message.reply({embeds: [embedMsg], files: [kPath + randomImage]});
            console.log(`${commandAuthorTag} used "${commandValue} on channel: #${message.channel.name}". File sent: ${kPath}${randomImage}`);
        } else {
            message.reply("You mentioned an invalid user.");
        }
    }
}