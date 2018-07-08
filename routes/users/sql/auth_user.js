module.exports = function(email) {
    return ' select p.id_user as id, p.email, p.password, u.name, u.phone' +
    ' from users_profile p' +
    ' join users u on u.id = p.id_user' +
    ' where u.email = "' + email + '";'

}