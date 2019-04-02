-- procedurre
create or replace procedure P_UPDATE_FREE_SEATS (v_trip_id in number) as
  v_taken_seats number;
begin

  -- get taken seats
  select count(*) into v_taken_seats from RESERVATIONS where TRIP_ID = v_trip_id and STATUS != 'A';

  -- update trip
  update TRIPS set FREE_SEATS = SEATS_NUMBER - v_taken_seats where TRIP_ID = v_trip_id;

end P_UPDATE_FREE_SEATS;
