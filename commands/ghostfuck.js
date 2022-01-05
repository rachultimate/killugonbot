module.exports = {
    name: 'ghostfuck',
    description: 'ghostfucks someone',
    execute(client, message) {
        const commandAuthor = message.author;
        const commandAuthorUsername = commandAuthor.username;
        const commandAuthorTag = (message.author.username) + "#" + (message.author.discriminator);
        const targetUser = message.mentions.users.first();
        const commandValue = message.content;

        const commandSplit = commandValue.split(/ +/);
        const getCommandSuffix = commandSplit.slice(2, commandSplit.length);
        let getSuffix = "";
        for(let i = 0; i <= getCommandSuffix.length; i++) {
            if(getSuffix === "") {
                getSuffix = getCommandSuffix[i];
            } else {
                if(getCommandSuffix[i]) {
                    getSuffix = getSuffix + " " + getCommandSuffix[i];
                }
            }
        }
        if(targetUser) {
            const targetUserUsername = targetUser.username;
            const targetUserSplit = targetUser.substr(0, targetUserUsername.length / 2);
            message.channel.send("**" + commandAuthorUsername + "** ghostfucks ||" + targetUserSplit + "...||! Silent as Killua steps, huh? 😏");
        } else {
            if(getSuffix.includes("you know") === true) {
                if(commandAuthor.id === "392839201034338316") {
                    message.channel.send("Oh yeah boss, I do know who 😏").then((message) => {message.reply("**rach** ghostfucks... he**__R__** 👀")})
                } else if(commandAuthor.id === "705514779002798171") {
                    message.channel.send("Yeah Koowy, I know who it is 😏").then((message) => {message.reply("**Koowy** ghostfucks her... oh **__M__**y- 👀")})
                } else if(commandAuthor.id === "754175330754756648") {
                    message.reply("H-HUH? I... I DO BUT- 😳");
                } else {
                    message.reply("I- I don't know who you are talking about 😇")
                }
            } else {
                message.reply("You mentioned an invalid user");
            }
        }
        console.log(`${commandAuthorTag} used ${commandValue} on channel: #${message.channel.name}`);
    }
}