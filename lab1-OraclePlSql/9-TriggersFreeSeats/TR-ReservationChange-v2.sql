create or replace trigger TR_RESERVATION_CHANGE after insert or update on RESERVATIONS
for each row
begin

  if ((:OLD.STATUS is null) or (:OLD.STATUS = 'A')) and (:NEW.STATUS != 'A') THEN
    update TRIPS set FREE_SEATS = FREE_SEATS - 1
    where TRIP_ID = :NEW.TRIP_ID;
  end if;

  if ((:OLD.STATUS is not null) and (:OLD.STATUS != 'A')) and (:NEW.STATUS = 'A') THEN
    update TRIPS set FREE_SEATS = FREE_SEATS + 1
    where TRIP_ID = :NEW.TRIP_ID;
  end if;

  -- if there was a change in status
  if :NEW.STATUS != :OLD.STATUS then

    insert into RESERVATIONS_LOG (RESERVATION_ID, STATUS) values (:NEW.RESERVATION_ID, :NEW.STATUS);

  end if;

end;
