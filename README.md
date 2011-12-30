# Proxy

This proxy server is sitting on one of my machines that runs Node.js exclusively.

It makes use of the [node-http-proxy](https://github.com/nodejitsu/node-http-proxy) module and watches a config file for local proxies. It's simply monitoring the file and reloading the router.

This server runs on port 80, and my other servers run on different ports on the same machine. Simply change `config.json` and it will reload the config.
