import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { mapToUserViewModel } from "../mappers/map-to-user-view-model";
import { userService } from "../../application/users.service";
import { errorsHandler } from "../../../core/errors/errors.handler";
import { UserInputModel } from "../../dto/create-user.dto";
import { UserViewModel } from "../../dto/user.view.interface";
import { UserRepository } from "../../repositories/user.repository";


export async function createUserHandler(
  req: Request<{}, {}, UserInputModel>, 
  res: Response<UserViewModel>,
) {
  try {

    const { login, password, email } = req.body;
    
    const createdUserId = await userService.create(req.body);
    
    const createdUser = await UserRepository.findById(createdUserId)

    if (!createdUser) {
    throw new Error('User created but not found'); 
}

    const userOutput = mapToUserViewModel(createdUser);

    return res.status(HttpStatus.CREATED_201).json(userOutput);
    
  } catch (e: unknown) {
    errorsHandler(e, res);
    };
  };