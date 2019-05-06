import { Module } from "@nestjs/common";
import { UsersPrivateController } from "./users.private.controller";
import { userProviders } from "./user.providers";
import { DBModule } from "src/db/db.module";
import { UsersService } from "./users.service";

@Module({
  imports: [DBModule],
  controllers: [UsersPrivateController],
  providers: [...userProviders, UsersService],
})
export class UsersModule {}
