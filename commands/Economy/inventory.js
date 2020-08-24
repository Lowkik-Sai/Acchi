const db = new (require("quick.db").table)("economy");
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "inventory",
    description: 'check inventory',

    execute(client, message, args) {
        let user = message.mentions.users.first() || message.author;
        let items = db.has(`${user.id}.items`) ? count(db.get(`${user.id}.items`).sort()).map((d) => `${d.item} - **${d.duplicates}**`).join('\n') : `I don't have any items in my database stored for ${message.mentions.users.first() ? user.username : "you"}!`;
        let embed = new MessageEmbed()
        .setTitle(`${user.username}'s Inventory`)
        .setColor("RANDOM")
        .addField("<:moneybag:725449418580426803>Items you bought!<:moneybag:725449418580426803>", items);
        message.channel.send(embed).catch(console.error);

    }
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