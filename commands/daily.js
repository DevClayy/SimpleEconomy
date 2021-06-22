const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("../config.json");
const client = new Discord.Client();
const ms = require('ms')
const db = require('quick.db');
const amount = ['213', '876', '363', '3263', '168', '2222', '222', '22', '3', '897', '978', '568', '167', '564', '653', '123', '7247', '0156', '0999', '6660', '1234', '8976', '4696', '5923', '1982', '9899', '9369']
module.exports = {
  name: "daily", // Command Name
  description: "List all of my commands/info about a specific command.", // Description
  aliases: ["h"], // Aliases
  usage: "<user>", // Usage
  cooldown: 0, // Cooldown In Seconds
  guildOnly: false, // If Command In DMs return
  admin: false, // Bot Admin only
  async execute(message, args, client) {    
      let prefix = config.prefix

let user = message.author;

        let timeout = 86400000;
                let amount1 = `${amount[Math.floor(Math.random()*amount.length)]}`

        let daily = await db.fetch(`daily_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`<:XNo:846987852716834856> | You've already collected your Daily Credits!\n\n> **Note:** You must wait 24h Before Collecting Again!`);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ | You've collected your daily reward of ${amount} Credits`);
            message.channel.send(moneyEmbed)
            db.add(`money_${message.guild.id}_${message.author.id}`, amount1)
            db.set(`daily_${user.id}`, Date.now())


        }
    }
}