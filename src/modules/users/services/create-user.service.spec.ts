import { ConflictException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { compare } from "bcryptjs";
import { CreateUserDTO } from "../dto/create-user.dto";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { CreateUserService } from "./create-user.service";

describe("CreateUserService", () => {
  let service: CreateUserService;

  const userMockRepository = {
    create: jest.fn(),
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: IUserRepository,
          useValue: userMockRepository,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    jest.clearAllMocks();
  });

  it("should create a user with encrypted password", async () => {
    const createUserDTO: CreateUserDTO = {
      name: "Maria",
      email: "maria@dtmoney.com",
      password: "123456",
    };

    const createdUser = {
      id: "user-id",
      name: createUserDTO.name,
      email: createUserDTO.email,
      password: "hashed-password",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userMockRepository.findByEmail.mockResolvedValue(null);
    userMockRepository.create.mockResolvedValue(createdUser);

    const result = await service.execute(createUserDTO);

    expect(userMockRepository.findByEmail).toHaveBeenCalledWith(createUserDTO.email);
    expect(userMockRepository.create).toHaveBeenCalledTimes(1);

    const payloadToCreate = userMockRepository.create.mock.calls[0][0];
    expect(payloadToCreate.password).not.toEqual(createUserDTO.password);
    expect(await compare(createUserDTO.password, payloadToCreate.password)).toBe(true);

    expect(result).toEqual({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    });
  });

  it("should throw ConflictException when email already exists", async () => {
    userMockRepository.findByEmail.mockResolvedValue({
      id: "existing-user-id",
      email: "maria@dtmoney.com",
    });

    await expect(
      service.execute({
        name: "Maria",
        email: "maria@dtmoney.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
