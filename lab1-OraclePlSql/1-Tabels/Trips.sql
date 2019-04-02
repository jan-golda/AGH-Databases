create table TRIPS
(
	TRIP_ID NUMBER generated as identity
		constraint TRIPS_PK
			primary key,
	NAME VARCHAR2(100),
	COUNTRY VARCHAR2(50),
	"DATE" DATE,
	DESCRIPTION VARCHAR2(200),
	SEATS_NUMBER NUMBER
)
