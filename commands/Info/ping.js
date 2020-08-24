const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Describes latency about bot!',

    async execute(client, message, args) {

		let pingEmbed = new Discord.MessageEmbed()
		  .setColor("GREEN")
		  .setTitle("**Pong!**")
		  .addField(
			"**Results:**",
			`${new Date().getTime() - message.createdTimestamp}ms.` + '\n' + `${Math.round(client.ws.ping)}ms.`,
			false
		  )
		  .setFooter(
			`${message.author.tag}`,
			message.author.displayAvatarURL({
			  dynamic: true,
			  size: 1024,
			  format: "png"
			})
		  )
	   message.channel.send(pingEmbed);

    }
}

