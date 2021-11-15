module.exports = {
    name: 'gif',
    description: 'Send a random killugon gif',
    execute(client, message) {
        const images = fs.readdirSync('./imgs').filter(file => file.endsWith('.gif') || file.endsWith('.GIF'));
        const randomImage = random(images);
        const attachImg = new MessageAttachment(path + randomImage, randomImage);

        const embedMsg = new MessageEmbed()
            .setTitle("Killua x Gon")
            .setDescription("Killugon GIF from Pinterest :3")
            .setImage(`attachment://${randomImage}`)
            .setColor('GREEN');

        message.channel.send({ embeds: [embedMsg], files: [path + randomImage] });
        console.log(`${message.member.nickname} used "${commandValue}". File sent: ${path}${randomImage}`);
    }
}