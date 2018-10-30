create or replace view V_AVAILABLE_TRIPS as
SELECT
  TRIP_ID, COUNTRY, "DATE", TRIP_NAME, SEATS_NUMBER, AVAILABLE_SEATS
FROM V_TRIPS_SEATS
WHERE AVAILABLE_SEATS > 0
