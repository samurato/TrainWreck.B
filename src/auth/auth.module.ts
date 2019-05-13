import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./middlewares/jwt.strategy";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { AuthPrivateController } from "./auth.private.controller";

@Module({
  imports: [UsersModule],
  controllers: [AuthController, AuthPrivateController],
  providers: [AuthService] //, JwtStrategy],
})
export class AuthModule {}
