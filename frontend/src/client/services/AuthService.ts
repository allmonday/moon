/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BearerResponse } from '../models/BearerResponse';
import type { Body_auth_jwt_login_api_auth_jwt_login_post } from '../models/Body_auth_jwt_login_api_auth_jwt_login_post';
import type { OAuth2AuthorizeResponse } from '../models/OAuth2AuthorizeResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Auth:Jwt.Login
     * @param formData
     * @returns BearerResponse Successful Response
     * @throws ApiError
     */
    public static authJwtLogin(
        formData: Body_auth_jwt_login_api_auth_jwt_login_post,
    ): CancelablePromise<BearerResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/jwt/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Auth:Jwt.Logout
     * @returns any Successful Response
     * @throws ApiError
     */
    public static authJwtLogout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/jwt/logout',
            errors: {
                401: `Missing token or inactive user.`,
            },
        });
    }

    /**
     * Oauth:Github.Jwt.Authorize
     * @param scopes
     * @returns OAuth2AuthorizeResponse Successful Response
     * @throws ApiError
     */
    public static oauthGithubJwtAuthorize(
        scopes?: Array<string>,
    ): CancelablePromise<OAuth2AuthorizeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/github/authorize',
            query: {
                'scopes': scopes,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Oauth:Github.Jwt.Callback
     * The response varies based on the authentication backend used.
     * @param code
     * @param codeVerifier
     * @param state
     * @param error
     * @returns any Successful Response
     * @throws ApiError
     */
    public static oauthGithubJwtCallback(
        code?: string,
        codeVerifier?: string,
        state?: string,
        error?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/github/callback',
            query: {
                'code': code,
                'code_verifier': codeVerifier,
                'state': state,
                'error': error,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }

}
