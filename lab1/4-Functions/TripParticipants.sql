-- returned row type
create or replace type T_TP_RECORD as object (
  TRIP_ID number,
  COUNTRY varchar2(50),
  TRIP_DATE date,
  TRIP_NAME varchar2(100),
  PERSON_ID number,
  "NAME" VARCHAR2(50),
  SURNAME VARCHAR2(50),
  RESERVATION_STATUS CHAR
);

-- returned table type
create or replace type T_TP_TABLE as table of T_TP_RECORD;

-- function
create or replace function F_TRIP_PARTICIPANTS (v_trip_id in number) return T_TP_TABLE as
  v_result T_TP_TABLE;
  v_id_count number;
begin

  -- check if trip exists
  select count(*) into v_id_count from TRIPS where TRIP_ID = v_trip_id;

  -- throw exception if not
  if v_id_count != 1 then
    raise_application_error(-20001, 'Trip with this id does not exists');
  end if;

  -- select data
  select
    T_TP_RECORD(t.TRIP_ID, t.COUNTRY, t."DATE", t.TRIP_NAME, t.PERSON_ID, t.NAME, t.SURNAME, t.RESERVATION_STATUS)
  bulk collect into
    v_result
  from V_TRIPS_PERSONS_CONFIRMED t
  where t.TRIP_ID = v_trip_id;

  -- return data
  return v_result;

end F_TRIP_PARTICIPANTS;
