import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config/config.validation';
import { dbVariableKeys } from './config/variables/db.variable';
import { redisVariableKeys } from './config/variables/redis.variable';
import { MembersModule } from './members/members.module';
import { AuthModule } from './auth/auth.module';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env.prod', '.env'],
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>(dbVariableKeys.dbType) as 'postgres',
        host: configService.get<string>(dbVariableKeys.dbHost),
        port: configService.get<number>(dbVariableKeys.dbPort),
        username: configService.get<string>(dbVariableKeys.dbUsername),
        password: configService.get<string>(dbVariableKeys.dbPassword),
        database: configService.get<string>(dbVariableKeys.dbDatabase),
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      useFactory: (configService: ConfigService) => ({
        store: redisStore as unknown as CacheStore,
        url: configService.get<string>(redisVariableKeys.redisUrl),
        isGlobal: true,
      }),
      inject: [ConfigService],
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            utilities.format.nestLike('PerrFect', {
              prettyPrint: true,
              colors: true,
              appName: true,
            }),
          ),
        })
      ],
    }),
    MembersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
