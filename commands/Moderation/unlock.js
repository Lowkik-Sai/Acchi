const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'unlock',
    description: 'unlock the current channel',

    execute(client, message, args) {
        
        if(!message.member.hasPermission("MANAGE_CHANNELS")) message.reply("You need to have Manage Server permission to lock this channel")

        message.channel.createOverwrite(message.guild.id, {
            SEND_MESSAGES: true
        });

        let embed = new MessageEmbed()
        .setTitle("Unlocked Channel :unlock:")
        .setColor("#FFFF")
        message.channel.send(embed)
    }
}
