import {Router} from "express";
import ApiError from "../ApiError";
import * as db from "../database-file";

export const router = Router();

/**
 * Middleware responsible for parsing appointment id param
 */
router.param("appointmentId", (req, res, next, appointmentId) => {
  const id = parseInt(appointmentId);

  if(isNaN(id))
    throw new ApiError(400, "Wrong format of appointment id, int expected");

  const appointment = db.getAppointment(id);

  if(appointment === undefined)
    throw new ApiError(404, `There is no appointment with id: ${id}`);

  req.appointment = appointment;
  next();
});


/**
 * Route: get appointments
 */
router.get("/", (req, res) => {
  res.status(200).json(db.getAppointments());
});


/**
 * Route: create appointment
 */
router.post("/", (req, res) => {
  if(req.query['date'] === undefined)
    throw new ApiError(400, "Missing query 'date'");
  if(req.query['type'] === undefined)
    throw new ApiError(400, "Missing query 'type'");
  if(req.query['patient'] === undefined)
    throw new ApiError(400, "Missing query 'patient'");

  const date = parseInt(req.query['date']);
  const type = parseInt(req.query['type']);
  const patient = db.getPatient(parseInt(req.query['patient']));

  if(isNaN(date))
    throw new ApiError(400, "Wrong date format, expected epoch");
  if(![1,2,3].includes(type))
    throw new ApiError(400, "Wrong type, expected 1, 2 or 3");
  if(patient === undefined)
    throw new ApiError(400, `There is no patient with id: ${req.query['patient']}`);

  let appointment = db.createAppointment(date, type, patient.id);
  res.status(201).json(appointment);
});


/**
 * Route: get appointment
 */
router.get("/:appointmentId", (req, res) => {
  res.status(200).json(req.appointment);
});


/**
 * Route: update appointment
 */
router.put("/:appointmentId", (req, res) => {
  let appointment = req.appointment;

  if(req.query['date'] !== undefined){
    appointment.date = parseInt(req.query['date']);

    if(isNaN(appointment.date))
      throw new ApiError(400, "Wrong date format, expected epoch");
  }

  if(req.query['type'] !== undefined){
    appointment.type = parseInt(req.query['type']);

    if(![1,2,3].includes(appointment.type))
      throw new ApiError(400, "Wrong type, expected 1, 2 or 3");
  }

  if(req.query['patient'] !== undefined){
    appointment.patient = parseInt(req.query['patient']);

    if(db.getPatient(appointment.patient) === undefined)
      throw new ApiError(400, `There is no patient with id: ${req.query['patient']}`);
  }

  db.updateAppointment(appointment);
  res.status(200).json(appointment);
});


/**
 * Route: delete appointment
 */
router.delete("/:appointmentId", (req, res) => {
  db.deleteAppointment(req.appointment.id);
  res.status(204).end();
});
