const {MessageAttachment, MessageEmbed} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'hug',
    description: 'Hugs someone',
    execute(client, message) {
        const commandUser = message.member.user.username;
        const commandUserTag = (message.author.username) + "#" + (message.author.discriminator);
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
                .setTitle(`${commandUser} hugs ${commandTarget}! Aww 🥺`)
                .setDescription("All the hugs images are safe of NSFW")
                .setColor("GOLD")
                .setImage(`attachment://${randomImage}`)
            message.reply({embeds: [embedMsg], files: [kPath + randomImage]});
            console.log(`${commandUserTag} used "${commandValue}". File sent: ${kPath}${randomImage}`);
        } else if(targetRole) {
            targetRole.members.forEach(guildMember => {
                const mentionedUser = guildMember.user.username;
                const commandUser = message.member.user.username;
                if(mentionedUser != commandUser && mentionedUser) {
                    if(eachMember == "") {
                        eachMember = mentionedUser;
                    } else {
                        eachMember = eachMember + " and " + mentionedUser;
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
                .setFooter(`Request by ${commandUserTag}`);
            message.reply({embeds: [embedMsg], files: [kPath + randomImage]});
            console.log(`${commandUserTag} used "${commandValue}". File sent: ${kPath}${randomImage}`);
        } else {
            message.reply("You mentioned an invalid user.");
        }
    }
}