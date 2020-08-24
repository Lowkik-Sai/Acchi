const Discord = require('discord.js');

module.exports = {
    name: "pin",
    execute(client, message, args) {

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You need `Manage Messages` permission in order to execute this command");
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I need `Manage Messages` permission in order to execute this command");
        if(!isNaN(args[0])) return message.channel.send("Message ID must be a number");

        let msg = message.channel.messages.fetch(args[0]);
        if(!msg) return message.channel.send("Invalid Message ID");
        msg.pin();
        return message.channel.send(`Successfully pinned ${args[0]}`);

    }
}

function syntax(client, message){

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Pin Help - c!pin`);
    embed.setDescription(`**Description:** Adds a role to the specific member mentioned!
    **Usage**: ${client.config.prefix}pin {msgID} 
    **Example**: 
    ${client.config.prefix}pin ${message.id}`);
    return message.channel.send({embed: embed})

}
