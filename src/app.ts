import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UploadsModule } from './uploads/uploads.module';
import { HistoryModule } from './history/history.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    AuthModule,
    CategoriesModule,
    TodosModule,
    UploadsModule,
    HistoryModule,
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
