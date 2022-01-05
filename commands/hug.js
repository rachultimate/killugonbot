const {MessageAttachment, MessageEmbed} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'hug',
    description: 'Hugs someone',
    execute(client, message) {
        const commandAuthor = message.author;
        const commandAuthorUsername = commandAuthor.username;
        const commandAuthorTag = (message.author.username) + "#" + (message.author.discriminator);
        const targetUser = message.mentions.users.first();
        const commandValue = message.content;

        let eachMember = "";
        const targetRole = message.mentions.roles.first();

        if(targetUser) {
            const commandTarget = targetUser.username;

            const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
            const images = fs.readdirSync('./hugs/');
            const kPath = './hugs/'
            const randomImage = random(images);
            const attachImg = new MessageAttachment(kPath + randomImage, randomImage);

            const embedMsg = new MessageEmbed()
                .setTitle(`${commandAuthorUsername} hugs ${commandTarget}! Aww 🥺`)
                .setDescription("All the hugs images are safe of NSFW")
                .setColor("GOLD")
                .setImage(`attachment://${randomImage}`)
            message.reply({embeds: [embedMsg], files: [kPath + randomImage]});
            console.log(`${commandAuthorTag} used "${commandValue} on channel: #${message.channel.name}". File sent: ${kPath}${randomImage}`);
        } else if(targetRole) {
            targetRole.members.forEach(guildMember => {
                const guildUser = guildMember.user;
                const guildUserUsername = guildUser.username;
                if(guildUser && guildUser != commandAuthor) {
                    if(eachMember == "") {
                        eachMember = guildUserUsername;
                    } else {
                        eachMember = eachMember + " and " + guildUserUsername;
                    }
                }
            });
            const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
            const images = fs.readdirSync('./hugs/');
            const kPath = './hugs/'
            const randomImage = random(images);
            const attachImg = new MessageAttachment(kPath + randomImage, randomImage);

            const embedMsg = new MessageEmbed()
                .setTitle(`${commandAuthorUsername} hugs ${eachMember}! Aww 🥺`)
                .setDescription("All the hugs images are safe of NSFW")
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