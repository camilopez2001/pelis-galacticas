import { AuthConfig } from './auth.config';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoRefreshToken,
} from 'amazon-cognito-identity-js';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    private userPool: CognitoUserPool;
    private cognitoUser: CognitoUser;

    private refreshtoken: string;
    private accesstoken: string;
    private userdata;

    constructor(
        private readonly userService: UserService,
        private readonly authConfig: AuthConfig,
    ) {
        this.userPool = new CognitoUserPool({
            UserPoolId: this.authConfig.userPoolId,
            ClientId: this.authConfig.clientId,
        });
    }

    registerUser(registerRequest: {
        name: string;
        email: string;
        password: string;
    }) {
        const { name, email, password } = registerRequest;
        const groupName = 'REGULAR';
        return new Promise((resolve, reject) => {
            return this.userPool.signUp(
                name,
                password,
                [
                    new CognitoUserAttribute({ Name: 'email', Value: email }),
                    new CognitoUserAttribute({ Name: 'custom:group', Value: groupName }),
                ],
                null,
                async (error, result) => {
                    if (!result) {
                        reject(error);
                    } else {
                        const params = {
                            UserPoolId: this.authConfig.userPoolId,
                            GroupName: groupName,
                            Username: name,
                        };
                        const cognitoIdentityServiceProvider =
                            new CognitoIdentityServiceProvider({
                                region: process.env.AWS_REGION,
                                accessKeyId: process.env.AWS_ACCESS_KEY_ID_COGNITO,
                                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_COGNITO,
                            });
                        cognitoIdentityServiceProvider.adminAddUserToGroup(
                            params,
                            (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
                            },
                        );
                    }
                },
            );
        });
    }

    confirmUser(username: string, verificationCode: string) {
        const params = {
            ClientId: this.authConfig.clientId,
            ConfirmationCode: verificationCode,
            Username: username,
        };

        const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

        return new Promise((resolve, reject) => {
            cognitoIdentityServiceProvider.confirmSignUp(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    async authenticateUser(user: { name: string; password: string }) {
        const { name, password } = user;
        const authenticationDetails = new AuthenticationDetails({
            Username: name,
            Password: password,
        });
        const userData = {
            Username: name,
            Pool: this.userPool,
        };
        this.cognitoUser = new CognitoUser(userData);
        return new Promise((resolve, reject) => {
            return this.cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    this.insertRefreshTokenPostgres(
                        result['idToken']['payload']['cognito:username'],
                        result['refreshToken']['token'],
                        result['idToken']['jwtToken'],
                    );
                    this.userdata = result;
                    resolve(result);
                },
                onFailure: (err) => {
                    reject(err);
                },
                newPasswordRequired: (userAttributes, requiredAttributes) => {
                    resolve({ userAttributes, requiredAttributes });
                },
            });
        });
    }

    async refreshAccessToken() {
        const idToken = new CognitoRefreshToken({
            RefreshToken: this.refreshtoken,
        });
        return new Promise((resolve, reject) => {
            this.cognitoUser.refreshSession(idToken, (err, session) => {
                if (err) {
                    reject(err);
                } else {
                    this.insertRefreshTokenPostgres(
                        session['accessToken']['payload']['username'],
                        session['refreshToken']['token'],
                        session['idToken']['jwtToken'],
                    );
                    resolve(session);
                }
            });
        });
    }

    async insertRefreshTokenPostgres(
        username: string,
        refreshToken: string,
        accessToken: string,
    ) {
        this.refreshtoken = refreshToken;
        this.accesstoken = accessToken;
        try {
            const user = await this.userService.getUserByUsername(username);
            if (!user) {
                throw new NotFoundException(`User with username ${username} not found`);
            }
            const user_id = user.id;

            this.userService.update(user_id, this.refreshtoken, this.accesstoken).then(() => {
                return {
                    success: true,
                    message: `Refresh token updated for user ${username}`,
                };
            })

        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    authorization() {
        const groups = this.userdata['idToken']['payload']['cognito:groups'];

        if (groups != null || groups.length > 0) {
            return { success: true, groups: groups };
        } else {
            const idToken = new CognitoRefreshToken({
                RefreshToken: this.refreshtoken,
            });
            return new Promise((resolve, reject) => {
                this.cognitoUser.refreshSession(idToken, (err, session) => {
                    if (err) {
                        reject(err);
                    } else {
                        return {
                            success: true,
                            groups: session['idToken']['payload']['cognito:groups'],
                        };
                    }
                });
            });
        }
    }

    forgotPassword(username: string) {
        const userData = {
            Username: username,
            Pool: this.userPool,
        };

        this.cognitoUser = new CognitoUser(userData);
        if (!this.cognitoUser) {
            throw new Error('User not found');
        }

        return new Promise((resolve, reject) => {
            this.cognitoUser.forgotPassword({
                onSuccess: (result) => {
                    resolve(result);
                },
                onFailure: (err) => {
                    reject(err);
                },
            });
        });
    }

    confirmPassword(
        username: string,
        verificationCode: string,
        newPassword: string,
    ) {
        const userData = {
            Username: username,
            Pool: this.userPool,
        };

        const cognitoUser = new CognitoUser(userData);
        if (!cognitoUser) {
            throw new Error('User not found');
        }

        return new Promise((resolve, reject) => {
            cognitoUser.confirmPassword(verificationCode, newPassword, {
                onSuccess: (result) => {
                    resolve(result);
                },
                onFailure: (err) => {
                    if (err.name == 'InvalidLambdaResponseException') {
                        resolve({ success: true });
                    } else {
                        reject(err);
                    }
                },
            });
        });
    }
    logout(): void {
        new Promise(() => {
            const cognitoUser = this.userPool.getCurrentUser();
            if (cognitoUser !== null) {
                this.userService.getUserByUsername(cognitoUser['username']).then(user => {
                    const user_id = user.id;
                    this.userService.update(user_id, '', '').then(() => {
                        cognitoUser.signOut();
                    })
                }, () => {
                    throw new NotFoundException(`User with username ${cognitoUser['username']} not found`);
                }
                );
            }
        });
    }
}