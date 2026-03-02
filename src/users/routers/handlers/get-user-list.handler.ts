import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { mapToUserViewModel } from "../mappers/map-to-user-view-model";
import { mapToUserViewModels } from "../mappers/map-to-user-view-model";
import { userService } from "../../application/users.service";
import { errorsHandler } from "../../../core/errors/errors.handler";
import { UserInputModel } from "../../dto/create-user.dto";
import { UserViewModel } from "../../dto/user.view.interface";
import { UserRepository } from "../../repositories/user.repository";
import { UserSortField } from "../../dto/users.queryFields.type";
import { UserQueryInput } from "../../dto/user.query.input";


export async function getUsersHandler(
  req: Request<{}, {}, {}, UserQueryInput>,
  res: Response,
) {
  try {
    const { items, totalCount } = await UserRepository.findMany(req.query);

    const itemsWithId = mapToUserViewModels(items);
    
    res.json({
      pagesCount: Math.ceil(totalCount / (req.query.pageSize || 10)),
      page: req.query.pageNumber || 1,
      pageSize: req.query.pageSize || 10,
      totalCount,
      items: itemsWithId
    });
    
  } catch (error) {
    errorsHandler(error, res);
  }
}
