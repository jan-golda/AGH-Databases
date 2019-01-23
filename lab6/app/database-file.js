// imports
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

// setup database
export const db = lowdb(new FileSync("data/database.json"));

// defaults
db.defaults({ patients: [], appointments: [] }).write();


// ====================================================
//  PATIENTS
// ====================================================

export function getPatient(id, cb) {
  cb(
    db.get("patients")
      .find({ id: id })
      .value()
  );
}

export function getPatients(cb) {
  cb(
    db.get("patients")
      .value()
  );
}

export function hasPatients(cb) {
  cb(
    db.get("patients")
      .size()
      .value() > 0
  );
}

export function generatePatientId(cb) {
  hasPatients((hasPatients) => {
    if(!hasPatients)
      return cb(1);

    cb(
      db.get("patients")
        .last()
        .value().id + 1
    );
  });
}

export function createPatient(name, surname, cb) {
  generatePatientId((id) => {
    let patient = { id: id, name, surname };

    db.get("patients")
      .push(patient)
      .write();

    cb(patient);
  });

}

export function deletePatient(id, cb) {
  db.get("patients")
    .remove({ id: id })
    .write();

  db.get("appointments")
    .remove({ patient: id})
    .write();

  cb();
}

export function updatePatient(id, name, surname, cb) {
  let patient = { id, name, surname };

  db.get("patients")
    .find({id: id})
    .assign(patient)
    .write();

  cb(patient);
}


// ====================================================
//  VISITS
// ====================================================

export function getAppointment(id, cb) {
  cb(
    db.get("appointments")
      .find({ id: id })
      .value()
  );
}

export function getAppointments(cb) {
  cb(
    db.get("appointments")
      .value()
  );
}

export function hasAppointments(cb) {
  cb(
    db.get("appointments")
      .size()
      .value() > 0
  );
}

export function generateAppointmentId(cb) {
  hasAppointments((hasAppointments) => {
    if(!hasAppointments)
      return cb(1);

    cb(
      db.get("appointments")
        .last()
        .value().id + 1
    );
  });
}

export function createAppointment(date, type, patient, cb) {
  generateAppointmentId((id) => {
    let appointment = { id, date, type, patient };

    db.get("appointments")
      .push(appointment)
      .write();

    cb(appointment);
  });

}

export function deleteAppointment(id, cb) {
  db.get("appointments")
    .remove({ id: id })
    .write();

  cb();
}

export function updateAppointment(appointment, cb) {
  db.get("appointments")
    .find({id: appointment.id})
    .assign(appointment)
    .write();

  cb(appointment);
}
