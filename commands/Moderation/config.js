const Discord = require('discord.js');
const ms = require("ms");
const db = new (require("quick.db").table)("guilds");
const dBadWords = require("../../Assets/badwords");

module.exports = {
    name: "config",
    async execute(client, message, args) {

        switch(args[0].toLowerCase()){
            case "anti-spam":
                if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You must have \`MANAGE_GUILD\` permission in order to execute this command!").then((m) => m.delete({timeout: 2500}));

                let embed = new Discord.MessageEmbed();
                embed.setDescription('What anti-spam configuration would you like to modify? [links/caps/emojis]');
                let msgAntiSpamQ = await message.channel.send({embed: embed});
                let msgA = await collector(message, (m) => m.author.id == message.author.id && ["links","caps","emojis"].includes(m.content.toLowerCase()));
                if(!msgA) return;
                if(msgA.content.toLowerCase() == "links"){
                    await msgAntiSpamQ.edit("Supply a regex or type default for the default regex!", {embed: null});
                    let regexResp = await collector(message, (m) => m.author.id == message.author.id);
                    if(!regexResp) return;
                    regexResp.delete().catch((e) => undefined);
                    let regex = regexResp.content || new RegExp("(http|ftp|https)://([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?");
                    try{
                        new RegExp(regex);
                    }catch(e){
                        return message.channel.send("That was a invalid regex! Canceled process").then((m) => m.delete({timeout: 2500})).catch((e) => undefined);
                    }
                    let { max, interval } = await getOtherData("link", message, msgAntiSpamQ);
                    msgAntiSpamQ.delete().catch((e) => undefined);
                    db.set(`${message.guild.id}.antispam.links`,{
                        interval: interval,
                        max: max, 
                        regex: regex
                    });
                    return message.channel.send(`Successfully  <:TickGreen:715595196032745643> setted links regex as \`${regex}\``).then((m) => m.delete({timeout: 2500})).catch((e) => undefined);
                } else if(msgA.content.toLowerCase() == "caps"){
                    let { max, interval } = await getOtherData("cap", message, msgAntiSpamQ);
                    msgAntiSpamQ.delete().catch((e) => undefined);
                    db.set(`${message.guild.id}.antispam.caps`, {
                        interval: interval,
                        max: max
                    });
                    return message.channel.send("Successfully  <:TickGreen:715595196032745643> turned cap spam on!").then((m) => m.delete({timeout: 2500})).catch((e) => undefined);
                } else if(msgA.content.toLowerCase() == "emojis"){
                    let { max, interval } = await getOtherData("emoji", message, msgAntiSpamQ);
                    msgAntiSpamQ.delete().catch((e) => undefined);
                    db.set(`${message.guild.id}.antispam.emojis`, {
                        interval: interval,
                        max: max
                    });
                    return message.channel.send("Successfully  <:TickGreen:715595196032745643> turned emoji spam on!").then((m) => m.delete({timeout: 2500})).catch((e) => undefined);
                }
            break;
            case "badwords":
                if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You must have \`MANAGE_GUILD\` permission in order to execute this command!").then((m) => m.delete({timeout: 2500})).catch((e) => undefined);

                let badwordsQ = message.channel.send(`Choose the specific words you would like to use! \`, \` to separate words!
**OR**
Type \`default\` to use the default set of badwords!
**OR**
Type \`disable\` to not use badwords configuration at all!`);
                let badwordsResp = await collector(message, (m) => m.author.id == message.author.id && /\w.*,?|default|disable/gi.test(m.content));
                if(!badwordsResp) return;
                badwordsResp.delete().catch((e) => undefined);
                badwordsQ.delete().catch((e) => undefined);
                if(!badwordsResp) return message.channel.send("Invalid response, canceled process").then((m) => m.delete({timeout: 2500})).catch((e) => undefined);
                let words = /default/.test(badwordsResp.content.toLowerCase())? "default" : badwordsResp.content.split(", ");
                if(/disable/.test(words)){
                    db.set(`${message.guild.id}.badwords.enabled`, false);
                    return message.channel.send("Bad words are now disabled");
                } else {
                    db.set(`${message.guild.id}.badwords.enabled`, true);
                    db.set(`${message.guild.id}.badwords.set`, words);
                    return message.channel.send(`Bad words are now: **${words == "default" ? dBadWords.join(", ") : words.join(", ")}**`).then((m) => m.delete({timeout: 2500})).catch((e) => undefined);
                }
                break;
            case "auto-role":
                if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You must have \`MANAGE_GUILD\` permission in order to execute this command!").then((m) => m.delete({timeout: 2500})).catch((e) => undefined);

                let r = message.mentions.roles.first() || message.guild.roles.cache.find((r) => r.name == args.slice(1).join(" ") || r.id == args[1]);
                if(!r) return message.channel.send({embed: new Discord.MessageEmbed().setColor("RED").setDescription("Invalid role name/ID!")});
                db.set(`${message.guild.id}.autorole.enabled`, true);
                db.set(`${message.guild.id}.autorole.role`, r.id);
                return message.channel.send({embed: new Discord.MessageEmbed().setColor("GREEN").setDescription(`The autorole is now enabled to ${r.name}`)}).then((m) => m.delete({timeout: 2500})).catch((e) => undefined);
                break;
            case "ticket":
                if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You must have \`MANAGE_MESSAGES\` permission in order to execute this command!").then((m) => m.delete({timeout: 2500})).catch((e) => undefined);
                
                if(db.get(`${message.guild.id}.ticket.sys`) != undefined){
                    message.channel.send("This module has been set up already, type \`reset ticket\` if you want to overwrite the guild's current ticket settings.").catch((e) => undefined);
                    let resetTicketCatResp = await collector(message, (m) => m.author.id == message.author.id &&  /yes|no/gmi.test(m.content));
                    if(resetTicketCatResp.content.toLowerCase() == "no") return message.channel.send("Canceled process");
                }
                let ticketQ = await message.channel.send(`Type the name or ID of the category where you want the ticket category to be!`).catch((e) => undefined);
                let ticketCatResp = await collector(message, (m) => m.author.id == message.author.id && message.guild.channels.cache.some((c) => c.type == "category" && c.name == m.content || c.id == m.content));
                if(!ticketCatResp) return;
                ticketCatResp.delete().catch((e) => undefined);
                ticketQ.delete().catch((e) => undefined);
                let c = message.guild.channels.cache.find((c) => c.type == "category"  && [c.name, c.id].includes(ticketCatResp.content));
                if(!ticketCatResp) return message.channel.send({embed: new Discord.MessageEmbed().setColor("RED").setDescription("Invalid Category!")}).then((m) => m.delete({timeout: 2500})).catch((e) => undefined);
                db.set(`${message.guild.id}.ticketsys.cat`, c.id);
                db.set(`${message.guild.id}.ticketsys.ticnum`, 0);
                return message.channel.send({embed: new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Ticket system channel category has been successfully set to ${c.name}`)}).then((m) => m.delete({timeout: 2500})).catch((e) => undefined);
                break;
            case "anti-raid":
                let antiRaidEmbed = new Discord.MessageEmbed();
                antiRaidEmbed.setDescription('Decide if you want anti-raid to be on or off?');
                let msgAntiRaidEnabledQ = await message.channel.send(antiRaidEmbed).catch((e) => undefined);
                let antiRaidEnabledResp =  await collector(message, (m) => m.author.id == message.author.id && /on|off/gmi.test(m.content));
                if(!antiRaidEnabledResp) return;
                antiRaidEnabledResp.delete().catch((e) => undefined);
                msgAntiRaidEnabledQ.delete().catch((e) => undefined);
                // if(!antiRaidEnabledResp) return message.channel.send("Nothing was selected! Canceled process").catch((e) => undefined);
                if(antiRaidEnabledResp.content.toLowerCase() == "off"){
                    db.set(`${message.guild.id}.antiRaid.enabled`, false);
                    return message.channel.send("Turned off anti-raid configuration!").catch((e) => undefined);
                } else {
                    (await message.channel.send("Turned on anti-raid configuration!")).delete({ timeout: 2500 }).catch((e) => undefined);
                    db.set(`${message.guild.id}.antiRaid.enabled`, true);
                    let embed = new Discord.MessageEmbed();
                    embed.setDescription('Do you want anti-raid **logs** to be on or off? [on/off]');
                    let msgAntiRaidLogsQ = await message.channel.send({embed: embed}).catch((e) => undefined);
                    let antiRaidLogsResp = await collector(message, (m) => m.author.id == message.author.id && /on|off/gmi.test(m.content));
                    if(!antiRaidLogsResp) return; 
                    antiRaidLogsResp.delete().catch((e) => undefined);
                    msgAntiRaidLogsQ.delete().catch((e) => undefined);
                    // if(!antiRaidLogsResp) return message.channel.send("Nothing was selected! Canceled process").catch((e) => undefined);
                    if(antiRaidLogsResp.content.toLowerCase() == "on"){
                        db.set(`${message.guild.id}.antiRaid.logs`, true);
                        return message.channel.send("Turned anti-raid logs on (Will be using server logs)").catch((e) => undefined);
                    } else {
                        db.set(`${message.guild.id}.antiRaid.logs`, false);
                        return message.channel.send("Turned anti-raid logs off");
                    }
                }
                break;
            case "logs":
                let logsEmbed = new Discord.MessageEmbed();
                logsEmbed.setDescription('Do you want the logs to be on or off?');
                let logsEnabledQ = await message.channel.send(logsEmbed).catch((e) => undefined);
                let logsEnabledResp = await collector(message, (m) => m.author.id == message.author.id && /on|off/gmi.test(m.content));
                if(!logsEnabledResp) return;
                logsEnabledResp.delete().catch((e) => undefined);
                logsEnabledQ.delete().catch((e) => undefined);
                if(logsEnabledResp.content.toLowerCase() == "off"){
                    db.set(`${message.guild.id}.logs.enabled`, false);
                    return message.channel.send("Turned off logs configuration!").catch((e) => undefined);
                } else {
                    (await message.channel.send("Turned on logs configuration!")).delete({ timeout: 2500 }).catch((e) => undefined);
                    db.set(`${message.guild.id}.logs.enabled`, true);
                    let embed = new Discord.MessageEmbed();
                    embed.setDescription(`Options:
Mention the channel for server logs
Type the ID of the channel for server logs
Type cancel to cancel the process
Type Skip to skip server logs`);
                    let serverLogsQ = await message.channel.send({embed}).catch((e) => undefined);
                    let serverLogsResp = await collector(message, (m) => m.author.id == message.author.id && /cancel|skip/gmi.test(m.content) || m.mentions.channels.first() || m.guild.channels.cache.get(m.content));
                    if(!serverLogsResp) return;
                    serverLogsResp.delete().catch((e) => undefined);
                    serverLogsQ.delete().catch((e) => undefined);
                    let channel = serverLogsResp.mentions.channels.first() || message.guild.channels.cache.get(serverLogsResp.content);
                    if(!channel){
                        if(serverLogsResp.content.toLowerCase() == "cancel") return message.channel.send("Canceled process").catch((e) => undefined);
                        else if(serverLogsResp.content.toLowerCase() == "skip") message.channel.send("Skipped server logs configuration").catch((e) => undefined);
                    } else if(channel){
                        db.set(`${message.guild.id}.logs.server`, channel.id);
                        (await message.channel.send(`Successfully set up server logs as ${channel.toString()}`)).delete({ timeout: 2500 }).catch((e) => undefined);
                    }
                    let memberLogs = new Discord.MessageEmbed();
                    memberLogs.setDescription(`Options:
Mention the channel for member logs
Type the ID of the channel for member logs
Type cancel to cancel the process`);
                    let memberLogsQ = message.channel.send(memberLogs).catch((e) => undefined);
                    let memberLogsResp = await collector(message, (m) => m.author.id == message.author.id && /cancel|skip/gmi.test(m.content) || m.mentions.channels.first() || m.guild.channels.cache.get(m.content));
                    if(!memberLogsResp) return;
                    memberLogsResp.delete().catch((e) => undefined);
                    serverLogsQ.delete().catch((e) => undefined);
                    let memberLogsChannel = memberLogsResp.mentions.channels.first() || message.guild.channels.cache.get(memberLogsResp.content);
                    if(!memberLogsChannel){
                        if(serverLogsResp.content.toLowerCase() == "cancel") return message.channel.send("Canceled process");
                    } else {
                        db.set(`${message.guild.id}.logs.member`, memberLogsChannel.id);
                        (await message.channel.send(`Successfully set up member logs as ${memberLogsChannel.toString()}`)).delete({ timeout: 25000 }).catch((e) => undefined);
                    }
                }
                break;
            default:
                return message.channel.send("That is not a valid ``Configuration`` module!").then((m) => m.delete({timeout: 2500})).catch((e) => undefined);
                break;
            }
        
    }
}

function syntax(message){

    let embed = new Discord.MessageEmbed();
    embed.setTitle("Config help - .config");
    embed.setDescription(`**Description:** Configurations for modules
    **Usage:** .config {module}
    **Example:** .config anti-spam`);
    return message.channel.send({embed: embed}).catch((e) => undefined);

}

async function getOtherData(type, message, msgQ){

    await msgQ.edit(`Select a interval for ${type} anti-spam`, null).catch((e) => undefined);
    let intervalResp = await collector(message, (m) => m.author.id == message.author.id && ms(m.content) != undefined);
    // if(!intervalResp) return message.channel.send("No valid time was selected canceled process").catch((e) => undefined);
    let interval = intervalResp.content;
    await intervalResp.delete().catch((e) => undefined);

    await msgQ.edit(`Now select a max link count for ${type} anti-spam`, null).catch((e) => undefined);
    let maxResp = await collector(message, (m) => m.author.id == message.author.id &&  /[0-9]*/.test(m.content))
    // if(!maxResp) await message.channel.send("No valid number was choosen canceled process").catch((e) => undefined);
    let max = maxResp.content;
    await maxResp.delete().catch((e) => undefined);

    return Object.defineProperties(new Object(),{
        interval: {
            value: ms(interval),
            writable: false
        },
        max: {
            value: max,
            writable: false
        }
    });

}

async function collector(message, filter){

    let resp = await message.channel.awaitMessages(filter,{
        time: 20000,
        max: 1,
        errors: ["time"]
    }).catch((e) => undefined);
    if(resp == undefined) message.channel.send("Nothing was selected! Canceled process");
    else return resp.first();

}