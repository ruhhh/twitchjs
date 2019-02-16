const CONFIG = require('./config.json');
const tmi = require('tmi.js');
const channels = ['forsen'];
const opts = {
    identity: {
        username: CONFIG.user,
        password: CONFIG.oauth
    },
    channels: channels
};

const client = new tmi.client(opts);

client.on('chat', onMessageHandler);
client.on('connected', onConnectedHandler);
// client.on('join', onJoinHandler);

client.connect();

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

function onMessageHandler(channel, user, message, self) {
    if (self) { return; }

    const msg = message.trim();
    console.log(`${user.username}: ${msg}`);
}

function onJoinHandler(channel, username, self) {
    if (self) { return; }

    console.log(`* ${username} joined ${channel}`);
}