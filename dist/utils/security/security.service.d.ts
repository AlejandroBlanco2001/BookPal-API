export declare class SecurityService {
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, hash: string): Promise<boolean>;
    generateRandomDynamicCode(): string;
}
