const {MessageAttachment, MessageEmbed} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'kiss',
    description: 'Kiss someone',
    execute(client, message, mentionedUser) {
        const targetUser = message.mentions.users.first();
        if(targetUser) {
            const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
            const images = fs.readdirSync('./kisses/');
            const kPath = './kisses/'
            const randomImage = random(images);
            const attachImg = new MessageAttachment(kPath + randomImage, randomImage);

            const embedMsg = new MessageEmbed()
                .setTitle(`${message.member.nickname} kissed ${targetUser.username}! How cute :3`)
                .setDescription("All the kiss images are safe of NSFW")
                .setColor("GOLD")
                .setImage(`attachment://${randomImage}`)
            message.reply({embeds: [embedMsg], files: [kPath + randomImage]});
            console.log(`${message.member.nickname} used "!killugon kiss". File sent: ${kPath}${randomImage}`);
        } else {
            message.reply("You mentioned an invalid user.");
        }
    }
}