import { Controller, Delete, HttpStatus, Param, Res } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { DeleteUserService } from "../services/delete-user.service";

@ApiTags("users")
@Controller("users")
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete("/:id")
  @ApiOperation({ summary: "Excluir usuário por ID" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "Usuário excluído com sucesso." })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Usuário não encontrado." })
  @ApiParam({
    name: "id",
    description: "ID do usuário a ser excluído",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  async handle(@Param("id") id: string, @Res() res: Response) {
    await this.deleteUserService.execute(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
