const mMapping = 'parties'

module.exports = function(baseMapping, server, connection, Joi) {

    const baseUrl = '/' + baseMapping + '/' + mMapping;

    server.route({
        method: 'GET',
        path: baseUrl + '/list',
        handler: function(request, reply) {
            console.log(request.path);

            var sql = require('./sql/list_parties')();

            connection.query(sql,
                function(error, results, fields) {
                    if (error) throw error;
                    reply(results);
                });
        }
    });

    server.route({
        method: 'GET',
        path: baseUrl + '/list/id/{id}',
        handler: function(request, reply) {
            console.log(request.path);

            const id = request.params.id;
            const sql = require('./sql/list_parties_by_id')(id);

            connection.query(sql,
                function(error, results, fields) {
                    if (error) throw error;
                    reply(results);
                }
            )
        },
        config: {
            validate: {
                params: {
                    id: Joi.string().required(),
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: baseUrl + '/list/like/{name}',
        handler: function(request, reply) {
            console.log(request.path);

            const name = request.params.name;
            const sql = require('./sql/list_by_name')(name);

            connection.query(sql,
                function(error, results, fields) {
                    if (error) throw error;
                    reply(results);
                }
            )
        },
        config: {
            validate: {
                params: {
                    name: Joi.string().required(),
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: baseUrl + '/insert',
        handler: function(request, reply) {
            console.log(request.path);

            const id = request.payload.id;
            const title = request.payload.title;
            const description = request.payload.description;
            const thumb = request.payload.thumb;
            const dateParty = request.payload.dateParty;
            const timeParty = request.payload.timeParty;
            const nameLocation = request.payload.nameLocation;
            const addressDescription = request.payload.addressDescription;
            const linkMaps = request.payload.linkMaps;
            const linkTickets = request.payload.linkTickets;
            const descriptionTickets = request.payload.descriptionTickets;
            const idHost = request.payload.idHost;

            const sql = require('./sql/insert_new_party')(id, title, description, thumb, dateParty, timeParty, nameLocation, addressDescription, linkMaps, linkTickets, descriptionTickets, idHost);

            connection.getConnection(function(error, connect) {


                connect.beginTransaction(function(err) {
                    if (err) throw err;

                    connect.query(sql.insert_party,
                        function(err, result) {
                            if (err) {
                                connect.rollback(function() {
                                    throw err;
                                });

                                reply({
                                    'insert': false,
                                    'msg': 'não foi possivel inserir novo evento',
                                    'ex': 'exception gerada ao inserir party'
                                });
                            } else {
                                connect.query(sql.insert_location,
                                    function(err, result) {
                                        if (err) {
                                            connect.rollback(function() {
                                                throw err;
                                            });

                                            reply({
                                                'insert': false,
                                                'msg': 'não foi possivel inserir novo evento',
                                                'ex': 'exception gerada ao inserir location'
                                            });
                                        } else {
                                            connect.query(sql.insert_tickets,
                                                function(err, result) {
                                                    if (err) {
                                                        connect.rollback(function() {
                                                            throw err;
                                                        });

                                                        reply({
                                                            'insert': false,
                                                            'msg': 'não foi possivel inserir novo evento',
                                                            'ex': 'exception gerada ao inserir tickets'
                                                        });
                                                    } else {
                                                        connect.commit(function(err) {
                                                            if (err) {
                                                                connect.rollback(function() {
                                                                    throw err;
                                                                });
                                                            } else {
                                                                reply({
                                                                    'status': true,
                                                                    'msg': 'novo evento criado com sucesso',
                                                                    'ex': null
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                        }
                                    });
                            }
                        });
                });
            });

        },
        config: {
            validate: {
                payload: {
                    id: Joi.string().required(),
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    thumb: Joi.string().required(),
                    dateParty: Joi.string().required(),
                    timeParty: Joi.string().required(),
                    nameLocation: Joi.string().required(),
                    addressDescription: Joi.string().required(),
                    linkMaps: Joi.string().required(),
                    linkTickets: Joi.string().required(),
                    descriptionTickets: Joi.string().required(),
                    idHost : Joi.string().required()
                }
            }
        }
    });
// editando abaixo
    server.route({
        method: 'PUT',
        path: baseUrl + '/edit',
        handler: function(request, reply) {
            console.log(request.path);

            const id = request.payload.id;
            const title = request.payload.title;
            const description = request.payload.description;
            const thumb = request.payload.thumb;
            const dateParty = request.payload.dateParty;
            const timeParty = request.payload.timeParty;
            const nameLocation = request.payload.nameLocation;
            const addressDescription = request.payload.addressDescription;
            const linkMaps = request.payload.linkMaps;
            const linkTickets = request.payload.linkTickets;
            const descriptionTickets = request.payload.descriptionTickets;

            const sql = require('./sql/update_party')(id, title, description, thumb, dateParty, timeParty, nameLocation, addressDescription, linkMaps, linkTickets, descriptionTickets);

            connection.getConnection(function(error, connect) {


                connect.beginTransaction(function(err) {
                    if (err) throw err;

                    connect.query(sql.update_party,
                        function(err, result1) {
                            if (err) {
                                connect.rollback(function() {
                                    throw err;
                                });

                                reply({
                                    'insert': false,
                                    'msg': 'não foi possivel editar evento',
                                    'ex': 'exception gerada ao editar party'
                                });
                            } else {
                                connect.query(sql.update_location,
                                    function(err, result2) {
                                        if (err) {
                                            connect.rollback(function() {
                                                throw err;
                                            });

                                            reply({
                                                'insert': false,
                                                'msg': 'não foi possivel editar evento',
                                                'ex': 'exception gerada ao editar location'
                                            });
                                        } else {
                                            connect.query(sql.update_tickets,
                                                function(err, result3) {
                                                    if (err) {
                                                        connect.rollback(function() {
                                                            throw err;
                                                        });

                                                        reply({
                                                            'insert': false,
                                                            'msg': 'não foi possivel editar evento',
                                                            'ex': 'exception gerada ao editar tickets'
                                                        });
                                                    } else {
                                                        connect.commit(function(err) {
                                                            if (err) {
                                                                connect.rollback(function() {
                                                                    throw err;
                                                                });
                                                            } else {
                                                                if(result1.affectedRow && result2.affectedRow && result3.affectedRow) {
                                                                    reply({
                                                                        'status': true,
                                                                        'msg': 'evento editado com sucesso',
                                                                        'ex': null
                                                                    });
                                                                } else {
                                                                    reply({
                                                                        'status': false,
                                                                        'msg': 'evento não foi editado',
                                                                        'ex': 'não hove alteração no banco de dados'
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    }
                                                });
                                        }
                                    });
                            }
                        });
                });
            });

        },
        config: {
            validate: {
                payload: {
                    id: Joi.string().required(),
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    thumb: Joi.string().required(),
                    dateParty: Joi.string().required(),
                    timeParty: Joi.string().required(),
                    nameLocation: Joi.string().required(),
                    addressDescription: Joi.string().required(),
                    linkMaps: Joi.string().required(),
                    linkTickets: Joi.string().required(),
                    descriptionTickets: Joi.string().required()
                }
            }
        }
    });
}