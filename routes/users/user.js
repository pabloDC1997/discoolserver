const mMapping = 'users'

module.exports = function(baseMapping, server, connection, Joi) {

    const baseUrl = '/' + baseMapping + '/' + mMapping;

    server.route({
        method: 'POST',
        path: baseUrl + '/auth',
        handler: function(request, reply) {
            console.log(request.path);

            const email = request.payload.email;
            const password = request.payload.password;

            var response;

            const sql = require('./sql/auth_user')(email);

            connection.query(sql,
                function(error, results, fields) {
                    if (error) throw error;
                    var aux = {
                        user: results
                    };

                    var user = aux.user[0];
                    var response;
                    if (user != null) {

                        if (user.password == password) {
                            response = {
                                profile: user
                            };
                            response.status = true;
                            response.msg = 'usuario foi autenticado';
                        } else {
                            profile = {
                                id: user.id,
                                email: user.email
                            };
                            response = {
                                profile: profile
                            };
                            response.status = false;
                            response.msg = 'senha incorreta';
                        }
                    } else {
                        response = {
                            status: false,
                            msg: "Usuario não existe."
                        }
                    }

                    reply(response);
                });
        },
        config: {
            validate: {
                payload: {
                    email: Joi.string(),
                    password: Joi.string()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: baseUrl + '/list',
        handler: function(request, reply) {
            console.log(request.path);
            const sql = require('./sql/list_users')();
            connection.query(sql,
                function(error, results, fields) {
                    if (error) throw error;
                    reply(results);
                });
        }
    });

    server.route({
        method: 'POST',
        path: baseUrl + '/insert',
        handler: function(request, reply) {
            console.log(request.path);

            const id = request.payload.id;
            const name = request.payload.name;
            const email = request.payload.email;
            const phone = request.payload.phone;
            const password = request.payload.password;

            const sql = require('./sql/singup_user')(id, name, email, phone, password);

            connection.query(sql.validate,
                function(error, results, fields) {
                    if (error) throw error;

                    if (results[0].exist) {
                        reply({
                            'cadastro': false,
                            'msg': 'E-mail já foi cadastrado.',
                            'ex': 'exception gerada ao inserir user'
                        });
                    }
                });

            connection.getConnection(function(error, connect) {
                connect.beginTransaction(function(err) {
                    if (err) throw err;

                    connect.query(sql.insert_user,
                        function(err, result) {
                            if (err) {
                                connect.rollback(function() {
                                    throw err;
                                });

                                reply({
                                    'cadastro': false,
                                    'msg': 'não foi possivel cadastrar usuario',
                                    'ex': 'exception gerada ao inserir user'
                                });
                            } else {
                                connect.query(sql.insert_user_profile,
                                    function(err, result) {
                                        if (err) {
                                            connect.rollback(function() {
                                                throw err;
                                            });

                                            reply({
                                                'cadastro': false,
                                                'msg': 'não foi possivel cadastrar usuario',
                                                'ex': 'exception gerada ao inserir perfil'
                                            });
                                        } else {
                                            connect.commit(function(err) {
                                                if (err) {
                                                    connect.rollback(function() {
                                                        throw err;
                                                    });
                                                } else {
                                                    reply({
                                                        'cadastro': true,
                                                        'msg': 'usuario cadastrado com sucesso',
                                                        'ex': null
                                                    });
                                                }
                                            });
                                        }
                                    }
                                )
                            }
                        });
                });
            });
        },
        config: {
            validate: {
                payload: {
                    id: Joi.string().required(),
                    name: Joi.string().required(),
                    email: Joi.string().required(),
                    phone: Joi.string().required(),
                    password: Joi.string().required()
                }
            }
        }
    });

}