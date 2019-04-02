-- procedurre
create or replace procedure P_ADD_RESERVATION_5 (v_trip_id in number, v_person_id in number) as
  v_id_count number;
  v_reservation_id number;
begin

  -- check if trip exists and is available
  select count(*) into v_id_count from V_AVAILABLE_TRIPS where TRIP_ID = v_trip_id;

  -- throw exception if not
  if v_id_count != 1 then
    raise_application_error(-20004, 'Trip with this is unavailable or does not exists');
  end if;

  -- check if person exists
  select count(*) into v_id_count from PERSONS where PERSON_ID = v_person_id;

  -- throw exception if not
  if v_id_count != 1 then
    raise_application_error(-20002, 'Person with this id does not exists');
  end if;

  -- check if there is no reservation for this person on this trip
  select count(*) into v_id_count from RESERVATIONS where TRIP_ID = v_trip_id and PERSON_ID = v_person_id;

  -- throw exception if not
  if v_id_count != 0 then
    raise_application_error(-20005, 'This person already has reservation for this trip');
  end if;

  -- create reservation
  insert into RESERVATIONS (TRIP_ID, PERSON_ID, STATUS) VALUES (v_trip_id, v_person_id, 'N') returning RESERVATION_ID into v_reservation_id;

end P_ADD_RESERVATION_5;
