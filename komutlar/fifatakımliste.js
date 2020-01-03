const fnt = require("fortnitetracker-7days-stats");
exports.run = async (client, message, args) => {
  let platform = args[0]
  let user = args.slice(1).join(" ")
  
  if(!platform) return message.channel.send("Lütfen bir platform belirtiniz!\nMevcut platformlar: \`pc\`, \psn, xbl")
  fnt.getStats(user, platform, (err, result) => {
    if (err) {
      console.log(err.message); // player not found
    } else {
      console.log("Wins in the last 7 days: " + result.wins);
    }
  });
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "s",
  description: "s.",
  usage: "s"
};
