insert into users values (:id, :name, :email, :phone, null);

insert into users_profile values (:id, :email, :password);

select 
	(case 
		when(select count(*) from users_profile where email = :email) > 0
			then
				true
			else
				false
    end) exist