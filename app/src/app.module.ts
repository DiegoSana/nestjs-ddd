import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicle/vehicles.module';
import { RolesGuard } from './auth/roles.guard';
import { AuthModule } from './auth/auth.module';
import { RoutesModule } from './route/routes.module';
import { TravelsModule } from './travel/travels.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    VehiclesModule,
    RoutesModule,
    TravelsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RolesGuard,
    JwtAuthGuard
  ],
})
export class AppModule {}
