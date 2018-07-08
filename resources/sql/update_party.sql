update  parties set 
title		= :title, 
description	= :description, 
thumb		= :thumb, 
date		= :dateParty, 
time		= :timeParty
where id = :id;

update  locations set 
name 				= :nameLocation,
address_descritpion = :addressDescription,
link_maps 			= :linkMaps
where id_party 		= :id;

update  tickets set 
link 			= :linkTickets,
description 	= :descriptionTickets
where id_party 	= :id;