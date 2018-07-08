module.exports = function() {
    return ' select  u.id, u.name, u.email, u.phone, u.born_date' +
    ' from users u' +
    ' join users_profile p on p.id_user = u.id';
}