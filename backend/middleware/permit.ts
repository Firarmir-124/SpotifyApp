import {NextFunction, Request, Response} from "express";
import {RequestWitUser} from "./auth";

const permit = (...role: string[]) => {
  return (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as RequestWitUser;

    if (!req.user) {
      return res.status(401).send({'message': 'Unauthenticated'});
    }

    if (!role.includes(req.body.reqResponse)) {
      return res.status(403).send({'message': 'Unauthorized'});
    }

    return next();

  };
};

export default permit;