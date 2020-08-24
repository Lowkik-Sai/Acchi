const db = new (require("quick.db").table)("economy");
const {MessageEmbed} = require('discord.js')
const ms = require('parse-ms')

module.exports = {
    name: "daily",
    description: 'get coins everyday',

    execute(client, message, args) {
        let timeout = 86400000
        let amount = 250
        
        let daily = db.fetch(`${message.author.id}.daily`)

        if (daily != null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));
            let claimed = new MessageEmbed()
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setDescription(`You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s`)
            message.channel.send(claimed).catch(console.error);
        } else {
            let embed = new MessageEmbed()
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setColor("#FFFF")
            .setDescription(`${message.author.username} You claimed 500 coins`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
				dynamic: true,
				size: 1024,
				format: 'png'
			}))
			.setTimestamp()
            message.channel.send(embed).catch(console.error);
            db.add(`${message.author.id}.money`, 250)
            db.set(`${message.author.id}.daily`, Date.now())
        }
    }
}
