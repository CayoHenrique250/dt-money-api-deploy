import { CreateUserService } from "./create-user.service";
import { DeleteUserService } from "./delete-user.service";
import { FindUserByEmailService } from "./find-user-by-email.service";
import { FindUserByIdService } from "./find-user-by-id.service";
import { GetUsersService } from "./get-users.service";
import { UpdateUserService } from "./update-user.service";

export const usersServices = [
  CreateUserService,
  DeleteUserService,
  FindUserByEmailService,
  FindUserByIdService,
  GetUsersService,
  UpdateUserService,
];
