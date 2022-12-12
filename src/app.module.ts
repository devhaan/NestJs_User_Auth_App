import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { DevModule } from './api/';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://devhaan:dev07dev@cluster0.2i6yqc9.mongodb.net/user?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
