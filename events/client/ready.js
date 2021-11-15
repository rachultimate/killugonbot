const fs = require('fs');
const avatars = fs.readdirSync('./avatars');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = (Discord, client) => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity("!kg", {type: 'WATCHING'});

    function changeAvatar() {
        const path = './avatars/';
        const newAvatar = path + random(avatars);
        client.user.setAvatar(newAvatar);
        console.log(`Avatar changed to ${newAvatar}`);
    }
    setInterval(changeAvatar, 500000);
}