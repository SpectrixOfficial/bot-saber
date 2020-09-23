var axios = require("axios");
var Discord = require("discord.js");

module.exports = {
  name: "leaderboard",
  aliases: ["leaders", "lb"],
  description: "Current scoresaber global leaderboards.",
  usage: "b!leaderboard",
  async execute(msg, args) {
    msg.channel.startTyping();
    var config = {
      method: "get",
      url: "http://new.scoresaber.com/api/players/1",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "BeatSaberDiscordBot",
      },
    };

    axios(config)
      .then((res) => {
        var embedData = new Discord.MessageEmbed()
          .setColor("#309eff")
          .setTitle("**Top 10 Players Leaderboard.**")
          .setAuthor("Bot Saber")
          .setDescription(getTenPlayers(res.data.players))
          .setFooter(
            `Data fetched from ScoreSaber.`,
            "https://pbs.twimg.com/profile_images/1191299666048167936/tyGQRx5x_400x400.jpg",
          );

        msg.channel.send(embedData);

        msg.channel.stopTyping();
      })
      .catch((res) => {
        console.log(err);
        msg.channel.send(
          "❌ There was an error trying to execute that command!",
        );
        msg.channel.stopTyping();
      });
  },
};

function getTenPlayers(input) {
  var data = [];

  for (i = 0; i < 10; i++) {
    var player = input[i];
    data.push(
      `\`${player.rank}.\` [${player.playerName}](https://new.scoresaber.com/u/${player.playerId}) | **PP:** ${player.pp} | **Country:** ${player.country} :flag_${player.country.toLowerCase()}:`,
    );
  }

  return data;
}
