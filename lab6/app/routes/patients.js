import {Router} from "express";
import ApiError from "../ApiError";

// router
export const router = Router();

/**
 * Middleware responsible for parsing patient id param
 */
router.param("patientId", (req, res, next, patientId) => {
  if(isNaN(parseInt(patientId)))
    throw new ApiError(400, "Wrong format of patient id, int expected");

  req.params["patientId"] = parseInt(patientId);
  next();
});
