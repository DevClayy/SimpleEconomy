const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("../config.json");
const client = new Discord.Client();
const db = require('quick.db');
module.exports = {
  name: "deposit", // Command Name
  description: "List all of my commands/info about a specific command.", // Description
  aliases: ["dep"], // Aliases
  usage: "<user>", // Usage
  cooldown: 0, // Cooldown In Seconds
  guildOnly: false, // If Command In DMs return
  admin: false, // Bot Admin only
  async execute(message, args, client) {   
    
    
        let user = message.author;

        let member = db.fetch(`money_${user.id}`)

        if (args[0] == 'all') {
            let money = await db.fetch(`money_${user.id}`)

            let embedbank = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setThumbnail(message.guild.iconURL())
                .setColor('GREEN')
                .setDescription("❌ | You don't have any money to deposit")

            if (!money) return message.channel.send(embedbank)

            db.subtract(`money_${user.id}`, money)
            db.add(`bank_${user.id}`, money)
        
            let sembed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ | You have deposited all your coins into your bank`);
            message.channel.send(sembed)

        } else {

            let embed2 = new Discord.MessageEmbed()
                .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setThumbnail(message.guild.iconURL())
                .setDescription(`❌ | Specify an amount to deposit`);

            if (!args[0]) {
                return message.channel.send(embed2)
                    .catch(err => message.channel.send(err.message))
            }
            let embed6 = new Discord.MessageEmbed()
                .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setThumbnail(message.guild.iconURL())
                .setDescription(`❌ | Your Amount Is Not A Number!`)

            if(isNaN(args[0])) {
                return message.channel.send(embed6)
            
            }
            let embed3 = new Discord.MessageEmbed()
                .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setThumbnail(message.guild.iconURL())
                .setDescription(`❌ | You can't deposit negative money`);

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }
            let embed4 = new Discord.MessageEmbed()
                .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setThumbnail(message.guild.iconURL())
                .setDescription(`❌ | You don't have that much money`);

            if (member < args[0]) {
                return message.channel.send(embed4)
            }

            let embed5 = new Discord.MessageEmbed()
                .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
.setThumbnail(message.guild.iconURL())
                .setDescription(`✅ | You have deposited \`${args[0]}\` coins into your bank`);

            message.channel.send(embed5)
            db.subtract(`money_${message.guild.id}_${message.author.id}`, args[0])
            db.add(`bank_${user.id}`, args[0])

        }
    }
}