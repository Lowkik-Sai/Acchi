const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'lockdown',
    description: 'lockdown the current channel',

    execute(client, message, args) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You dont have sufficient permissions to lock this channel")

        message.channel.createOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        });

        let embed = new MessageEmbed()
        .setTitle("Locked Channel :lock:")
        .setColor("#FFFF")
        message.channel.send(embed)
    }
}
