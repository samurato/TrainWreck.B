import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JWTAuthMiddleware } from './auth/middlewares/jwt.auth.middleware';
import { AuthPrivateController } from './auth/auth.private.controller';
import { LoggerMiddleware } from './utils/middlewares/logger.middleware';

@Module({
  imports: [AuthModule, UsersModule],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JWTAuthMiddleware)
      .forRoutes(AuthPrivateController);
    consumer
      .apply(LoggerMiddleware)
      .with('ApplicationModule')
      .forRoutes('*');
  }
}
