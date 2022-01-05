const {MessageAttachment, MessageEmbed} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'fuck',
    description: 'F*ck someone',
    execute(client, message) {
        if(!message.channel.nsfw) {
            message.reply("This command is only allowed on NSFW channels");
            return;
        }
        const commandAuthor = message.author;
        const commandAuthorUsername = commandAuthor.username;
        const commandAuthorTag = (message.author.username) + "#" + (message.author.discriminator);
        const targetUser = message.mentions.users.first();
        const commandValue = message.content;
        
        if(targetUser) {
            if(targetUser === commandAuthor) {
                message.reply("You wanna fuck yourself or what?");
                return;
            }
            const commandTarget = targetUser.username;
            const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
            const images = fs.readdirSync('./fuck/');
            const kPath = './nsfw/'
            const randomImage = random(images);
            const attachImg = new MessageAttachment(kPath + randomImage, randomImage);

            const embedMsg = new MessageEmbed()
                .setTitle(`${commandAuthorUsername} is doing... Uhm... with ${commandTarget} 😳`)
                .setDescription("B-Baka!")
                .setColor("RED")
                .setImage(`attachment://${randomImage}`)
                .setFooter(`Request by ${commandAuthorTag}`);
            message.reply({embeds: [embedMsg], files: [kPath + randomImage]});
            console.log(`${commandAuthorTag} used "${commandValue} on channel: #${message.channel.name}". File sent: ${kPath}${randomImage}`);
        } else {
            message.reply("You mentioned an invalid user.");
        }
    }
}