module.exports = function() {
    return list_parties =
        ' select' +
        ' c.id,' +
        ' c.title,' +
        ' c.description,' +
        ' loc.name as lacationName,' +
        ' loc.address_descritpion as addressDescription,' +
        ' loc.link_maps as linkMaps,' +
        ' tk.link as ticketsLink,' +
        ' tk.description as ticketsDescription,' +
        ' c.thumb,' +
        ' c.date,' +
        ' c.time,' +
        ' c.id_host as idHost' +
        ' from 		parties c' +
        ' inner join 	locations loc on loc.id_party = c.id' +
        ' inner join 	tickets tk on tk.id_party = c.id;'
}