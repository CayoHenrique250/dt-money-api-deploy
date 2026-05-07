import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { removePasswordFromUser } from "../utils/user-public-data.util";

@Injectable()
export class GetUsersService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute() {
    const users = await this.userRepository.findAll();
    return users.map((user) => removePasswordFromUser(user));
  }
}
