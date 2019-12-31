const Discord = require("discord.js"),
  bs = require("brawlstars");
const client2 = new bs.Client({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNjb3JkX3VzZXJfaWQiOiI0MDQyMDY3OTIwMDUxMjQwOTYiLCJyZWFzb24iOiJEYXZldCBZw7ZuZXRpY2lzaSIsInZlcnNpb24iOjEsImlhdCI6MTU3Nzc5ODEzMH0.24x3Js8gHPGLp4dYaWNyxRWeOgrzXqGNUMRUJrrw7Oo"
});
exports.run = async (client, message, args) => {
  const player = await client.getPlayer("#C2L0");
  console.log(player);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4,
  kategori: "yapımcı"
};
exports.help = {
  name: "bs",
  description: "bs",
  usage: "bs"
};
