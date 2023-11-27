import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

@Controller('auth')
export class AuthController {
  private email: string;

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(
    @Body()
    registerRequest: {
      name: string;
      password: string;
      email: string;
    },
  ) {
    try {
      return await this.authService.registerUser(registerRequest);
    } catch (error) {
      const { code, message } = error;
      return { code, message };
    }
  }

  @Post('confirmUser')
  async confirmUser(@Body() body: { username: string; verificationCode: string }) {
    try {
      await this.authService.confirmUser(body.username, body.verificationCode);
      return { success: true, message: 'User confirmed successfully' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Post('login')
  async login(@Body() authenticateRequest: { name: string; password: string }) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/forgotPassword')
  async forgotPassword(@Body('email') email: string) {
    try {
      this.email = email;
      return await this.authService.forgotPassword(email);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/confirmPassword')
  async confirmPassword(
    @Body('verificationCode') verificationCode: string,
    @Body('newPassword') newPassword: string,
    @Body('newPasswordConfirmed') newPasswordConfirmed: string,
  ) {
    try {
      if (newPasswordConfirmed == newPassword)
        return await this.authService.confirmPassword(
          this.email,
          verificationCode,
          newPassword,
        );
      throw new BadRequestException({
        message: 'La contraseña de verificación no coincide.',
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/authorization')
  async authorization() {
    try {
      return await this.authService.authorization();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/logout')
  async logout(): Promise<void> {
    try {
      return this.authService.logout();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}