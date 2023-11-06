import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserNotFoundException } from '../exceptions/userNotFound.exception';
import { user as UserFactory } from '../utils/factory';
import { SecurityService } from '../utils/security/security.service';
import { UpdateUserDTO } from './dto/update-user-dto';
import { CreateUserDTO } from './dto/create-user-dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sinon = require('sinon');

describe('UserController', () => {
  let controller: UserController;
  let clock: any;

  beforeAll(() => {
    clock = sinon.useFakeTimers({
      now: new Date('2020-01-01T00:00:00.000Z'),
      shouldAdvanceTime: false,
      toFake: ['Date'],
    });
    clock.tick(0);
  });

  afterEach(() => {
    clock.restore();
  });

  const UserServiceMock = {
    user: jest.fn(),
    updateUser: jest.fn(),
    createUser: jest.fn(),
    softDeleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        SecurityService,
        {
          provide: UserService,
          useValue: UserServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateUser', () => {
    it('should update a user for an id', async () => {
      const updateUser = UserFactory().custom({
        first_name: 'Isaac',
      });
      UserServiceMock.updateUser.mockResolvedValue(updateUser);
      expect(
        await controller.updateUserByID(updateUser as UpdateUserDTO, 1),
      ).toEqual(updateUser);
    });

    it('should update a user for an email', async () => {
      const updateUser = UserFactory().custom({
        first_name: 'Isaac',
      });
      UserServiceMock.updateUser.mockResolvedValue(updateUser);
      expect(
        await controller.updateUserByEmail(updateUser, 'test@gmail.com'),
      ).toEqual(updateUser);
    });

    it('should throw an exception if the user is not found', async () => {
      const updateUser = UserFactory().custom({
        first_name: 'Isaac',
      });
      try {
        UserServiceMock.updateUser.mockResolvedValue(null);
        controller.updateUserByID(updateUser as UpdateUserDTO, -1);
      } catch (error) {
        expect(error).toBeInstanceOf(UserNotFoundException);
      }

      try {
        UserServiceMock.updateUser.mockResolvedValue(null);
        controller.updateUserByEmail(updateUser, 'not@gmail.com');
      } catch (error) {
        expect(error).toBeInstanceOf(UserNotFoundException);
      }
    });
  });

  describe('getUserBy', () => {
    it('should return a user for an id', async () => {
      const userID = 1;
      UserServiceMock.user.mockResolvedValue({ id: 1 });
      expect(await controller.getUserByID(userID)).toEqual({ id: userID });
    });

    it('should return a user for an email', async () => {
      const userEmail = 'test@gmail.com';
      UserServiceMock.user.mockResolvedValue({ email: userEmail });
      expect(await controller.getUserByEmail(userEmail)).toEqual({
        email: userEmail,
      });
    });

    it('should throw an exception if the user is not found', async () => {
      const userID = 1;
      try {
        UserServiceMock.user.mockResolvedValue({ id: 2 });
        controller.getUserByID(userID);
      } catch (error) {
        expect(error).toBeInstanceOf(UserNotFoundException);
      }

      const userEmail = 'test@gmail.com';
      try {
        UserServiceMock.user.mockResolvedValue({ email: 'dont@gmail.com' });
        controller.getUserByEmail(userEmail);
      } catch (error) {
        expect(error).toBeInstanceOf(UserNotFoundException);
      }
    });
  });

  describe('should create an user with / POST', () => {
    it('should create an user when the correct DTO', async () => {
      const userData = UserFactory().custom({
        first_name: 'Isaac',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { deleted_at, is_deleted, ...userDTO } = userData;
      UserServiceMock.createUser.mockResolvedValue(userData);
      expect(await controller.createUser(userDTO as CreateUserDTO)).toEqual(
        userData,
      );
    });
  });

  describe('should delete the user with', () => {
    describe('soft-delete', () => {
      it('should soft-delete an user for an id', async () => {
        const userID = 1;
        const user = UserFactory().custom({
          first_name: 'Isaac',
        });
        UserServiceMock.softDeleteUser.mockResolvedValue({
          ...user,
          deleted_at: clock.now,
          is_deleted: true,
        });
        expect(await controller.softDeleteUserByID(userID)).toEqual({
          ...user,
          deleted_at: clock.now,
          is_deleted: true,
        });
      });
    });
  });
});
