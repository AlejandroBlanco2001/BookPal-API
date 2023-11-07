import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { SecurityService } from '../utils/security/security.service';
import { JwtService } from '@nestjs/jwt';
import { user as UserFactory } from '../utils/factory';

describe('AuthService', () => {
  let service: AuthService;
  const mockUser = UserFactory().basic();
  const mockUserService = {
    user: jest.fn().mockResolvedValue(mockUser),
  };
  const mockJwtService = {
    sign: jest.fn().mockResolvedValue('token'),
  };
  const mockSecurityService = {
    verifyPassword: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: SecurityService,
          useValue: mockSecurityService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    describe('should return null  ', () => {
      it('when user is null', async () => {
        mockUserService.user.mockResolvedValueOnce(null);
        const result = await service.validateUser('test@gmail.com', 'password');
        expect(result).toBeNull();
      });
      it('when isPasswordValid is false', async () => {
        mockUserService.user.mockResolvedValueOnce(mockUser);
        mockSecurityService.verifyPassword.mockResolvedValueOnce(false);
        const result = await service.validateUser('test@gmail.com', 'password');
        expect(result).toBeNull();
      });
    });
    it('should return user', async () => {
      const result = await service.validateUser('test@gmail.com', 'password');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = mockUser;
      expect(result).toEqual(user);
    });
  });
});
