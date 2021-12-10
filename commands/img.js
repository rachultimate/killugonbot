const {MessageEmbed, MessageAttachment} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'img',
    description: 'send a random killugon img',
    execute(client, message) {
        const commandValue = message.content;
        const commandUser = (message.author.username) + "#" + (message.author.discriminator);

        const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const images = fs.readdirSync('./imgs/').filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.PNG') || file.endsWith('.JPG') || file.endsWith('.JPEG'));
        const randomImage = random(images);

        const path = './imgs/';
        const attachImg = new MessageAttachment(path + randomImage, randomImage);

        const embedMsg = new MessageEmbed()
            .setTitle("Killua x Gon")
            .setDescription("Killugon fanart from Pinterest :3")
            .setImage(`attachment://${randomImage}`)
            .setColor('AQUA')
            .setFooter(`Request by ${commandUser}`);

        message.reply({ embeds: [embedMsg], files: [path + randomImage] });
        console.log(`${commandUser} used "${commandValue}". File sent: ${path}${randomImage}`);
    }
}
