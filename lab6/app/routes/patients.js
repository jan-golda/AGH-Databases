import {Router} from "express";
import ApiError from "../ApiError";
import * as db from "../database-file";

export const router = Router();

/**
 * Middleware responsible for parsing patient id param
 */
router.param("patientId", (req, res, next, patientId) => {
  const id = parseInt(patientId);

  if(isNaN(id))
    throw new ApiError(400, "Wrong format of patient id, int expected");

  const patient = db.getPatient(id);

  if(patient === undefined)
    throw new ApiError(404, `There is no patient with id: ${id}`);

  req.patient = patient;
  next();
});


/**
 * Route: get patients
 */
router.get("/", (req, res) => {
  res.status(200).json(db.getPatients());
});


/**
 * Route: create patient
 */
router.post("/", (req, res) => {
  if(req.query['name'] === undefined)
    throw new ApiError(400, "Missing query 'name'");

  if(req.query['surname'] === undefined)
    throw new ApiError(400, "Missing query 'surname'");

  let patient = db.createPatient(req.query.name, req.query.surname);
  res.status(201).json(patient);
});


/**
 * Route: get patient
 */
router.get("/:patientId", (req, res) => {
  res.status(200).json(req.patient);
});


/**
 * Route: update patient
 */
router.put("/:patientId", (req, res) => {
  let patient = db.updatePatient(
    req.patient.id,
    req.query.name || req.patient.name,
    req.query.surname || req.patient.surname
  );
  res.status(200).json(patient);
});


/**
 * Route: delete patient
 */
router.delete("/:patientId", (req, res) => {
  db.deletePatient(req.patient.id);
  res.status(204).end();
});
