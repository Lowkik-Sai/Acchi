const Discord = require('discord.js')
const db = new (require("quick.db").table)("guilds");

module.exports = {
    name: "new",
    aliases: ["t"],
    description: "Create a support ticket",
    async execute (client, message, args) {

        let ticketsys = db.fetch(`${message.guild.id}.ticketsys`);
        if(!ticketsys) return message.channel.send("Run ``c!config ticket`` to setup the ticket system!");
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I need \`Manage Channels\` permision in order to execute this command!");
        if(message.guild.channels.cache.filter((c) => c.type == "text" && c.parentID == ticketsys.cat && new RegExp(`${message.author.username}-[0-9]{4}`, "i").test(c.name)).size == 1) return message.reply(`You already have an open ticket!`);

        let position = message.guild.channels.cache.filter((c) => c.type == "text" && c.parentID == ticketsys.cat).size || 0;
        let chan = await message.guild.channels.create(`${message.author.username}-${String(position+1).padStart(4, "0")}`,{
            type: "text",
            topic: `Support for ${message.author.username}`,
            nsfw: false,
            parent: db.get(`${message.guild.id}.ticketsys.cat`),
            permissionOverwrites: [{
                id: message.guild.roles.everyone,
                deny: ["SEND_MESSAGES","VIEW_CHANNEL"],
            },{
                id: message.author.id,
                allow: ["SEND_MESSAGES","VIEW_CHANNEL"]
            }]
        });
        
        db.push(`${message.guild.id}.ticketsys.channels`, chan.id);

        const response = new Discord.MessageEmbed();
        response.setTitle(`Ticket ${message.author.username}-${Number(chan.position)+1}`);
        response.setColor("RANDOM");
        response.setDescription(`${chan.toString()} has been created for you!`);

        message.channel.send({embed: response});
        
        const embed2 = new Discord.MessageEmbed();
        embed2.setColor("#47ba78");
        embed2.setDescription(`Thank you for contacting us ${message.author}!\n Our Support Team will be with you shortly! Please remember that opening a ticket just to mess around with staff is strongly prohibited! It can lead you to a temporary mute!`);
        embed2.setAuthor(`New Ticket`,`${args.join(" ")}`);
        embed2.setFooter(`Ticket ID #${String(chan.position+1).padStart(4, "0")}`);
        embed2.setThumbnail(message.author.displayAvatarURL());

        return await (await chan.send(embed2)).pin();
        
    }
}
