# twitch-url-cli

Get a single m3u8 URL of a Twitch stream. You can then for example use that URL for [open-pip](https://github.com/albinekb/open-pip-cli).

## Installation

```sh
$ npm install --global twitch-url-cli
```

## Setup
You need a Twitch Client ID. See here [here how to set up one](https://blog.twitch.tv/client-id-required-for-kraken-api-calls-afbb8e95f843).

There are 3 possibilities how to set the client id. The app will look for a client id in this order:

### Flag
```sh
$ twitch-url --client-id=abcdefghijklmno12345
```

### Environment variable
```sh
$ TWITCH_CLIENT_TOKEN=abcdefghijklmno12345 twitch-url
```

### Dotfile (recommended)
If you would like to store the client ID permanently.
```sh
$ echo "abcdefghijklmno12345" > ~/.twitch-client-id
```

## CLI

```sh
$ twitch-url --help

	Usage
	  $ twitch-url [channel]

	Options
	  --client-id  Twitch API Client ID

	Examples
	  $ twitch-url Sacriel
	  http://video-edge-c686c4.lhr03.hls.ttvnw.net/v0/....index-live.m3u8
```


## License

MIT © [Jonny Burger](http://jonny.io)
