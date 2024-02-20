import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationModule } from './invitation/invitation.module';
import { GuestModule } from './guest/guest.module';
import { DishModule } from './dish/dish.module';
import { DishTypeModule } from './dish-type/dish-type.module';
import { Invitation } from './invitation/invitation.model';
import { Dish } from './dish/dish.model';
import { DishType } from './dish-type/dish-type.model';
import { Guest } from './guest/guest.model';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthAdminModule } from './auth-admin/auth-admin.module';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/admin.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username:  process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Invitation, Dish, DishType, Guest, Admin],
      synchronize: true, //Mettre false en prod
    }),
    AuthModule,
    AuthAdminModule,
    AdminModule,
    InvitationModule,
    GuestModule,
    DishModule,
    DishTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
