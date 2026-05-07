import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";
import { CreateUserDTO } from "../dto/create-user.dto";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { removePasswordFromUser } from "../utils/user-public-data.util";

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictException("Email already in use");
    }

    const encryptedPassword = await hash(data.password, 10);
    const user = await this.userRepository.create({
      ...data,
      password: encryptedPassword,
    });

    return removePasswordFromUser(user);
  }
}
