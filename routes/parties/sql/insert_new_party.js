module.exports = function(id, title, description, thumb, dateParty, timeParty, nameLocation, addressDescription, linkMaps, linkTickets, descriptionTickets, idHost) {

    var insert_party =
        'insert into parties values ("' + id + '", "' + title + '", "' + description + '", "' + thumb + '", "' + dateParty + '", "' + timeParty + '", "' + idHost + '");';

    var insert_location =
        'insert into locations values ("' + id + '", "' + nameLocation + '", "' + addressDescription + '", "' + linkMaps + '");';

    var insert_tickets =
        'insert into tickets values ("' + id + '", "' + linkTickets + '", "' + descriptionTickets + '");';

    return {
        'insert_party': insert_party,
        'insert_location': insert_location,
        'insert_tickets': insert_tickets
    }
}