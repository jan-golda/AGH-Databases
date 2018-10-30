-- function
create or replace function F_UPCOMING_RESERVATIONS_PERSON (v_person_id in number) return T_TP_TABLE as
  v_result T_TP_TABLE;
  v_id_count number;
begin

  -- check if person exists
  select count(*) into v_id_count from PERSONS where PERSON_ID = v_person_id;

  -- throw exception if not
  if v_id_count != 1 then
    raise_application_error(-20002, 'Person with this id does not exists');
  end if;

  -- select data
  select
    T_TP_RECORD(t.TRIP_ID, t.COUNTRY, t."DATE", t.TRIP_NAME, t.PERSON_ID, t.NAME, t.SURNAME, t.RESERVATION_STATUS)
  bulk collect into
    v_result
  from V_UPCOMING_TRIPS t
  where t.PERSON_ID = v_person_id;

  -- return data
  return v_result;

end F_UPCOMING_RESERVATIONS_PERSON;
