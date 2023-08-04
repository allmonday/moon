import { OpenAPI } from 'src/client';
import * as jose from 'jose';
import { verifyExp } from './jwt';

export const TOKEN_NAME = 'MOON_OAUTH_TOKEN';
/*
login:    no token
refresh:  invalid token
verified: valid
*/
type VerifyResult = 'verified' | 'login' | 'refresh';

export function verifyToken(): VerifyResult {
    const token = localStorage.getItem(TOKEN_NAME);
    if (token) {
        console.log('token found in LocalStorage');
        const claims = jose.decodeJwt(token);

        if (claims.exp && verifyExp(claims.exp)) {
            console.log('claim exp verified: OK');
            console.log('set OPENAPI.TOKEN');
            OpenAPI.TOKEN = token;

            console.log('read user info');
            return 'verified';
        } else {
            return 'refresh';
        }
    }
    return 'login';
}
