create table RESERVATIONS_LOG
(
	LOG_ID number generated as identity
		constraint RESERVATIONS_LOG_PK
			primary key,
  RESERVATION_ID number
		constraint RESERVATIONS_LOG_FK1
			references RESERVATIONS,
  LOG_DATE date
    default sysdate,
  STATUS char
)
