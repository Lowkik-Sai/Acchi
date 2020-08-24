const Discord = require('discord.js');
const db = new (require("quick.db").table)("guilds")
const ms = require('ms');

module.exports = {
    name: "guess-the-number",
    description: "Do giveaways using this feature & also olay games with your friends",
    async execute(client, message, args) {

        let embed = new Discord.MessageEmbed();
        embed.setDescription("Is this going to be for a friend, giveaway, or are you playing alone? [giveaway/friend/alone]");
        let typeQmsg = await message.channel.send({embed});
        let typeQresp = (await message.channel.awaitMessages((m) => m.author.id == message.author.id && /giveaway|friend|alone/gmi.test(m.content),{
            time: 20000,
            max: 1,
            errors: ["time"]
        })).first();
        typeQmsg.delete();
        if(!typeQresp) return message.channel.send("No response was collected, canceled process");
        if(typeQresp.content.toLowerCase() == "giveaway"){

            let gtnChannelMsg = await message.channel.send("What channel do you want guess the number activity to be in?");
            let gtnChannelResp = (await message.channel.awaitMessages((m) => m.author.id && m.mentions.channels.first() || message.guild.channels.cache.get(m.content),{
                time: 20000,
                max: 1,
                errors: ["time"]
            })).first();
            if(!gtnChannelResp) return message.channel.send("No Response was collected, canceled process");

            let gtnDurationMsg = await gtnChannelMsg.edit("What is the duration of this giveaway?");
            let gtnDurationResp = (await message.channel.awaitMessages((m) => m.author.id && !isNaN(ms(m.content)),{
                time: 20000,
                max: 1,
                errors: ["time"]
            })).first();
            
            let channel = gtnChannelMsg.mentions.channels.first() || message.guild.channels.cache.get(gtnChannelMsg.content);
            console.log(channel)
            db.set(`${message.guild.id}.gtn`,{
                generatedNum: Math.floor(Math.random()*200),
                channelID: channel.id,
                hostID: message.author.id,
                endDate: Date.now()+ms(gtnDurationResp.content)
            });

            return message.channel.send(`Giveaway is located at ${channel.toString()} `)

        } else {

            let userQMsg = await message.channel.send("Who are you playing against? [Mention/ID]");
            let userResp = (await message.channel.awaitMessages((m) => m.author.id && message.author.id && m.mentions.members.first() || message.guild.members.cache.get(m.content),{
                time: 20000,
                max: 1,
                errors: ["time"]
            })).first();
            userQMsg.delete();
            if(!userResp) return message.channel.send("No response was collected, canceled process");
           
            let member = userResp.mentions.members.first() || message.guild.members.cache.get(userResp.content);
            let num = Math.floor(Math.random()*200);
            let numGen = new Discord.MessageEmbed();
            numGen.setColor("GREEN");
            numGen.setDescription("A number has been generated!");            
            message.channel.send(`${member.toString()}, Please respond within a minute in order to accept this game!`, {embed: numGen});

            let userOnlineResp = (await message.channel.awaitMessages((m) => m.author.id == member.id,{
                time: 60000,
                max: 1,
                errors: ["time"]
            })).first();

            if(!userOnlineResp) return message.channel.send(`${message.author.username}, it seems as if ${member.user.username} is offline. Please try again later when this user is online.`)
            else message.channel.send(`${member.user.username} has been detected to be online!`).then((m) => m.delete({timeout: 2500}));

            let userArr = [message.author, member.user];
            let iU = 0;
            let userNum;
            while(true){
                userNum = await getNumberResp(message, userArr[iU], num);
                if(!userNum) break;
                if(userNum.content == num) break;
                message.channel.send(num > Number(userNum.content) ? `The Generated Number is higher than ${userNum.content}!` : `The Generated Number is lower than ${userNum.content}!`);
                if(iU == 0) iU = 1;
                else iU = 0;
            }

            if(userNum.content == num) return message.channel.send(`${userArr[iU].toString()} has won! The correct number was ${num}!`);
            return message.channel.send(`${userArr[iU].toString()} didn't respond in time!`);

        }

    }
}
async function getNumberResp(message, user, num){

    message.channel.send(`Its now ${user.toString()}'s turn! Pick a number 0-200!`);

    let numResp = await message.channel.awaitMessages((m) => m.author.id == user.id && m.content <= 200,{
        time: 20000,
        max: 1,
        errors: ["time"]
    }).catch((e) => undefined);

    return numResp ? numResp.first() : undefined;
    
}

async function collector(message, filter){

    let resp = await message.channel.awaitMessages(filter,{
        time: 20000,
        max: 1,
        errors: ["time"]
     }).catch((e) => undefined);
   return resp.first();

}