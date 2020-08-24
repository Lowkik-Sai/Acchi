const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'ban a member',
    
    execute(client, message, args) {
     
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need the ``Ban`` permission to use this command!")
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I don\'t have the right permissions.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return syntax(client, message);

        if(!member) return message.channel.send("I can't find this user to ``ban``, please check the user or id again!");
        if(!member.bannable) return message.channel.send('This user can\'t be banned. It is either because they are a mod/admin, or their highest role is higher than mine');

        if(member.id === message.author.id) return message.channel.send('Bruh, you can\'t ban yourself!');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Unspecified';

        member.ban(reason)
        .catch(err => {
            if(err) return message.channel.send('Something went wrong')
        })

        message.delete();
        const banembed = new Discord.MessageEmbed()
        .setTitle('A Member has been banned <:banhammer:726545700007051285>')
        .setDescription(`Successfully <:TickGreen:715595196032745643> banned ${member.user.toString()}\nReason: ${args.slice(1).join(' ') || "Not Specified"}`)
        .setColor("#7e2d2d")
        .setFooter(`Executed by ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send(banembed);

    }
}

function syntax(client, message){

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Ban Help - c!ban`);
    embed.setDescription(`**Description:** Ban a user from the server!
    **Usage**: ${client.config.prefix}ban {user} {reason}
    **Example**: 
    ${client.config.prefix}ban ${client.user.toString()} Shit posting \n c!ban 688256825069666395 Acting rude`);
    return message.channel.send({embed: embed})

}
