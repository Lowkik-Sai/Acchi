const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Shows information about a server!',

    async execute(client, message, args) {

		let user = message.mentions.users.first() || (isNaN(args[0]) ? message.author : await client.users.fetch(args[0]).catch((e) => undefined));
		if(!user) return message.channel.send(`Mention nothing, someone or use a valid userID!`);
		let { statusEmoji, userBadges } = await getData(user);
		let embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
	    .setAuthor(`${user.tag}\nUser Info`)
		.setThumbnail(user.displayAvatarURL({
			dynamic: true,
			size: 1024,
			format: 'png'
		}))
		.addField("**Name & ID:**", `${user.tag}\n(\`${user.id}\`)`, true)
		.addField("**Status:**", `${user.presence.status}`, true)
		.addField("**Badges**", userBadges.map((d) => `${d.value} => ${d.display}`).join('\n') || "None")
		.addField("**User Type:**", user.bot ? "Bot" : "User", true)
		.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
			dynamic: true,
			size: 1024,
			format: 'png'
		}))
		.setTimestamp()
		return message.channel.send({embed: embed});

	}
}

async function getData(user){

	return Object.defineProperties(new Object(), {
		statusEmoji: {
			value: getStatusEmoji(user),
			writable: false
		},
		userBadges: {
			value: await getUserBadgeEmojis(user),
			writable: false
		}
	})

}

function getStatusEmoji(user){

	return [{
		name: "online",
		value: "<:online:728656480315768944>"
	},{
		name: "dnd",
		value: "<:dnd:728656020922040400>"
	},{
		name: "idle",
		value: "<:idle:728655616112984164>"
	},{
		name: "offline",
		value: "<:invisible:728656480777142329>"
	}].find((d) => d.name == user.presence.status);
	 
}

async function getUserBadgeEmojis(user){

	let flags = (await user.fetchFlags()).toArray();
	return [{
		name: "DISCORD_EMPLOYEE",
		display: "Discord Employee",
		value: "<:DiscordEmployee:708105978499039322>"
	},{
		name: "DISCORD_PARTNER",
		display: "Discord Partner",
		value: "<:DiscordPartner:708106082320646245>"
	},{
		name: "HYPESQUAD_EVENTS",
		display: "Hypesquad Events",
		value: "<:HypeSquadEvents:708106190491484201>"
	},{
		name: "BUGHUNTER_LEVEL_1",
		display: "Bug Hunter Level 1",
		value: "<:BugHunterLevel1:708106296347590666>"
	},{
		name: "HOUSE_BRAVERY",
		display: "HypeSquad House(Bravery)",
		value: "<:HouseBravery:708106687692800150>"
	},{
		name: "HOUSE_BRILLIANCE",
		display: "HypeSquad House(Brilliance)",
		value: "<:HouseBrilliance:708106521761808395>"
	},{
		name: "HOUSE_BALANCE",
		display: "HypeSquad House(Balance)",
		value: "<:HouseBalance:708106612363100220>"
	},{
		name: "EARLY_SUPPORTER",
		display: "Early Supporter",
		value: ""
	},{
		name: "TEAM_USER",
		display: "Team User",
		value: ""	
	},{
		name: "SYSTEM",
		value: ""	
	},{
		name: "BUGHUNTER_LEVEL_2",
		display: "Bug Hunter Level 2",
		value: "<:BugHunterLevel2:708106413431455784>"
	},{
		name: "VERIFIED_BOT",
		display: "Verified Bot",
		value: ""
	},{
		name: "VERIFIED_DEVELOPER",
		display: "Verified Developer",
		value: "<:VerifiedBotDeveloper:728669539897966695>"
	}].filter((d) => flags.find((flag) => flag == d.name));

}
