const {MessageEmbed} = require('discord.js');
const db = new (require("quick.db").table)("guilds");

module.exports = {
    name: 'unlockall',
    description: 'lockdown the current channel',

    execute(client, message, args) {
       
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You need Manage Server permission in order to execute this command!`);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`I need Manage channels permission in order to execute this command!`);

        let channels = db.has(`${message.guild.id}.lockdownChannels`) ? db.get(`${message.guild.id}.lockdownChannels`) : message.guild.channels.cache;
        Promise.all(channels.map(async (cID) => {
            let c = typeof cID == "string" ? message.guild.channels.cache.get(cID) : cID; 
            if(!c) return;
            let channel = await c.overwritePermissions([{
                id: message.guild.roles.everyone,
                allow: ["SEND_MESSAGES"]
             }]);
             return channel;
        })).then((channels) => {
            let embed = new MessageEmbed();
            embed.setTitle(`UnLock Successful`);
            embed.setColor(`GREEN`);
            embed.setDescription(`Unlocked channels:\n${channels.map((c) => c.toString()).join('\n')}`);
            embed.setFooter(`Executed by ${message.author.tag}`, message.author.displayAvatarURL());
            return message.channel.send({embed: embed});
        }).catch((e) => {
            console.log(e);
            return message.channel.send(`Sorry something went wrong`);
        });

    }
}