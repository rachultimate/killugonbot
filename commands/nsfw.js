const { MessageEmbed, MessageAttachment } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: 'nsfw',
    description: 'Send a random NSFW Killugon image',
    execute(client, message) {
        const messageAuthor = message.author;
        const messageAuthorTag = messageAuthor.tag;
        const commandValue = message.content;

        if(!message.channel.nsfw) {
            message.reply("This command is only allowed in NSFW channels");
            return;
        }

        const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const nsfwImages = fs.readdirSync('./nsfw/');
        const nPath = './nsfw/';
        const randomImage = random(nsfwImages);
        const attachImg = new MessageAttachment(nPath + randomImage, randomImage);

        const embedMsg = new MessageEmbed()
        .setTitle("Killua x Gon")
        .setDescription("Killugon random NSFW image 🔞")
        .setColor("NOT_QUITE_BLACK")
        .setImage(`attachment://${randomImage}`)
        .setFooter(`Requested by: ${messageAuthorTag}`)

        message.reply({embeds: [embedMsg], files: [nPath + randomImage]});
        console.log(`${messageAuthorTag} used ${commandValue} on #${message.channel.name}. File sent: ${nPath}${randomImage}`);
    }
}