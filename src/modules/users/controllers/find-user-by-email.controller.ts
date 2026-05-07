import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { FindUserByEmailService } from "../services/find-user-by-email.service";

@ApiTags("users")
@Controller("users")
export class FindUserByEmailController {
  constructor(private readonly findUserByEmailService: FindUserByEmailService) {}

  @Get("/email/:email")
  @ApiOperation({ summary: "Buscar usuário por e-mail" })
  @ApiResponse({ status: HttpStatus.OK, description: "Usuário encontrado com sucesso." })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Usuário não encontrado." })
  @ApiParam({
    name: "email",
    description: "E-mail do usuário a ser buscado",
    example: "maria.silva@dtmoney.com",
  })
  async handle(@Param("email") email: string, @Res() res: Response) {
    const user = await this.findUserByEmailService.execute(email);
    return res.status(HttpStatus.OK).json(user);
  }
}
