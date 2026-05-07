import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";

@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string) {
    await this.userRepository.findById(id);
    await this.userRepository.delete(id);
  }
}
