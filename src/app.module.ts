import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MyConfig } from './common/interfaces/my-config.interface';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<MyConfig>) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService: ConfigService<MyConfig>) => ({
    //     type: 'mysql',
    //     host: configService.get('DATABASE_HOST'),
    //     port: +configService.get('DATABASE_PORT'),
    //     username: configService.get('DATABASE_USER'),
    //     password: configService.get('DATABASE_PASSWORD'),
    //     database: configService.get('DATABASE_NAME'),
    //     entities: [],
    //     synchronize: true,
    //   }),
    // }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
