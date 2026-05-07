import { ConflictException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { compare } from "bcryptjs";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { UpdateUserService } from "./update-user.service";

describe("UpdateUserService", () => {
  let service: UpdateUserService;

  const userMockRepository = {
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: IUserRepository,
          useValue: userMockRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
    jest.clearAllMocks();
  });

  it("should update user and encrypt password when provided", async () => {
    userMockRepository.findById.mockResolvedValue({
      id: "1",
      name: "Maria",
      email: "maria@dtmoney.com",
      password: "old-hash",
    });
    userMockRepository.findByEmail.mockResolvedValue(null);
    userMockRepository.update.mockResolvedValue({
      id: "1",
      name: "Maria Souza",
      email: "maria.souza@dtmoney.com",
      password: "new-hash",
    });

    const result = await service.execute("1", {
      name: "Maria Souza",
      email: "maria.souza@dtmoney.com",
      password: "new-password",
    });

    const payloadToUpdate = userMockRepository.update.mock.calls[0][1];
    expect(await compare("new-password", payloadToUpdate.password)).toBe(true);
    expect(result).toEqual({
      id: "1",
      name: "Maria Souza",
      email: "maria.souza@dtmoney.com",
    });
  });

  it("should throw ConflictException when new email already exists", async () => {
    userMockRepository.findById.mockResolvedValue({
      id: "1",
      email: "maria@dtmoney.com",
    });
    userMockRepository.findByEmail.mockResolvedValue({
      id: "2",
      email: "joao@dtmoney.com",
    });

    await expect(
      service.execute("1", {
        email: "joao@dtmoney.com",
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
