select characters.id as id, characters.name as name, description, imageurl, specialattackid, element.name as elementname, element.color as color, framed from characters
join element on characters.elementid = element.id
order by id