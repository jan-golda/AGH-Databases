create or replace trigger TR_TRIP_CHANGE before insert or update on TRIPS
for each row
declare
  v_taken_seats number;
begin

  -- update free seats if there was a change in seats number
  if :NEW.SEATS_NUMBER != :OLD.SEATS_NUMBER then

    -- update has to be manual because it is impossible to call P_UPDATE_FREE_SEATS

    -- get taken seats
    select count(*) into v_taken_seats from RESERVATIONS where TRIP_ID = :NEW.TRIP_ID and STATUS != 'A';

    -- update trip
    :NEW.FREE_SEATS := :NEW.SEATS_NUMBER - v_taken_seats;

  end if;

end;