import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { FindUserByEmailService } from "./find-user-by-email.service";

describe("FindUserByEmailService", () => {
  let service: FindUserByEmailService;

  const userMockRepository = {
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByEmailService,
        {
          provide: IUserRepository,
          useValue: userMockRepository,
        },
      ],
    }).compile();

    service = module.get<FindUserByEmailService>(FindUserByEmailService);
    jest.clearAllMocks();
  });

  it("should return user by email without password", async () => {
    userMockRepository.findByEmail.mockResolvedValue({
      id: "1",
      name: "Maria",
      email: "maria@dtmoney.com",
      password: "hash-password",
    });

    const result = await service.execute("maria@dtmoney.com");

    expect(userMockRepository.findByEmail).toHaveBeenCalledWith("maria@dtmoney.com");
    expect(result).toEqual({
      id: "1",
      name: "Maria",
      email: "maria@dtmoney.com",
    });
  });

  it("should throw NotFoundException when user does not exist", async () => {
    userMockRepository.findByEmail.mockResolvedValue(null);

    await expect(service.execute("missing@dtmoney.com")).rejects.toBeInstanceOf(NotFoundException);
  });
});
