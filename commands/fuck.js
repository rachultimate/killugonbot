const {MessageAttachment, MessageEmbed} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'fuck',
    description: 'F*ck someone',
    execute(client, message, mentionedUser) {
        const commandUser = message.member.user.username;
        const commandUserTag = (message.author.username) + "#" + (message.author.discriminator);
        const targetUser = message.mentions.users.first();
        const commandValue = message.content;
        
        if(targetUser) {
            const commandTarget = targetUser.username;
            const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
            const images = fs.readdirSync('./nsfw/');
            const kPath = './nsfw/'
            const randomImage = random(images);
            const attachImg = new MessageAttachment(kPath + randomImage, randomImage);

            const embedMsg = new MessageEmbed()
                .setTitle(`${commandUser} is doing... Uhm... with ${commandTarget} 😳`)
                .setDescription("B-Baka!")
                .setColor("RED")
                .setImage(`attachment://${randomImage}`)
                .setFooter(`Request by ${commandUserTag}`);
            message.reply({embeds: [embedMsg], files: [kPath + randomImage]});
            console.log(`${commandUserTag} used "${commandValue}". File sent: ${kPath}${randomImage}`);
        } else {
            message.reply("You mentioned an invalid user.");
        }
    }
}