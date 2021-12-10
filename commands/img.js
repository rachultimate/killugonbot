var fs = require('fs');

module.exports = {
    name: 'img',
    description: 'send a random killugon img',
    execute(client, message) {
        const images = fs.readdirSync('/imgs').filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.PNG') || file.endsWith('.JPG') || file.endsWith('.JPEG'));
        const randomImage = random(images);
        const attachImg = new MessageAttachment(path + randomImage, randomImage);

        const embedMsg = new MessageEmbed()
            .setTitle("Killua x Gon")
            .setDescription("Killugon fanart from Pinterest :3")
            .setImage(`attachment://${randomImage}`)
            .setColor('AQUA');

        message.channel.send({ embeds: [embedMsg], files: [path + randomImage] });
        console.log(`${message.member.nickname} used "${commandValue}". File sent: ${path}${randomImage}`);
    }
}
