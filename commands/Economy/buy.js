const db = new (require("quick.db").table)("economy");
const {MessageEmbed} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "buy",
    description: "buy items",

    execute(client, message, args) {
        let author = db.fetch(`${message.author.id}.money`)

        if(!args[0]) message.reply("What would you like to buy... <:thinking:725780282334249101>").catch(console.error);

        if(args.join(' ').toLowerCase() === "bowling set") {
            if(author < 1500) {
                message.reply("You need more coins to buy the Bowling Set!").catch(console.error);
            } else {
                db.subtract(`money_${message.author.id}`, 1500);
                db.push(`${message.author.id}.items`, 'Bowling Set');
                message.channel.send("You bought 1x Bowling Set! <:bowling:725370050776924209>").catch(console.error);
            }
        }

        if(args.join(' ').toLowerCase() == "alarm clock") {
            if (author < 520) {
                message.reply("You need more coins to buy the Alarm Clock!").catch(console.error);
            } else {
                db.subtract(`money_${message.author.id}`, 520);
                db.push(`${message.author.id}.items`, "Alarm Clock");
                message.channel.send("You bought 1x Alarm Clock! <:alarm_clock:725371342387413042>").catch(console.error);
            }
        } 

        if(args.join(' ').toLowerCase() == "cookie") {
            if (author < 90) {
                message.reply("You need more coins to buy the Cookie!").catch(console.error);
            } else {
                db.subtract(`money_${message.author.id}`, 90);
                db.push(`${message.author.id}.items`, "Cookie");
                message.channel.send("You bought 1x Cookie! <:cookie:725370965558689883>").catch(console.error);
            }
        }
        
        if(args.join(' ').toLowerCase() == "bowling set") {
            if (author < 1560) {
                message.reply("You need more coins to buy the Bowling Set!").catch(console.error);
            } else {
                db.subtract(`money_${message.author.id}`, 1560);
                db.push(`${message.author.id}.items`, `bowling set`);
                message.channel.send("You bought 1x Bowling Set! <:bowling:725370050776924209>").catch(console.error);
            }
        }
        
        if(args.join(' ').toLowerCase() == "aspire badge") {
            if (author < 35000) {
                message.reply("You need more coins to buy the Birthday Cake!").catch(console.error);
            } else {
                db.subtract(`money_${message.author.id}`, 35000);
                db.push(`${message.author.id}.items`, `Aspire Badge`);
                message.channel.send("You bought 1x Aspire Badge and earned 5,000 Bonus coins! <:AspireBadge:725385469181034577>").catch(console.error);
            }
        }
        
        if(args.join(' ').toLowerCase() == "birthday cake") {
            if (author < 7000) {
                message.reply("You need more coins to buy the Birthday Cake!").catch(console.error);
            } else {
                db.subtract(`money_${message.author.id}`, 7000);
                db.push(`${message.author.id}.items`, `Bitrthday Cake`);
                message.channel.send("You bought 1x Birthday Cake! <:birthday:725371290453671986>").catch(console.error);
            }
        }

        if(args.join(' ').toLowerCase() == "Boxing Gloves") {
            if (author < 820) {
                message.reply("You need more coins to buy the Boxing Gloves!").catch(console.error);
            } else {
                db.subtract(`money_${message.author.id}`, 820);
                db.push(`${message.author.id}.items`, `Boxing Gloves`);
                message.channel.send("You bought 1x Boxing Gloves! <:boxing_glove:725370050894364763>").catch(console.error);
            }
        }
        
        if(args.join(' ').toLowerCase() == "fries") {
            if (author < 35) {
                message.reply("You need more coins to buy the Fries!").catch(console.error);
            } else {
                db.subtract(`money_${message.author.id}`, 35);
                db.push(`${message.author.id}.items`, `Fries`);
                message.channel.send("You bought 1x box of Fries! <:fries:725370965915205703>").catch(console.error);
            }
        }
        
        if(args.join(' ').toLowerCase() == "movie clappers") {
            if (author < 900) {
                message.reply("You need more coins to buy the Movie Clapper!").catch(console.error);
            } else {
                db.subtract(`money_${message.author.id}`, 900);
                db.push(`${message.author.id}.items`, `Movie Clapper`);
                message.channel.send("You bought 1x movie clapper <:clapper:725370051183509524>").catch(console.error);
            }
        }
        
        if(args.join(' ').toLowerCase() == "private jet") {
            if (author < 65620) {
                message.reply("You need more coins to buy the Private Jet!").catch(console.error);
            } else {
                db.subtract(`money_${message.author.id}`, 65620);
                db.push(`${message.author.id}.items`, `Private Jet`);
                message.channel.send("You bought 1x Private Jet! <:airplane:725370824353120266>").catch(console.error);
            }
        }

        if(args.join(' ').toLowerCase() == "mansion") {
            if(author < 75000) {
                message.reply("You need more coins to buy the Mansion!, lol I can buy your whole inventory times your age!").catch(console.error);
            } else {
                db.subtract(`money_${message.author.id}`, 75000);
                db.push(`${message.author.id}.items`, 'Mansion');
                message.channel.send("You bought 1x mansion property! <:classical_building:725370346542202973>").catch(console.error);
            }
        }
    }
}