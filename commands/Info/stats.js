const Discord = require('discord.js');
const { version } = require('../../package');
const os = require('os')
prefix = "."

module.exports = {
    name: 'stats',
    description: 'Displays information about the bot!',

    execute(client, message, args) {

		const userAvatar = (message.author.displayAvatarURL({
			dynamic: true,
			format: "png"
		}));

		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;
		let uptime = `\`\`${days}d ${hours}h ${minutes}m ${seconds}s\`\``


		const statsResults = new Discord.MessageEmbed()
			.setTitle("Bot status")
			.addFields({
				name: '**Servers:**',
				value: `${client.guilds.cache.size}`,
				inline: true
			}, {
				name: '**Channels:**',
				value: `${client.channels.cache.size}`,
				inline: true
			}, {
				name: '**Users:**',
				value: `${client.guilds.cache.map((g) => g.memberCount).reduce((a,b) => a+b)}`,
				inline: true
			})
			.addFields({
				name: '**Bot version:**',
                		value: `${version}`,
                		inline: true
			}, {
				name: '**Discord.JS:**',
				value: `${require('discord.js').version}`,
				inline: true
			},{
				name: "**Memory Usage**",
				value: `${Math.round((os.freemem()/1024/1024)* 100)/100}/${Math.round((os.totalmem()/1024/1024)* 100)/100}mb`,
				//value: `${Math.round((process.memoryUsage().heapUsed/1024/1024)*100)/100} mb`,
				inline: true 
			},{
				name: "**Operating System**", 
				value: `Linux`,
				inline: true  
			}, {
				name: "**Node Version:**",
				value: process.version,
				inline: true
			}, {
				name: '**Global Prefix:**',
				value: `${client.config.prefix}`,
				inline: true
			}, {
				name: '**Uptime:**',
				value: uptime
			})
			.setColor('RANDOM')
			.setTimestamp()
			.setFooter(message.author.tag, userAvatar)

		message.channel.send(statsResults);

    }
}
