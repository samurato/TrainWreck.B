import { Module } from "@nestjs/common";
import { UsersPrivateController } from "./users.private.controller";
import { userProviders } from "./user.providers";
import { DBModule } from "../db/db.module";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
  imports: [DBModule],
  controllers: [UsersController, UsersPrivateController],
  providers: [...userProviders, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
