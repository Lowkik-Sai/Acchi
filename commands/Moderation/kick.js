const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'kick a member',
    
    execute(client, message, args) {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You need the ``Kick`` permission to use this command!')
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('I don\'t have the right permissions.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return syntax(client, message);

        if(!member) return message.channel.send("I can't find this user to ``kick``, please check the user or id again!");
        if(!member.kickable) return message.channel.send('This user can\'t be kicked. It is either because they are a mod/admin, or their highest role is higher than mine');

        if(member.id === message.author.id) return message.channel.send('Bruh, you can\'t kick yourself!');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Unspecified';

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send('Something went wrong')
        })
        message.delete();
        const kickembed = new Discord.MessageEmbed()
        .setTitle('A Member has been kicked <:452383removebgpreview:726555189867446332>')
        .setDescription(`Successfully <:TickGreen:715595196032745643> kicked ${member.user.toString()}\nReason: ${args.slice(1).join(' ') || "Not Specified"}`)
        .setColor("#2574bb")
        .setFooter(`Executed by ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send(kickembed);
    }
}

function syntax(client, message){

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Kick Help - c!kick`);
    embed.setDescription(`**Description:** Clear warnings from a user from a server!
    **Usage**: ${client.config.prefix}kick {user} {reason}
    **Example**: 
    ${client.config.prefix}kick ${client.user.toString()} being a retard!\n ${client.config.prefix}kick 688256825069666395 Disrespectful to staffs!`);
    return message.channel.send({embed: embed})

}
