import { LocalAuthGuard } from './local-auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard()).toBeDefined();
  });
});
