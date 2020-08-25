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
		value: "<:DiscordStaff:747476446922145883>"
	},{
		name: "DISCORD_PARTNER",
		display: "Discord Partner",
		value: "<:DiscordPartner:747476404433584168>"
	},{
		name: "HYPESQUAD_EVENTS",
		display: "HypeSquad Events",
		value: "<:HypeSquadEvent:747476368391929928>"
	},{
		name: "BUGHUNTER_LEVEL_1",
		display: "Bug Hunter Lvl 1",
		value: "<:BugHunter1:747476209071554738>"
	},{
		name: "HOUSE_BRAVERY",
		display: "HypeSquad Bravery",
		value: "<:HypeBravery:747476340244217868>"
	},{
		name: "HOUSE_BRILLIANCE",
		display: "HypeSquad Brilliance",
		value: "<:HypeBrilliance:747476246463774820>"
	},{
		name: "HOUSE_BALANCE",
		display: "HypeSquad Balance",
		value: "<:HypeBalance:747476282979123200>"
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
		display: "Bug Hunter Lvl 2",
		value: "<:BugHunter2:747476165148540988>"
	},{
		name: "VERIFIED_BOT",
		display: "Verified Bot",
		value: ""
	},{
		name: "VERIFIED_DEVELOPER",
		display: "Verified Developer",
		value: "<:VerifiedDeveloper:747476730012368936>"
	}].filter((d) => flags.find((flag) => flag == d.name));

}
