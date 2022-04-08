import { RoleType } from '../interfaces/jwt.config';
import { JwtHelper } from '../helpers/jwt.helper';

describe('Generate and validate JWT token', () => {
  let token: string;
  const publicKey = 'test_public_key';
  const jwtData = {
    publicAddress: 'publicAddress',
    roleType: RoleType.ADMIN,
  };
  it('should generate token', async () => {
    const jwtHelper = new JwtHelper({ publicKey });
    token = await jwtHelper.generateToken(jwtData);
    console.info(token);
    // Valid JWT Tokens always have 2 '.' characters.
    expect(token.split('.')).toHaveLength(3);
  });

  it('should validate token', async () => {
    const jwtHelper = new JwtHelper({ publicKey });
    const decoded = await jwtHelper.verifyToken(token);
    expect(decoded.publicAddress).toEqual(jwtData.publicAddress);
  });

  it('should throw invalid jwt malformed error', async () => {
    const jwtHelper = new JwtHelper({ publicKey });
    try {
      await jwtHelper.verifyToken('token_token');
    } catch (e: any) {
      expect(e.code).toEqual(403);
    }
  });
});
