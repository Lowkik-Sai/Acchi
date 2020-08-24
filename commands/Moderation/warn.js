const Discord = require('discord.js');
const db = new (require("quick.db").table)("guilds")

module.exports = {
    name: 'warn',
    description: 'warns someone',
    
    execute(client, message, args) {
     
       let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
       let reason = args.slice(1).join(' ') || "Not Specified"
       if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You need ``Manage Messages`` permission in order to execute this command!");
       if(!member) return syntax(client, message);
       if(db.get(`${message.guild.id}.cases`) == undefined) db.set(`${message.guild.id}.cases`, []);
       let currentWarns = db.get(`${message.guild.id}.cases`).find((u) => u.ID == member.user.id) || { cases: [{ caseN: 0 }] };
       if(currentWarns.cases.sort((a, b) => b.caseN-a.caseN)[0].caseN > 0) {
        let data = db.get(`${message.guild.id}.cases`).filter((u) => u.ID != member.user.id);
        currentWarns.cases.push({
            caseN: currentWarns.cases.sort((a,b) => b.caseN-a.caseN)[0].caseN+1,
            reason: reason
        })
        data.push(currentWarns);
        db.set(`${message.guild.id}.cases`, data);
       }
       else db.push(`${message.guild.id}.cases`,{
           ID: member.id,
  	       cases: [{
                caseN: currentWarns.cases.sort((a,b) => b.caseN-a.caseN)[0].caseN+1,
                reason: reason
        }]});
       member.send(`You have been warned in **${message.guild.name}** for: ${reason}`).catch((e) => {
        message.channel.send(`${member.user.toString()} you have been warned in ${message.guild.name} for ${reason}, I couldn't send you via DM because your DMs are maybe off or you blocked me!`);
       });
       message.delete();
       let embed = new Discord.MessageEmbed();
       embed.setTitle(`A member has been warned `);
       embed.setColor(`#f7c203`)
       embed.setDescription(`Successfully warned ${member.toString()}\nReason: ${args.slice(1).join(' ') || "Not Specified"}`);
       embed.setFooter(`Executed by ${message.author.tag}`, message.author.displayAvatarURL());
       return message.channel.send({embed: embed})

    }
}

function syntax(client, message){

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Warn Help - c!warn`);
    embed.setDescription(`**Description:** Warns a user!
    **Usage**: ${client.config.prefix}warns {user} 
    **Example**: 
    ${client.config.prefix}warn ${client.user.toString()} Being a jerk!\n ${client.config.prefix}warn 688256825069666395 DM Advertising!`);
    return message.channel.send({embed: embed})

}
