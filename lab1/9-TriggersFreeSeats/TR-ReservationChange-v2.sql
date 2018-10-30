create or replace trigger TR_RESERVATION_CHANGE after insert or update on RESERVATIONS
for each row
begin

  -- update free seats
  P_UPDATE_FREE_SEATS(:NEW.TRIP_ID);
  
  -- update old trip if it was changed
  if (:OLD.TRIP_ID is not null) and (:OLD.TRIP_ID != :NEW.TRIP_ID) then 
    P_UPDATE_FREE_SEATS(:OLD.TRIP_ID);
  end if;

  -- if there was a change in status
  if :NEW.STATUS != :OLD.STATUS then

    insert into RESERVATIONS_LOG (RESERVATION_ID, STATUS) values (:NEW.RESERVATION_ID, :NEW.STATUS);

  end if;

end;