const ascii = require("ascii-table");
module.exports = (client) => {
const { readdirSync } = require("fs");
let count = 0;
const table = new ascii("Commands");
table.setHeading("Command", "Load status");
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (const file of commands) {
            const fileName = `../commands/${dir}/${file}`;
            const pull = require(fileName);
            delete require.cache[require.resolve(fileName)];
            if (pull.name) {
                count++;
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });

    console.log(table.toString());
    console.log(`${count} lệnh đã sẵn sàng hoạt động.`);
};