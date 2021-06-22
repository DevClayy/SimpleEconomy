const config = require("../config.json");
const Discord = require("discord.js");
module.exports = {
  name: "help", // Command Name
  description: "List all of my commands/info about a specific command.", // Description
  aliases: ["h"], // Aliases
  usage: " ", // Usage
  cooldown: 5, // Cooldown In Seconds
  guildOnly: false, // If Command In DMs return
  admin: false, // Bot Admin only
  async execute(message, args, client) {    
      let prefix = config.prefix
    
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
    .setTitle(`Economy Bot`)
    .setDescription(`Economy's Default Prefix is: \`econ \` This can be changed in the Config.json file!  `)
    .addField(`General Commands`, `**\`${prefix} help\`** - Shows all the commands you can use!\n**\`${prefix} balance\`** - Check your Coin Balance.\n **\`${prefix} beg\`** - Beg for some Coins!\n **\`${prefix} withdraw\`** - Withdraw coins form the bank!\n **\`${prefix} deposit\`** - Deposit money into the bank.\n**\`${prefix} rob\`** - Rob a Users Wallet!\n**\`${prefix} daily\`** - Get your Daily Coins.\n **\`${prefix} leaderboard\`** - Check a server's leaderboard.`);
    message.channel.send(embed)
  }
};
