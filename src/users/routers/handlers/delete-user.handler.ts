import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { userService } from "../../application/users.service";
import { errorsHandler } from "../../../core/errors/errors.handler";



export async function deleteUserHandler(
  req: Request<{id: string}>, 
  res: Response,
) {
   try {
    const id = req.params.id;

    await userService.delete(id);
    res.sendStatus(HttpStatus.NO_CONTENT_204);

       } catch (e: unknown) {
        errorsHandler(e, res)
       }

}