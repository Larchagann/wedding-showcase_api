import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./admin.model";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
imports: [TypeOrmModule.forFeature([Admin])],
controllers:[AdminController],
providers: [AdminService],
exports:[AdminService]
})
export class AdminModule {}