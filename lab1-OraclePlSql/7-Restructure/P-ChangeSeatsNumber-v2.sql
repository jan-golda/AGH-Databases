-- procedurre
create or replace procedure P_CHANGE_SEATS_NUMBER_2 (v_trip_id in number, v_seats_number in number) as
  v_id_count number;
begin

  -- check if trip exists
  select count(*) into v_id_count from TRIPS where TRIP_ID = v_trip_id;

  -- throw exception if not
  if v_id_count != 1 then
    raise_application_error(-20007, 'Trip with this id does not exists');
  end if;

  -- check if change is possible
  select count(*) into v_id_count from V_TRIPS_SEATS where TRIP_ID = v_trip_id and SEATS_NUMBER - AVAILABLE_SEATS <= v_seats_number;

  -- throw exception if not
  if v_id_count != 1 then
    raise_application_error(-20007, 'Cannot perform action because reservations number exceeds new seats number');
  end if;

  -- update reservation
  update TRIPS SET SEATS_NUMBER = v_seats_number WHERE TRIP_ID = v_trip_id;

  -- update free seats
  P_UPDATE_FREE_SEATS(V_TRIP_ID => v_trip_id);

end P_CHANGE_SEATS_NUMBER_2;
