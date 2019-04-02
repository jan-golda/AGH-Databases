create trigger TR_RESERVATION_CHANGE after insert or update on RESERVATIONS
for each row
begin

  -- if there was a change in status
  if :NEW.STATUS != :OLD.STATUS then

    insert into RESERVATIONS_LOG (RESERVATION_ID, STATUS) values (:NEW.RESERVATION_ID, :NEW.STATUS);

  end if;

end;