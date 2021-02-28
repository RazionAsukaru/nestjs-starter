import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './components/task/tasks.module';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(),
        RedisModule.register({
          url: process.env.REDIS_URL,
          onClientReady: async (client): Promise<void> => {
            client.on('error', console.error);
            client.on('ready', () => {
              Logger.log('redis is running on 6379 port');
            });
            client.on('restart', () => {
              Logger.log('attempt to restart the redis server');
            });
          },
          reconnectOnError: (): boolean => true,
        }),
        TasksModule,
        AuthModule,
        UserModule,
    ],
})
export class AppModule {}