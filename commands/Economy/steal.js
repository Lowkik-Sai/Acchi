const db = new (require("quick.db").table)("economy");
const {MessageEmbed} = require('discord.js')
const ms = require('parse-ms');

module.exports = {
    name: 'steal',
    description: 'steal money',

    execute(client, message, args) {
        let user = message.mentions.members.first()
        let targetuser = db.fetch(`${user.id}.money`) 
        let author = db.fetch(`${message.author.id}.money`)
        let timeoutworked = 370000
        let worked =  db.fetch(`${message.author.id}.robbed`)
    
        if (worked != null && timeoutworked - (Date.now() - worked) > 0) {
            let time = ms(timeoutworked - (Date.now() - worked));
            message.channel.send(`You have already stolen please come back in **${time.hours}h ${time.minutes}m ${time.seconds}s**`).catch(console.error);


        } else {
        if (!user) {
            return message.channel.send('Oi who you robbing').catch(console.error);
        }
        if (author < 250) { 
            return message.channel.send(':x: You need atleast 250:money_with_wings: to rob somebody.').catch(console.error);
        }
    
        if (targetuser == 0) { 
            return message.channel.send(`:x: ${user.user.username} does not have anything to rob its not worth it`).catch(console.error);
        }
    
    
        let random = Math.floor(Math.random() * 200) + 1; 
    
        let embed = new MessageEmbed()
        .setDescription(`${message.author} you robbed ${user} and stole ${random}:money_with_wings:`)
        .setColor("GREEN")
        .setTimestamp()
        message.channel.send(embed).catch(console.error);
    
        db.subtract(`${user.id}.money`, random)
        db.add(`${message.author.id}.money`, random)
        db.set(`${message.author.id}.robbed`, Date.now())
    }
}
}