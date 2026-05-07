import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { FindUserByIdService } from "../services/find-user-by-id.service";

@ApiTags("users")
@Controller("users")
export class FindUserByIdController {
  constructor(private readonly findUserByIdService: FindUserByIdService) {}

  @Get("/:id")
  @ApiOperation({ summary: "Buscar usuário por ID" })
  @ApiResponse({ status: HttpStatus.OK, description: "Usuário encontrado com sucesso." })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Usuário não encontrado." })
  @ApiParam({
    name: "id",
    description: "ID do usuário a ser buscado",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  async handle(@Param("id") id: string, @Res() res: Response) {
    const user = await this.findUserByIdService.execute(id);
    return res.status(HttpStatus.OK).json(user);
  }
}
