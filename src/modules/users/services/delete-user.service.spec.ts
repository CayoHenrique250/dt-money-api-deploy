import { Test, TestingModule } from "@nestjs/testing";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { DeleteUserService } from "./delete-user.service";

describe("DeleteUserService", () => {
  let service: DeleteUserService;

  const userMockRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        {
          provide: IUserRepository,
          useValue: userMockRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
    jest.clearAllMocks();
  });

  it("should delete an existing user", async () => {
    userMockRepository.findById.mockResolvedValue({
      id: "1",
      name: "Maria",
      email: "maria@dtmoney.com",
    });
    userMockRepository.delete.mockResolvedValue(undefined);

    await service.execute("1");

    expect(userMockRepository.findById).toHaveBeenCalledWith("1");
    expect(userMockRepository.delete).toHaveBeenCalledWith("1");
  });
});
