const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Shows information about the commands on the bot!',

    execute(client, message, args) {

        let helpEmbeded = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(`${message.author.username} here's the help you requested...`, message.guild.iconURL())
			.setThumbnail(client.user.displayAvatarURL({
				dynamic: true,
				size: 1024,
				format: 'png'
			}))
			.addField("**List Of Commands:**", "**In this embed, you can see all the available commands usable so far...!**", false)
			.addField("**[11] General:**", "\`serverstats\`,\`stats\`,\`userinfo\`,\`ping\`,\`announce\`,\`poll\`,\`weather\`,\`covidstats\`,\`hex\`,\`avatar\`,\`morse\`", false)
			.addField("**[17] Moderation:**", "\`ban\`,\`purge\`,\`kick\`,\`mute\`,\`unban\`,\`nuke\`,\`warn\`,\`tempban\`,\`unmute\`,\`lockdownall\`,\`clearwarns\`,\`warns\`,\`lockdown\`,\`unlockall\`,\`unlock\`,\`addrole\`,\`removerole\`", false)
			.addField("**[11] Fun:**", "\`cat\`,\`dog\`,\`meme\`,\`bird\`,\`koala\`,\`koalafact\`,\`dogfact\`,\`catfact\`,\`birdfact\`,\`fox\`,\`foxfact\`", false)
			.addField("**[5] Configuration: ``c!config <module>``**", "\`anti-spam\`,\`badwords\`,\`auto-role\`,\`anti-raid\`,\`ticket\`", false)
			.addField("**[14] Economy:**", "\`work\`,\`deposit`,\`pay`,\`slots\`,\`shop\`,\`bal\`,\`withdraw\`,\`daily\`,\ `inventory\`,\`beg\`,\`steal\`,\`scout\`,`leaderboard\`,`trade\`", false)
			.addField("**[2] Games:**", "\`8ball\`,\`guess-the-number\`")
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
				dynamic: true,
				size: 1024,
				format: 'png'
			}))
			.setTimestamp()

		return message.channel.send(helpEmbeded);

    }
}


