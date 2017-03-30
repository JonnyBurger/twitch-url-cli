#!/usr/bin/env node
'use strict';
const meow = require('meow');
const fs = require('fs');
const os = require('os');
const path = require('path');

const cli = meow(`
	Usage
	  $ twitch-url [channel]

	Options
	  --client-id  Twitch API Client ID [Default: null]

	Examples
	  $ twitch-url Sacriel
	  http://video-edge-c686c4.lhr03.hls.ttvnw.net/v0/....index-live.m3u8
`);

const errorAndQuit = err => {
	console.error(`Error: ${err.message}`);
	process.exit(1);
};

const getClientId = flags => {
	if (flags.clientId) {
		return flags.clientId;
	}
	if (process.env.TWITCH_CLIENT_ID) {
		return process.env.TWITCH_CLIENT_ID;
	}
	const tokenPath = path.join(os.homedir(), '.twitch-client-id');
	const exists = fs.existsSync(tokenPath);
	if (exists) {
		return fs.readFileSync(tokenPath, 'utf8').trim();
	}
	errorAndQuit(new Error(`No client ID set. Use either --client-id flag, set TWITCH_CLIENT_ID flag, or save token permanently in ${tokenPath}`));
};

const twitchGetStream = require('twitch-get-stream')(getClientId(cli.flags));

if (!cli.input.length) {
	return console.log(cli.help);
}

twitchGetStream.get(cli.input[0])
.then(streams => {
	const onlyM3u8 = streams.filter(stream => stream.url.endsWith('.m3u8'));
	console.log(onlyM3u8[0].url);
})
.catch(err => {
	if (err.message === 'Not Found') {
		errorAndQuit(new Error('Channel is not online'));
	} else {
		errorAndQuit(err);
	}
});
