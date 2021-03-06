module.exports = {
    name: 'partylist',
    alt: 'list',
    secret: false,
    description: "Lists members of the selected party",
    execute(message, args, bot) {
        if (args.length) {
            //create necessary variables
            const Discord = require('discord.js');
            const fs = require('fs');
            //converts the arguments into a single 'name'
            name = '';
            while (args.length > 0) {
                name += " " + args.shift();
            }
            name = name.substring(1);
            //turns 'name' into a file directory
            filename = "./parties/" + name.toLowerCase() + ".json";
            //create an array of words in the 'name' string
            var namearr = name.split(" ");
            name = "";
            for (c = 0; c < namearr.length; c++) {
                //capitalize the words in 'name' and read them back into a string
                name += namearr[c].charAt(0).toUpperCase() + namearr[c].substring(1) + " ";
            }
            //creates an embed with 'name' as the title
            const partyembed = new Discord.MessageEmbed().setTitle(name);
            partyembed.color = 0x7289da;
            //reads the file called 'name' into a string variable
            var data = fs.readFileSync(filename, 'utf8');
            //remove quotes from the file contents
            data = data.substring(1, data.length - 1);
            //separate data from different users and read them into an array
            var arr = data.split(" : ");
            //for each item in the array add the user's name to 'desc'
            var desc = "";
            for (let i = 0; i < arr.length; i++) {
                desc += (((i + 1) + ". ") + arr[i].split(", ")[0] + "\n");
            }
            //set the embed description to 'desc'
            partyembed.setDescription(desc);
            //print the embed, listing the users belonging to a certain party
            message.channel.send(partyembed);
        }
        else {
            message.channel.send("Try entering a party to list");
        }
    }
}