create or replace view V_RESERVATIONS_TO_CANCEL as
select
  r.RESERVATION_ID, t.NAME as TRIP_NAME, p.NAME, p.SURNAME, p.CONTACT
from RESERVATIONS r
  join PERSONS p on r.PERSON_ID = p.PERSON_ID
  join TRIPS t on r.TRIP_ID = t.TRIP_ID
where
  r.STATUS = 'N' and t."DATE" <= (CURRENT_DATE + 7)
