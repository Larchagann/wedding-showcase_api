import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationModule } from './invitation/invitation.module';
import { InvitationController } from './invitation/invitation.controller';
import { GuestService } from './guest/guest.service';
import { GuestModule } from './guest/guest.module';
import { DishController } from './dish/dish.controller';
import { DishModule } from './dish/dish.module';
import { DishTypeModule } from './dish-type/dish-type.module';
import { Invitation } from './invitation/invitation.model';
import { Dish } from './dish/dish.model';
import { DishType } from './dish-type/dish-type.model';
import { Guest } from './guest/guest.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'weddingshowcase',
      entities: [Invitation, Dish, DishType, Guest],
      synchronize: true, //Mettre false en prod
    }),
    AuthModule,
    InvitationModule,
    GuestModule,
    DishModule,
    DishTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
