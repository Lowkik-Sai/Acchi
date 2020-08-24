const api = require('covidapi')
const Discord = require('discord.js')
module.exports = {
    name:"covidstats",
    description: "get corona country stats",

    execute: async(client, message, args) => {
        let country = args[0]
        if(!country) message.reply("Please provide a country").catch(console.error);
        const countrydata = await api.countries({country: country})
        const countryembed = new Discord.MessageEmbed()
        .setColor("ff2050")
        .setTitle(`${country} Cases`)
        .setDescription("Number of cases may differ from other sources")
        .addField("Cases", countrydata.cases, true)
        .addField("Active", countrydata.active, true)
        .addField("Cases Today", countrydata.todayCases, true)
        .addField("Critical Cases", countrydata.critical, true)
        .addField("Deaths", countrydata.deaths, true)
        .addField("Recovered", countrydata.recovered, true)
        .setThumbnail(countrydata.countryInfo.flag)
        message.channel.send(countryembed).catch(console.error);
    }
}