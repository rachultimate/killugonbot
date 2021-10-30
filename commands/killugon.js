//Send a Killugon img / gif
const fs = require('fs');
const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

//Function to get a random value
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const path = './imgs/'

module.exports = {
    data: new SlashCommandBuilder()
        .setName("killugon")
        .setDescription("Send a random killugon image or gif")
        .addStringOption(option => option.setName("type").setDescription("Choose between IMG or GIF").addChoice("IMG", "img").addChoice("GIF", "gif").setRequired(true)),
    async execute(interaction) {
        const stringtyped = interaction.options.getString("type");
        if(stringtyped === "img") {
            const images = fs.readdirSync('./imgs').filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.PNG') || file.endsWith('.JPG') || file.endsWith('.JPEG'));
            const randomImage = random(images);
            const attachImg = new MessageAttachment(path + randomImage, randomImage);
            const embedMsg = new MessageEmbed()
                .setTitle("Killua x Gon")
                .setDescription("Killugon fanart from Pinterest :3")
                .setImage(`attachment://${randomImage}`);
            await interaction.reply({ embeds: [embedMsg], files: [path + randomImage] })
        } else if(stringtyped === "gif") {
            const images = fs.readdirSync('./imgs').filter(file => file.endsWith('.gif') || file.endsWith('.GIF'));
            const randomImage = random(images);
            const attachImg = new MessageAttachment(path + randomImage, randomImage);
            const embedMsg = new MessageEmbed()
                .setTitle("Killua x Gon")
                .setDescription("Killugon GIF from Pinterest :3")
                .setImage(`attachment://${randomImage}`);
            await interaction.reply({ embeds: [embedMsg], files: [path + randomImage] })
        } else if(!stringtyped) {
            const images = fs.readdirSync('./imgs').filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.gif') || file.endsWith('.jpeg') || file.endsWith('.PNG') || file.endsWith('.JPG') || file.endsWith('.JPEG') || file.endsWith('.GIF'));
            const randomImage = random(images);
            const attachImg = new MessageAttachment(path + randomImage, randomImage);
            const embedMsg = new MessageEmbed()
                .setTitle("Killua x Gon")
                .setDescription("Killugon fanart from Pinterest :3")
                .setImage(`attachment://${randomImage}`);
            await interaction.reply({ embeds: [embedMsg], files: [path + randomImage] })   
        }
    }
}