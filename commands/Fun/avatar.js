const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: 'Returns an avatar for a specified user',

    execute(client, message, args) {
        if (args[0]) {
            const user = message.mentions.users.first() || client.users.cache.get(args[0])
            if (!user) {
                return message.reply('Please use a proper mention if you want to see someone else\'s avatar.').catch(console.error);
            };
            let avatarEmbed = new Discord.MessageEmbed()
                .setTitle(`Here is ${user.username}\'s avatar`)
                .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
            return message.channel.send(avatarEmbed).catch(console.error);
        };

        let avatarEmbed = new Discord.MessageEmbed()
            .setTitle(`Here is your avatar ${message.author.tag}`)
            .setImage(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        message.channel.send(avatarEmbed).catch(console.error);
    }
}
