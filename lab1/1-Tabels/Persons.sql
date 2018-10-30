create table PERSONS
(
	PERSON_ID NUMBER generated as identity
		constraint PERSONS_PK
			primary key,
	NAME VARCHAR2(50),
	SURNAME VARCHAR2(50),
	PESEL VARCHAR2(11),
	CONTACT VARCHAR2(100)
)
