const {Client, GatewayIntentBits, Partials } = require('discord.js');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Message,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.User,
        Partials.Channel,
    ],
  })
const CONFIG = require('../config.json');

//comandos
const commandValidarEmail = require('./commands/validarEmail.js');



client.on("messageCreate", (message)=>{
    if(message.content.startsWith("+validarEmail")){
        commandValidarEmail.validarEmail(message);
    }
})




client.on("ready", ()=>{
    client.user.setActivity('GloboPlay', { type: 3 });
    console.log("Bot Online !");
})

client.login(CONFIG.TOKEN);
