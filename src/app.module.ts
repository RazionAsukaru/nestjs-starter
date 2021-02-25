import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './components/task/tasks.module';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './components/category/category.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(),
        TasksModule,
        AuthModule,
        UserModule,
        CategoryModule,
    ],
})
export class AppModule {}