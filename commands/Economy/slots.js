const Discord = require('discord.js');
const db = new (require("quick.db").table)("economy");

module.exports = {
    name: 'slots',
    description: 'Gamble',
    async execute(client, message, args) {
        
        let amount = Number(args[0]);
        let money = db.fetch(`${message.author.id}.money`);
        if(!args[0]) return message.channel.send(`You need to gamble some amount of money!`).catch(console.error);
        if(isNaN(args[0])) return message.channel.send(`That is not a number!`).catch(console.error);
        if(amount <= 10) return message.channel.send('You need to gamble more than 10!').catch(console.error);
        if(Number(args[0]) > money) return message.channel.send('You don\'t have that much money!').catch(console.error);
        
        let fruits = ["<:apple:727239062506700943>","<:banana:727238743072833627>","<:diamond_shape_with_a_dot_inside:727238710248079512>","<:grapes:727238890204823646>","<:orange_circle:727238653067264001>","<:pear:727238779265482822>","<:watermelon:727238600202387466>","<:strawberry:727240963382182029>"];
        let i1=0,j1=0;k1=0;i2=1,j2=1;k2=1;i3=2,j3=2;k3=2;
        let colonnes = [
            shuffle(fruits),
            shuffle(fruits),
            shuffle(fruits)
        ];

        let tmsg = await message.channel.send('Please wait for results...').catch(console.error);
        editMsg();
        let interval = setInterval(editMsg, 1000);
        setTimeout(() => {
            clearInterval(interval);
            end(tmsg)
        },4000);

        function end(tmsg){

            let msg = "[ :slot_machine: 1 SLOTS ]\n------------------------\n";

            i1 = (i1 < fruits.length - 1)  ? i1 + 1 : 0;
            i2 = (i2 < fruits.length - 1)  ? i2 + 1 : 0;
            i3 = (i3 < fruits.length - 1)  ? i3 + 1 : 0;
            j1 = (j1 < fruits.length - 1)  ? j1 + 1 : 0;
            j2 = (j2 < fruits.length - 1)  ? j2 + 1 : 0;
            j3 = (j3 < fruits.length - 1)  ? j3 + 1 : 0;
            k1 = (k1 < fruits.length - 1)  ? k1 + 1 : 0;
            k2 = (k2 < fruits.length - 1)  ? k2 + 1 : 0;
            k3 = (k3 < fruits.length - 1)  ? k3 + 1 : 0;
            
            msg += `${colonnes[0][i1]} : ${colonnes[1][j1]} : ${colonnes[2][k1]} \n`;
            msg += `${colonnes[0][i2]} : ${colonnes[1][j2]} : ${colonnes[2][k2]} **<**\n`;
            msg += `${colonnes[0][i3]} : ${colonnes[1][j3]} : ${colonnes[2][k3]} \n------------------------\n`;

            

            if((colonnes[0][i2] == colonnes[1][j2]) && (colonnes[1][j2] == colonnes[2][k2])){
                msg += `| : : : **You have won jackpot! ** : : : |`;
                tmsg.edit({embed: new Discord.MessageEmbed().setColor("GREEN").setDescription(msg)}).catch(console.error);
                let credits = getCredits(amount, true);
                message.channel.send(`You hitted jackpot, you have won ${credits}, ${message.author.username}!`).catch(console.error);
                return db.add(`${message.author.id}.money`, credits);
            } else if(colonnes[0][i2] == colonnes[1][j2] || colonnes[1][j2] == colonnes[2][k2] || colonnes[0][i2] == colonnes[2][k2]){
                msg += "| : : : You have won! : : : |";
                tmsg.edit({embed: new Discord.MessageEmbed().setColor("GREEN").setDescription(msg)}).catch(console.error);
                let credits = getCredits(amount, false);
                message.channel.send(`You have won ${credits}, ${message.author.username}!`).catch(console.error);
                return db.add(`${message.author.id}.money`, credits);
            } else {
                msg += `| : : : You lost! : : :|`;
                tmsg.edit({embed: new Discord.MessageEmbed().setColor("WHITE").setDescription(msg)}).catch(console.error);;
                message.channel.send(`You have lost, ${amount}, ${message.author.username}!`).catch(console.error);
                return db.subtract(`${message.author.id}.money`, amount)
            }

        }
        
        function editMsg(){
            
            let msg = "[ :slot_machine: 1 SLOTS ]\n------------------------\n";
            i1 = (i1 < fruits.length - 1)  ? i1 + 1 : 0;
            i2 = (i2 < fruits.length - 1)  ? i2 + 1 : 0;
            i3 = (i3 < fruits.length - 1)  ? i3 + 1 : 0;
            j1 = (j1 < fruits.length - 1)  ? j1 + 1 : 0;
            j2 = (j2 < fruits.length - 1)  ? j2 + 1 : 0;
            j3 = (j3 < fruits.length - 1)  ? j3 + 1 : 0;
            k1 = (k1 < fruits.length - 1)  ? k1 + 1 : 0;
            k2 = (k2 < fruits.length - 1)  ? k2 + 1 : 0;
            k3 = (k3 < fruits.length - 1)  ? k3 + 1 : 0;

            msg += `${colonnes[0][i1]} : ${colonnes[1][j1]} : ${colonnes[2][k1]} \n`;
            msg += `${colonnes[0][i2]} : ${colonnes[1][j2]} : ${colonnes[2][k2]} **<**\n`;
            msg += `${colonnes[0][i3]} : ${colonnes[1][j3]} : ${colonnes[2][k3]} \n`;

            tmsg.edit({embed: new Discord.MessageEmbed().setDescription(msg)}).catch(console.error);

        }

    }
}


function shuffle(arr){

    let array = new Array();
    arr.forEach(element => array.push(element));
    let currentIndex = array.length, temporaryValue, randomIndex;
    while(0 != currentIndex){
        randomIndex = Math.floor(Math.random()* currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;

}

function getCredits(number, isJackpot){

    if(!isJackpot) number = number*1.5;
    else number = number*4;
    return Math.round(number);

}