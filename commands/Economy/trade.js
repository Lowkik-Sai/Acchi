const db = new (require("quick.db").table)("economy");
const {MessageEmbed} = require('discord.js')
const Discord = require('discord.js');

module.exports = {
    name: "trade",
    description: "Trade Aspire Inventory items to people",

    async execute(client, message, args) {
        
       let items = db.get(`${message.author.id}.items`);
       if(!items) return message.channel.send("You have nothing in your inventory!");

        let tradeUserQ = await message.channel.send("Who do you want to trade with? [Mention/ID]");
        let tradeUser = await getTradeUserResp(message);

        let hostTradeitem = await getTradeItem(message, message.author);
        let tradeUseritem = await getTradeItem(message, tradeUser);

        message.channel.send(`${tradeUser.toString()}, are you sure you want to trade a ${tradeUseritem} for ${hostTradeitem}? [yes/no]`);
        let tradeUserResp = await collector(message, (m) => m.author.id && tradeUser.id && /yes|no/.test(m.content));
        if(tradeUserResp.content.toLowerCase() == "no") return message.channel.send("Canceled process");

        message.channel.send(`${message.author.toString()}, are you sure you want to trade a ${hostTradeitem} for ${tradeUseritem}? [yes/no]`);
        let hostResp = await collector(message, (m) => m.author.id && tradeUser.id && /yes|no/.test(m.content));
        if(hostResp.content.toLowerCase() == "no") return message.channel.send("Canceled process");

        let authorItems = db.get(`${message.author.id}.items`); 
        db.set(`${message.author.id}.items`, authorItems.splice(authorItems.indexOf(hostTradeitem), 1, tradeUseritem));
        let tradeUserItems = db.get(`${tradeUser.id}.items`);
        db.set(`${tradeUser.id}.items`, tradeUserItems.splice(tradeUserItems.indexOf(tradeUseritem), 1, hostTradeitem));
        return message.channel.send(`Transaction was successful.`);

    }
}

async function collector(message, filter){

    let resp = await message.channel.awaitMessages(filter,{
        time: 20000,
        max: 1,
        errors: ["time"]
    }).catch((e) => undefined);
    return resp.first();

}

function count(arr) {

    let newArr = new Array();
    var current = null;
    var cnt = 0;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != current) {
            if (cnt > 0) {
                newArr.push({
                    item: current,
                    duplicates: cnt
                });
            }
            current = arr[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        newArr.push({
            item: current,
            duplicates: cnt
        });
    }
    return newArr;
}

async function getTradeUserResp(message){

    let tradeUserResp = await collector(message, (m) => m.author.id == message.author.id && (message.mentions.members.first() || message.guild.members.cache.get(m.content)));
    if(!tradeUserResp){
        message.channel.send("That is a invalid GuildMember! Please try again!");
        getTradeUserResp(message);
    }
    return message.mentions.members.first() || message.guild.members.cache.get(tradeUserResp.content);

}

async function getTradeItem(message, user, sentInventoryMsg){

    let items = db.get(`${user.id}.items`);
    if(!sentInventoryMsg){
        let embed = new MessageEmbed()
        .setTitle(`${user.username}'s Inventory`)
        .setColor("RANDOM")
        .addField("<:moneybag:725449418580426803>Items you bought! <:moneybag:725449418580426803>", count(items.sort()).map((d) => `${d.item} - **${d.duplicates}**`).join('\n'));
        message.channel.send(`${user.toString()}, what would you like to trade?`,{embed: embed}).catch(console.error);
    }

    message.channel.send("Name item inside of your inventory (at this time of writing only one item can be choosen)\nType <item name> to use that item!")
    let tradeItemResp = await collector(message, (m) => m.author.id == user.id && items.some((e) => e.toLowerCase() == m.content.toLowerCase()));
    if(!tradeItemResp) message.channel.send(`Canceled trading process`);
    else return items.find((e) => e.toLowerCase() == tradeItemResp.content.toLowerCase());
    
}