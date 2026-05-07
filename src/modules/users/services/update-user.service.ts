import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { removePasswordFromUser } from "../utils/user-public-data.util";

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, data: UpdateUserDTO) {
    const user = await this.userRepository.findById(id);

    if (data.email && data.email !== user.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(data.email);
      if (userWithSameEmail) {
        throw new ConflictException("Email already in use");
      }
    }

    const encryptedPassword = data.password ? await hash(data.password, 10) : undefined;

    const updatedUser = await this.userRepository.update(id, {
      ...data,
      ...(encryptedPassword ? { password: encryptedPassword } : {}),
    });

    return removePasswordFromUser(updatedUser);
  }
}
