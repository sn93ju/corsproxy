// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8081;

var cors_proxy = require('cors-anywhere');
const server = cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [/*'origin', 'x-requested-with'*/],
    removeHeaders: ['cookie', 'cookie2']
});
server.on('request', function(request) {
    let href = request.corsAnywhereRequestState.location.href;
    if (href.length> 43) {
        href = href.substring(0, 40) + '...';
    }
    console.log(`[${new Date().toISOString()}] ${request.method} "${href}" from ${request.headers.origin || request.headers.referer}`);
});
server.listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});