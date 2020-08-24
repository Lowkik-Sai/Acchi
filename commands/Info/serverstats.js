const Discord = require('discord.js');

module.exports = {
    name: 'serverstats',
    description: 'Shows information about a server!',

    async execute(client, message, args) {

		// let members = await message.guild.members.fetch({ cache: false });
		let owner = await client.users.fetch(message.guild.ownerID);
		let { data, region, verification } = getData(message);
        let embed = new Discord.MessageEmbed();
		embed.setColor('RANDOM');
		embed.setAuthor(`${message.guild.name}\nServer Stats`)
		embed.setThumbnail(message.guild.iconURL({
			dynamic: true,
			size: 1024,
			format: 'png'
		}));
		embed.addField("**Name & ID:**", `${message.guild.name}\n(\`${message.guild.id}\`)`, true);
		embed.addField("**Server Owner:**", owner.tag, true);
		embed.addField("**Region:**", `${region.emoji} | ${region.display}`, true);
		embed.addField("**Server Created At:**", message.guild.createdAt.toLocaleString("en-US", { timeZone: "UTC" }), true);
		embed.addField("**Boost Tier**", `**${message.guild.premiumTier == 0 ? "None" : message.guild.premiumTier}**`, true);
		embed.addField("**Member Count:**", `**${message.guild.members.cache.filter((m) => !m.bot).size.toLocaleString()}**`, true);
		embed.addField("**Verification Level:**", `${verification.display}\n${verification.value}`);
		embed.addField("**Roles:**", data.roles.map((d) => `• ${d.name}: **${d.value}**`).join('\n'));
		embed.addField("**Channels**", data.channels.map((d) => `• ${d.name}: **${d.value}**`).join('\n'));
		embed.addField("**Emojis**", data.emojis.map((d) => `• ${d.name}: **${d.value}**`).join('\n'));
		if(message.guild.banner){
			embed.setImage("Banner", message.guild.bannerURL())
		}
		embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
			dynamic: true,
			size: 1024,
			format: 'png'
		}));
		embed.setTimestamp();

		return message.channel.send(embed);

    }
}

function getData(message){

	return Object.defineProperties(new Object(), {
		data: {
			value: otherData(message),
			writable: false
		},
		region: {
			value: getRegion(message),
			writable: false
		},
		verification: {
			value: getVerificationLevel(message),
			writable: false
		}
	});


}

function otherData(message){

	return {
		"roles":[{
				name: "Total roles",
				value: message.guild.roles.cache.size.toLocaleString()
		},{
			name: "Highest Role",
			value: message.guild.roles.highest.toString()
		},{
			name: "Highest role hex color",
			value: message.guild.roles.highest.hexColor
		},{
			name: "Mentionable roles",
			value: message.guild.roles.cache.filter((r) => r.mentionable).size.toLocaleString()
		},{
			name: "Managed roles",
			value: message.guild.roles.cache.filter((r) => r.managed).size.toLocaleString()
		}],
		"channels":[{
			name: "Total channels",
			value: message.guild.channels.cache.size
		},{
			name: "Categories",
			value: message.guild.channels.cache.filter((c) => c.type == "category").size.toLocaleString()
		},{
			name: "Text channels",
			value: message.guild.channels.cache.filter((c) => c.type == "text").size.toLocaleString()
		},{
			name: "Voice channels",
			value: message.guild.channels.cache.filter((c) => c.type == "voice").size.toLocaleString()
		},{
			name: "AFK Channel",
			value: message.guild.afkChannel == null ? "None" : message.guild.afkChannel.toString()
		}],
		"emojis":[{
			name: "Total emojis",
			value: `${message.guild.emojis.cache.size.toLocaleString()}/${[{num: 0, value: 50},{num: 1, value: 100},{num: 2, value: 150},{num: 3, value: 250}].find((d) => d.num == message.guild.premiumTier).value.toLocaleString()}`
		},{
			name: "Normal emojis",
			value: message.guild.emojis.cache.filter((e) => !e.animated).size.toLocaleString()
		},{
			name: "Animated emojis",
			value: message.guild.emojis.cache.filter((e) => e.animated).size.toLocaleString()
		}]
	}

}

function getRegion(message){

	let USregions = [{name: "us-central", value: "US Central"},{name: "us-east", value: "US East"},{name: "us-south", value: "US South"},{name: "us-west", value: "US West"}];
	let USregion = USregions.find((d) => d.name == message.guild.region);
	return [{
		name: ["us-central","us-east","us-south","us-west"],
		display: USregion ? USregion.value : undefined ,
		emoji: "<:flag_us:728305677088456704>"
	},{
		name: ["japan"],
		display: message.guild.region.slice(0,1).toUpperCase()+message.guild.region.slice(1).toLowerCase(),
		emoji: "<:flag_jp:728304588717031584>"
	},{
		name: ["russia"],
		display: message.guild.region.slice(0,1).toUpperCase()+message.guild.region.slice(1).toLowerCase(),
		emoji: "<:flag_ru:728304674624503848>"
	},{
		name: ["singapore"],
		display: message.guild.region.slice(0,1).toUpperCase()+message.guild.region.slice(1).toLowerCase(),
		emoji: "<:flag_sg:728305052086960150>"
	},{
		name: ["southafrica"],
		display: "South Africa",
		emoji: "<:flag_za:728305330416648214>"
	},{
		name: ["brasil"],
		display: message.guild.region.slice(0,1).toUpperCase()+message.guild.region.slice(1).toLowerCase(),
		emoji: "<:flag_br:728304014352973944>"
	},{
		name: ["sydney"],
		display: message.guild.region.slice(0,1).toUpperCase()+message.guild.region.slice(1).toLowerCase(),
		emoji: "<:flag_hm:728305580967723089>"
	},{
		name: ["europe"],
		display: message.guild.region.slice(0,1).toUpperCase()+message.guild.region.slice(1).toLowerCase(),
		emoji: "<:flag_eu:728303710576443485>"
	},{
		name: ["hongkong"],
		display: "Hong Kong",
		emoji: "<:flag_hk:728304166371590245>"
	},{
		name: ["india"],
		display: message.guild.region.slice(0,1).toUpperCase()+message.guild.region.slice(1).toLowerCase(),
		emoji: "<:flag_in:728304537651118101>"
	}].find((d) => d.name.includes(message.guild.region));

}

function getVerificationLevel(message){

	return [{
		name: "NONE",
		display: "None",
		value: "Unrestricted"
	},{
		name: "LOW",
		display: "Low",
		value: "Must have a verified email on their Discord account"
	},{
		name: "MEDIUM",
		display: "Medium",
		value: "Must also be registered on Discord for longer than 5 minutes"
	},{
		name: "HIGH",
		display: "High",
		value: "Must also be a member of this server for longer than 10 minutes"
	},{
		name: "VERY_HIGH",
		display: "Very High",
		value: "Must have a verified phone on their Discord Account"
	}].find((d) => d.name == message.guild.verificationLevel);

}
