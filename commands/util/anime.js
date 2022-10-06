const { EmbedBuilder } = require('discord.js');
const kitsu = require('kitsu.js');
const Kitsu = new kitsu();

module.exports = {
  name: 'anime',
  description: 'Returns anime information',
  run: async (client, message, args) => {
    message.delete();
    const search = args.join(' ');

    if (!search) {
      message.channel.send('Please provide the name of the anime');
    }

    Kitsu.searchAnime(search).then(async result => {
      if (result.length === 0) {
        return message.channel.send(`No results found for **${anime}**!`);
      }

      const anime = result[0];

      const embed = new EmbedBuilder()
        .setColor('FF2050')
        .setTitle(anime.titles.english ? anime.titles.english : search | anime.showType)
        .setFooter({ text: anime.titles.english ? anime.titles.english : search | anime.showType, iconURL: anime.posterImage.original })
        .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
        .addFields(
          { name: '❯\u2000Information', value: `•\u2000**Japanese Name:** ${anime.titles.romaji}\n•\u2000**Age Rating:** ${anime.ageRating}\n•\u2000**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}` },
          { name: '❯\u2000Stats', value: `•\u2000**Average Rating:** ${anime.averageRating}\n•\u2000**Rating Rank:** ${anime.ratingRank}\n•\u2000**Popularity Rank:** ${anime.popularityRank}` },
          { name: '❯\u2000Status', value: `•\u2000**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n•\u2000**Start Date:** ${anime.startDate}\n•\u2000**End Date:** ${anime.endDate ? anime.endDate : 'Still airing'}` },
        )
        .setThumbnail(anime.posterImage.original, 100, 200);

      return message.channel.send({ embeds: [embed] });
    }).catch(err => {
      console.log(err);
      return message.channel.send(`No results found for **${search}**`);
    });
  }
}