import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
  @ApiPropertyOptional({
    description: "ID do usuário",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ description: "Nome do usuário", example: "Maria Silva" })
  @IsString()
  name: string;

  @ApiProperty({
    description: "E-mail único do usuário",
    example: "maria.silva@dtmoney.com",
  })
  @IsEmail({}, { message: "Informe um e-mail válido" })
  email: string;

  @ApiProperty({
    description: "Senha do usuário",
    example: "minhaSenhaSegura123",
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres" })
  password: string;
}
