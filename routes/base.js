module.exports = function(server) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            const model = {
                'name': 'Discool WS',
                'status': 'running',
                'version': "1.0.0",
                'description': 'Restful node'
            }
            reply(model);
            console.log(request.path)
        }
    });
}