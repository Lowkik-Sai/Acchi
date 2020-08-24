const Discord = require("discord.js");
const db = new (require("quick.db").table)("economy");

module.exports ={
    name: "leaderboard",
    description: 'displays leaderboard',
	execute: async(client,message, args) => {
    
        let data = await Promise.all(db.all().sort((a, b) => b.data.money-a.data.money).slice(0, 11).map(async (e, i) => {
            let user = client.users.cache.get(e.ID) || await client.users.fetch(e.ID).catch((e) => undefined);
            if(!user) return db.delete(e.ID);
            return `**${i}**. ${e.data.money} - ${user.tag}`;
        }));
        let embed = new Discord.MessageEmbed();
        embed.setTitle("<:TickYellow:715595910289031281> International Coin Leaderboard <:TickYellow:715595910289031281>");
        embed.setColor("#e2dd10");
        embed.setDescription(data);
        embed.setFooter('This shows the global Top #10 leaderboard')
        embed.setTimestamp()
        return message.channel.send(embed)

	}
}