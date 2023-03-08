import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDoModule } from './todo-api/todo-api.module';

const configService = new ConfigService()

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`, 
    {
      useNewUrlParser: true
    }),
    JwtModule.register({
      secret: configService.getOrDefault('JWT_SECRET'),
      signOptions: { expiresIn: configService.get("JWT_EXPIRES_IN")}
    }),
    UsersModule,
    ToDoModule,
    AuthModule,
  ],
  providers: [
    ConfigService
  ],
  exports: [
    ConfigService,
    JwtModule,
    UsersModule,
  ]
})
export class AppModule { }
