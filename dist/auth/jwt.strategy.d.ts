import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        id: any;
        email: any;
        is_admin: any;
        first_name: any;
        last_name: any;
        profile_image: any;
    }>;
}
export {};
