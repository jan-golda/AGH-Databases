-- procedurre
create or replace procedure P_UPDATE_FREE_SEATS_ALL as
begin

  -- for each trip update its seats
  for v_trip in (select TRIP_ID FROM TRIPS) loop

    P_UPDATE_FREE_SEATS(V_TRIP_ID => v_trip.TRIP_ID);

  end loop;

end P_UPDATE_FREE_SEATS_ALL;
