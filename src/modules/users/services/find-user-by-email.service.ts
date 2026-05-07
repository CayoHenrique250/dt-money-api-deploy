import { Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { removePasswordFromUser } from "../utils/user-public-data.util";

@Injectable()
export class FindUserByEmailService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return removePasswordFromUser(user);
  }
}
