import { Test, TestingModule } from "@nestjs/testing";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { FindUserByIdService } from "./find-user-by-id.service";

describe("FindUserByIdService", () => {
  let service: FindUserByIdService;

  const userMockRepository = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdService,
        {
          provide: IUserRepository,
          useValue: userMockRepository,
        },
      ],
    }).compile();

    service = module.get<FindUserByIdService>(FindUserByIdService);
    jest.clearAllMocks();
  });

  it("should return user by id without password", async () => {
    userMockRepository.findById.mockResolvedValue({
      id: "1",
      name: "Maria",
      email: "maria@dtmoney.com",
      password: "hash-password",
    });

    const result = await service.execute("1");

    expect(userMockRepository.findById).toHaveBeenCalledWith("1");
    expect(result).toEqual({
      id: "1",
      name: "Maria",
      email: "maria@dtmoney.com",
    });
  });
});
