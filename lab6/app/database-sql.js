// imports
import mysql from 'mysql';
import ApiError from "./ApiError";

// setup database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'rest'
});

connection.connect();


// ====================================================
//  PATIENTS
// ====================================================

export function getPatient(id, cb) {
  connection.query(`SELECT * FROM 'patients' WHERE 'id'=${id}`, (err, res) => {
    if(err)
      throw new ApiError(500, "Sql error");
    cb(res[0]);
  });
}

export function getPatients(cb) {
  connection.query(`SELECT * FROM 'patients'`, (err, res) => {
    if(err)
      throw new ApiError(500, "Sql error");
    cb(res);
  });
}

export function hasPatients(cb) {
  connection.query(`SELECT count(*) AS 'count' FROM 'patients'`, (err, res) => {
    if(err)
      throw new ApiError(500, "Sql error");
    cb(res[0].count > 0);
  });
}

export function createPatient(name, surname, cb) {
  connection.query(`INSERT INTO 'patients' (name, surname) VALUES ('${name}', '${surname}')`, (err) => {
    if(err)
      throw new ApiError(500, "Sql error");

    connection.query(`SELECT * FROM 'patients' WHERE 'id'=LAST_INSERT_ID()`, (err, res) => {
      if(err)
        throw new ApiError(500, "Sql error");
      cb(res[0]);
    });
  });
}

export function deletePatient(id, cb) {
  connection.query(`DELETE FROM 'patients' WHERE 'id'=${id}`, (err) => {
    if(err)
      throw new ApiError(500, "Sql error");

    connection.query(`DELETE FROM 'appointments' WHERE 'patient'=${id}`, (err) => {
      if(err)
        throw new ApiError(500, "Sql error");
      cb();
    });
  });
}

export function updatePatient(id, name, surname, cb) {
  connection.query(`UPDATE 'patients' SET 'name'='${name}', 'surname'='${surname}' WHERE 'id'=${id}`, (err) => {
    if(err)
      throw new ApiError(500, "Sql error");
    cb();
  });
}


// ====================================================
//  VISITS
// ====================================================

export function getAppointment(id, cb) {
  connection.query(`SELECT * FROM 'appointments' WHERE 'id'=${id}`, (err, res) => {
    if(err)
      throw new ApiError(500, "Sql error");
    cb(res[0]);
  });
}

export function getAppointments(cb) {
  connection.query(`SELECT * FROM 'appointments'`, (err, res) => {
    if(err)
      throw new ApiError(500, "Sql error");
    cb(res);
  });
}

export function hasAppointments(cb) {
  connection.query(`SELECT count(*) AS 'count' FROM 'appointments'`, (err, res) => {
    if(err)
      throw new ApiError(500, "Sql error");
    cb(res[0].count > 0);
  });
}

export function createAppointment(date, type, patient, cb) {
  connection.query(`INSERT INTO 'appointments' (date, type, patient) VALUES (${date}, ${type}, ${patient})`, (err) => {
    if(err)
      throw new ApiError(500, "Sql error");

    connection.query(`SELECT * FROM 'appointments' WHERE 'id'=LAST_INSERT_ID()`, (err, res) => {
      if(err)
        throw new ApiError(500, "Sql error");
      cb(res[0]);
    });
  });
}

export function deleteAppointment(id, cb) {
  connection.query(`DELETE FROM 'appointments' WHERE 'id'=${id}`, (err) => {
    if(err)
      throw new ApiError(500, "Sql error");
    cb();
  });
}

export function updateAppointment(appointment, cb) {
  connection.query(`UPDATE 'appointments' SET 'date'=${appointment.date}, 'type'=${appointment.type}, 'patient'=${appointment.patient} WHERE 'id'=${appointment.id}`, (err) => {
    if(err)
      throw new ApiError(500, "Sql error");
    cb();
  });
}
