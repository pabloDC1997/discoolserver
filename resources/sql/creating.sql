drop schema if exists discool_db;

CREATE SCHEMA IF NOT EXISTS discool_db;

USE discool_db;

CREATE TABLE IF NOT EXISTS hosts (
id 			varchar(256) not null,
name		varchar(256) not null,
email		varchar(256) not null,
/*... compete this informations ...*/
PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS hosts_profile (
id_host		varchar(256) not null,
username	varchar(256) not null,
email		varchar(256) not null,
password	varchar(256) not null,
FOREIGN KEY (id_host) REFERENCES hosts(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS users (
id 			varchar(256) not null,
name		varchar(256) not null,
email		varchar(256) not null,
phone		varchar(256) null,
born_date	date null,
PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS users_profile (
id_user		varchar(256) not null,
email		varchar(256) not null,
password	varchar(256) not null,
FOREIGN KEY (id_user) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS parties(
id 			varchar(256) not null,
title 		varchar(100) not null,
description varchar(1200) not null,
thumb		varchar(500),
date	    date not null,
time		time not null,
id_host		varchar(256) not null,
PRIMARY KEY (id),
FOREIGN KEY (id_host) REFERENCES hosts (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table IF NOT EXISTS tickets(
id_party 	varchar(256),
link 		varchar(500),
description longtext,
PRIMARY KEY (id_party),
FOREIGN KEY (id_party) REFERENCES parties (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table IF NOT EXISTS locations (
id_party 			varchar(256) not null,
name 				varchar(256) not null,
address_descritpion	varchar(256),
link_maps			varchar(500),
PRIMARY KEY (id_party),
FOREIGN KEY (id_party) REFERENCES parties (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table IF NOT EXISTS party_action (
id_party 			varchar(256) not null,
id_user				varchar(256) not null,
action				varchar(1),
date				datetime DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_user) REFERENCES users (id),
FOREIGN KEY (id_party) REFERENCES parties (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;