create trigger TR_RESERVATIONS_DELETE before delete on RESERVATIONS
begin
  raise_application_error(-20100, 'Reservations cannot be deleted');
end;
