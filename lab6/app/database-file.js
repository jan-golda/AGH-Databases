// imports
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

// setup database
export const db = lowdb(new FileSync("data/database.json"));

// defaults
db.defaults({ patients: [], visits: [] }).write();


// ====================================================
//  PATIENTS
// ====================================================

export function getPatient(id) {
  return db.get("patients")
    .find({ id: id })
    .value();
}

export function getPatients() {
  return db.get("patients")
    .value();
}

export function hasPatients() {
  return db.get("patients")
    .size()
    .value() > 0;
}

export function generatePatientId() {
  if(!hasPatients())
    return 1;

  return db.get("patients")
    .last()
    .value() + 1;
}

export function createPatient(name, surname) {
  let patient = { id: generatePatientId(), name, surname };

  db.get("patients")
    .push(patient)
    .write();

  return patient;
}

export function deletePatient(id) {
  db.get("patients")
    .remove({ id: id })
    .write();
}

export function updatePatient(id, name, surname) {
  let patient = { id: id, name: name, surname: surname };

  db.get("patients")
    .find({id: id})
    .assign(patient)
    .write();

  return patient;
}


// ====================================================
//  VISITS
// ====================================================

