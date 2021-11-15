module.exports = (Discord, client, message) => {
    const prefix = "!killugon"; //Define prefix
    var cmdLC = message.content.toLowerCase(); //Put the command in lower cases

    //Replace the alias by the original command prefix
    if(cmdLC.startsWith("!killugon")) {
        cmdLC = cmdLC.replace(/!killugon/, '!killugon ');
    }

    if(cmdLC.startsWith("!kg")) {
        cmdLC = cmdLC.replace(/!kg/, '!killugon ');
    }

    if(cmdLC.startsWith("!gk")) {
        cmdLC = cmdLC.replace(/!gk/, '!killugon ');
    }

    if(cmdLC.startsWith("!gonkillu")) {
        cmdLC = cmdLC.replace(/!gonkillu/, '!killugon ');
    }

    //If the command doesn't starts with the prefix or if the bot was the authour of the command, return
    if(!cmdLC.startsWith(prefix) || message.author.bot) return;

    //Removes the prefix and get only the command
    const commandValue = cmdLC.replace(/!killugon +/, '');
    const cmd = commandValue.split(' ').shift();

    //Execute the "help" command
    if(cmdLC === "!killugon ") {
        const helpCmd = client.commands.get("help");
        helpCmd.execute(client, message, Discord);
    }

    //Execute the command
    const command = client.commands.get(cmd);
    if(command) command.execute(client, message, Discord);
}