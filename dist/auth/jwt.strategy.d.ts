import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    validate(payload: any): Promise<{
        id: any;
        email: any;
        is_admin: any;
        first_name: any;
        last_name: any;
        profile_image: any;
        company_id: any;
    }>;
}
export {};
