import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { GetUsersService } from "../services/get-users.service";

@ApiTags("users")
@Controller("users")
export class GetUsersController {
  constructor(private readonly getUsersService: GetUsersService) {}

  @Get("")
  @ApiOperation({ summary: "Listar todos os usuários" })
  @ApiResponse({ status: HttpStatus.OK, description: "Lista de usuários retornada com sucesso." })
  async handle(@Res() res: Response) {
    const users = await this.getUsersService.execute();
    return res.status(HttpStatus.OK).json(users);
  }
}
