const {MessageAttachment, MessageEmbed} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'hug',
    description: 'Hugs someone',
    execute(client, message) {
        const targetUser = message.mentions.users.first();

        let eachMember = "";
        const targetRole = message.mentions.roles.first();

        if(targetUser) {
            const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
            const images = fs.readdirSync('./hugs/');
            const kPath = './hugs/'
            const randomImage = random(images);
            const attachImg = new MessageAttachment(kPath + randomImage, randomImage);

            const embedMsg = new MessageEmbed()
                .setTitle(`${message.member.nickname} hugs ${targetUser.username}! Aww 🥺`)
                .setDescription("All the hugs images are safe of NSFW")
                .setColor("GOLD")
                .setImage(`attachment://${randomImage}`)
            message.reply({embeds: [embedMsg], files: [kPath + randomImage]});
            console.log(`${message.member.nickname} used "!killugon hug". File sent: ${kPath}${randomImage}`);
        } else if(targetRole) {
            targetRole.members.forEach(guildMember => {
                if(guildMember.user.username) {
                    if(eachMember == "") {
                        eachMember = guildMember.user.username;
                    } else {
                        eachMember = eachMember + " and " + guildMember.user.username;
                    }
                }
            });
            const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
            const images = fs.readdirSync('./hugs/');
            const kPath = './hugs/'
            const randomImage = random(images);
            const attachImg = new MessageAttachment(kPath + randomImage, randomImage);

            const embedMsg = new MessageEmbed()
                .setTitle(`${message.member.nickname} hugs ${eachMember}! Aww 🥺`)
                .setDescription("All the hugs images are safe of NSFW")
                .setColor("GOLD")
                .setImage(`attachment://${randomImage}`)
            message.reply({embeds: [embedMsg], files: [kPath + randomImage]});
            console.log(`${message.member.nickname} used "!killugon hug". File sent: ${kPath}${randomImage}`);
        } else {
            message.reply("You mentioned an invalid user.");
        }
    }
}