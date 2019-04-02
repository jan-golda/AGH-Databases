create table RESERVATIONS
(
	RESERVATION_ID NUMBER generated as identity
		constraint RESERVATIONS_PK
			primary key,
	TRIP_ID NUMBER
		constraint RESERVATIONS_FK2
			references TRIPS,
	PERSON_ID NUMBER
		constraint RESERVATIONS_FK1
			references PERSONS,
	STATUS CHAR
		constraint RESERVATIONS_CHK1
			check (status IN ('N','P','Z','A'))
)
