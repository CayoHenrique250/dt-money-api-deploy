import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma.service";
import { CreateUserDTO } from "../../../dto/create-user.dto";
import { UpdateUserDTO } from "../../../dto/update-user.dto";
import { IUserRepository } from "../user.repository.abstract";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO & { password: string }) {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async update(id: string, data: UpdateUserDTO & { password?: string }) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return updatedUser;
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
