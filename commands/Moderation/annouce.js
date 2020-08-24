const Discord = require('discord.js');

module.exports = {
    name: "announce",
    async execute(client, message, args) {

        await message.delete();
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have ``Manage Guild`` perms to execute this command!");
        if(!args[0]) return syntax(client, message);
        
        let embed = new Discord.MessageEmbed();
        embed.setTitle(`Announcement<:grey_exclamation:726204109119553617>`);
        embed.setColor(`RANDOM`);
        embed.setThumbnail(message.guild.iconURL());
        embed.setDescription(args.join(' '));
        embed.setTimestamp()
        embed.setFooter(`Announced by ${message.author.username}`, message.author.displayAvatarURL());
        return message.channel.send({embed: embed});
        
    }
}

function syntax(client, message){

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Announce Help - c!announce`);
    embed.setDescription(`**Description:** Create embed text is specified by user!
    **Usage**: ${client.config.prefix}announce {annoucement} 
    **Example**: 
    ${client.config.prefix}announce We are revamping! \n ${client.config.prefix}announce #giveaways We are giving away Bots! <:tada:726207311319924813>`);
    return message.channel.send({embed: embed})

}
