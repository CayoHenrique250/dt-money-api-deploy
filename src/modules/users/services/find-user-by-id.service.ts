import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { removePasswordFromUser } from "../utils/user-public-data.util";

@Injectable()
export class FindUserByIdService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);
    return removePasswordFromUser(user);
  }
}
