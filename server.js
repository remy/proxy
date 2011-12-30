var http = require('http'),
    httpProxy = require('http-proxy'),
    fs = require('fs'),
    util = require('util'),
    configFile = './config.json',
    options = {
      hostnameOnly: true,
      router: {}
    },
    port = process.env.PORT || process.argv[2] || 80,
    proxyServer = httpProxy.createServer(options);

function loadConfig() {
  util.log('Reading config file');
  fs.readFile(configFile, 'utf8', function (err, data) {
    if (!err) {
      try {
        options.router = JSON.parse(data || '{}');
      } catch (e) {
        util.log('failed to parse config');
        options.router = {};
      }
      proxyServer.close();
      console.dir(options.router);
      proxyServer = httpProxy.createServer(options);
      proxyServer.listen(port);
    }
  });
}
fs.watchFile(configFile, function (curr,prev) {
  // only looking for file changes
  if (curr.mtime.toString() === prev.mtime.toString()) return;
  loadConfig();
});

proxyServer.listen(port);
util.log('Listening on port '+ port);
loadConfig();
