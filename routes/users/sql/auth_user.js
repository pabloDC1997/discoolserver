module.exports = function(email) {
    return 'select * from users_profile where email = "' + email + '";';
}