const { getunplash } = require('../../functions');
module.exports = {
    name: "hamster",
    category: "animals",
    run: async (client, message, args) => {
        let embed = await getunplash('hamster');
        if (embed === null) return message.channel.send('Bot lỗi, vui lòng thử lại sau!');
        message.channel.send(embed);
    }
}