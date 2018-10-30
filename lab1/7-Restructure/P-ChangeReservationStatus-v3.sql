-- procedurre
create or replace procedure P_CHANGE_RESERVATION_STATUS_3 (v_reservation_id in number, v_status in char) as
  v_id_count number;
  v_trip_id number;
begin

  -- check if reservation exists and don't have 'A' status
  select count(*) into v_id_count from RESERVATIONS where RESERVATION_ID = v_reservation_id and STATUS != 'A';

  -- throw exception if not
  if v_id_count != 1 then
    raise_application_error(-20006, 'Reservation with this id does not exists or has status A');
  end if;

  -- update reservation
  update RESERVATIONS SET STATUS = v_status WHERE RESERVATION_ID = v_reservation_id;
  
  -- update reservation log
  insert into RESERVATIONS_LOG (RESERVATION_ID, STATUS) values (v_reservation_id, v_status);

  -- update free seats
  select TRIP_ID into v_trip_id from RESERVATIONS where RESERVATION_ID = v_reservation_id;
  P_UPDATE_FREE_SEATS(V_TRIP_ID => v_trip_id);
  
end P_CHANGE_RESERVATION_STATUS_3;
