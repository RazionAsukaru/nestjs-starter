import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/type.orm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [TasksModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule, UserModule],
})
export class AppModule {}
