// require your server and launch it here
const server = require('./api/server');

const port = 4000;

server.listen(4000,() => {
    console.log(`Server running on ${port}`)
});