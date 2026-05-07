import { Test, TestingModule } from "@nestjs/testing";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { GetUsersService } from "./get-users.service";

describe("GetUsersService", () => {
  let service: GetUsersService;

  const userMockRepository = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUsersService,
        {
          provide: IUserRepository,
          useValue: userMockRepository,
        },
      ],
    }).compile();

    service = module.get<GetUsersService>(GetUsersService);
    jest.clearAllMocks();
  });

  it("should return users without password", async () => {
    userMockRepository.findAll.mockResolvedValue([
      {
        id: "1",
        name: "Maria",
        email: "maria@dtmoney.com",
        password: "hash-1",
      },
      {
        id: "2",
        name: "Joao",
        email: "joao@dtmoney.com",
        password: "hash-2",
      },
    ]);

    const result = await service.execute();

    expect(userMockRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([
      { id: "1", name: "Maria", email: "maria@dtmoney.com" },
      { id: "2", name: "Joao", email: "joao@dtmoney.com" },
    ]);
  });
});
