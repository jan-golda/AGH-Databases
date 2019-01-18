import {Router} from "express";
import ApiError from "../ApiError";

export const router = Router();

/**
 * Middleware responsible for parsing visit id param
 */
router.param("visitId", (req, res, next, visitId) => {
  if(isNaN(parseInt(visitId)))
    throw new ApiError(400, "Wrong format of visit id, int expected");

  req.params["visitId"] = parseInt(visitId);
  next();
});
