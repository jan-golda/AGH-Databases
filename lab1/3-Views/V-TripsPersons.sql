create or replace view V_TRIPS_PERSONS as
SELECT
      t.TRIP_ID,
      t.COUNTRY,
      t."DATE",
      t.NAME AS TRIP_NAME,
      p.PERSON_ID,
      p.NAME,
      p.SURNAME,
      r.STATUS AS RESERVATION_STATUS
    FROM TRIPS t
      JOIN RESERVATIONS r ON t.TRIP_ID = r.TRIP_ID
      JOIN PERSONS p on r.PERSON_ID = p.PERSON_ID
