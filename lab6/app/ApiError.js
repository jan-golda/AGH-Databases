/**
 * Api error class intended to report errors that should be returned in response
 */
export default class ApiError {

  constructor(status, message){
    this.status = status;
    this.message = message;
  }

}

/**
 * Express middleware for handling errors
 */
export function apiErrorHandler(err, req, res, next) {
  if(err instanceof ApiError)
    return res.status(err.status | 500).json({ error: err.message });

  console.log(err);
  res.status(500).json({ error: "Internal server error" });
}
