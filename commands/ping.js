module.exports = {
    name: 'ping',
    description: 'replies with pong and users ping',
    execute(client, message) {
        message.reply("Pong! Calculating...").then(resultMessage => {
            const latency = resultMessage.createdTimestamp - message.createdTimestamp; 
            message.reply(`**Bot latency:** ${latency}ms \n**API latency:** ${client.ws.ping}ms`);
        });
    }
}