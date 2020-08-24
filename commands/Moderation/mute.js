const {MessageEmbed} = require('discord.js');
const db = new (require("quick.db").table)("guilds");
const ms = require('ms');
const Discord = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'mute a user',

    async execute(client, message, args) {
        if(!message.member.hasPermission("MANAGE_GUILD")) message.reply("You need perms");
        if(!message.mentions.members.first() || !ms(args[1] || "g") || ms(args[2] || "g")) return syntax(client, message);
        let personBeingMuted = message.mentions.members.first()

        let role = message.guild.roles.cache.find(r => r.name === "Muted");
        if(!role){
            if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I need the ``Manage Roles`` permission in order to execute this command!");
            role = await message.guild.roles.create({
                data: {
                    name: "Muted",
                    color: "#818386",
                    hoist: false,
                    permissions: [],
                    mentionable: false
                },
                reason: "Theres no Muted role"
            });
        }

        await Promise.all(message.guild.channels.cache.map(async (c) => {
            if(!c.permissionsFor(message.guild.roles.everyone).has("VIEW_CHANNEL")) return c;
            return await c.overwritePermissions([
                {
                    id: role,
                    allow: ["VIEW_CHANNEL"],
                    deny: ["SEND_MESSAGES","ADD_REACTIONS"]
                }
            ]);
        }));

        db.push(`${message.guild.id}.mutes`,{
            ID: personBeingMuted.id,
            endDate: Date.now()+ms(args[1]),
            reason: args.slice(1).join(" ")
        });

        personBeingMuted.roles.add(role);

        return (message.channel.send({embed: new MessageEmbed().setColor('RANDOM').setDescription(`${personBeingMuted} has been muted for ${ms(ms(args[1]), { long: true })}\nReason: ${args.slice(2).join(" ") || "Not Specified"}`)})).delete({ timeout: 30000 })

    }
}

function syntax(client, message){

    let embed = new MessageEmbed();
    embed.setTitle(`Mute Help - c!mute`);
    embed.setDescription(`**Description:** Mutes a member to a limit/time if they done something wrong!
    **Usage**: ${client.config.prefix}mute {user} {time} {reason} 
    **Example**: 
    ${client.config.prefix}mute ${client.user.toString()} 35m Disrespecting Staffs! \n c!mute ${client.user.toString()} 3h not posting in the correct channel. \n c!mute ${client.user.toString()} 2d He begged me to do this!`);
    return message.channel.send({embed: embed})

}
