module.exports = function(id, name, email, phone, born_date, password) {

    var insert_user = 'insert into users values ("' + id + '", "' + name + '", "' + email + '", "' + phone + '", null);'

    var insert_user_profile = 'insert into users_profile values ("' + id + '", "' + email + '", "' + password + '");'

    var select_validade =
        ' select' +
        ' (case' +
        ' when(select count(*) from users_profile where email = "' + email + '") > 0' +
        ' then true else false end) exist;';

    return {
        'validate': select_validade,
        'insert_user': insert_user,
        'insert_user_profile': insert_user_profile
    };
}