import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    private readonly logger;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<any>;
}
export {};
