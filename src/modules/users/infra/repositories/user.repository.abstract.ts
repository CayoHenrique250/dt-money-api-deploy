import { CreateUserDTO } from "../../dto/create-user.dto";
import { UpdateUserDTO } from "../../dto/update-user.dto";

export abstract class IUserRepository {
  abstract create(data: CreateUserDTO & { password: string });
  abstract findAll();
  abstract findById(id: string);
  abstract findByEmail(email: string);
  abstract update(id: string, data: UpdateUserDTO & { password?: string });
  abstract delete(id: string);
}
