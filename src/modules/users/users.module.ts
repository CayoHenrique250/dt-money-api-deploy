import { Module } from "@nestjs/common";
import { PrismaUserRepository } from "./infra/repositories/prisma/prisma.user.repository";
import { IUserRepository } from "./infra/repositories/user.repository.abstract";
import { usersControllers } from "./controllers";
import { usersServices } from "./services";
import { PrismaService } from "src/shared/prisma.service";

@Module({
  imports: [],
  controllers: [...usersControllers],
  providers: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    ...usersServices,
  ],
})
export class UsersModule {}
