-- returned row type
create or replace type T_AT_RECORD as object (
  TRIP_ID number,
  COUNTRY varchar2(50),
  TRIP_DATE date,
  TRIP_NAME varchar2(100),
  SEATS_NUMBER number,
  AVAILABLE_SEATS number
);

-- returned table type
create or replace type T_AT_TABLE as table of T_AT_RECORD;

-- function
create or replace function F_AVAILABLE_TRIPS (v_country in varchar2, v_date_from in date, v_date_to in date) return T_AT_TABLE as
  v_result T_AT_TABLE;
begin

  -- throw dates are ic correct order
  if v_date_from > v_date_to then
    raise_application_error(-20003, 'Argument date_from has to be earlier then date_to');
  end if;

  -- select data
  select
    T_AT_RECORD(t.TRIP_ID, t.COUNTRY, t."DATE", t.TRIP_NAME, t.SEATS_NUMBER, t.AVAILABLE_SEATS)
  bulk collect into
    v_result
  from V_AVAILABLE_TRIPS t
  where t.COUNTRY = v_country and t."DATE" > v_date_from and t."DATE" < v_date_to;

  -- return data
  return v_result;

end F_AVAILABLE_TRIPS;
