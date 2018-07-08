module.exports = function(id, title, description, thumb, dateParty, timeParty, nameLocation, addressDescription, linkMaps, linkTickets, descriptionTickets) {
    
        var update_party =
        ' update  parties set' +
        ' title		= "' + title + '",' + 
        ' description	= "' + description + '",' + 
        ' thumb		= "' + thumb + '",' + 
        ' date		= "' + dateParty + '",' + 
        ' time		= "' + timeParty + '"' +
        ' where id = "' + id + '";';
    
        var update_location =
        ' update  locations set'+
        ' name 				= "' + nameLocation + '",'+
        ' address_descritpion = "' + addressDescription + '",'+
        ' link_maps 			= "' + linkMaps + '"'+
        ' where id_party 		= "' + id + '";';
    
        var update_tickets =
        ' update  tickets set'+
        ' link 			= "' + linkTickets + '",'+
        ' description 	= "' + descriptionTickets + '"'+
        ' where id_party 	= "' + id + '";';
    
        return {
            'update_party': update_party,
            'update_location': update_location,
            'update_tickets': update_tickets
        }
    }