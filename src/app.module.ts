import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaTransactionRepository } from './modules/transactions/infra/repositories/prisma/prisma.transaction.repository';
import { ITransactionRepository } from './modules/transactions/infra/repositories/transaction.repository.abstract';
import { PrismaService } from './shared/prisma.service';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [TransactionsModule, UsersModule],
  controllers: [AppController],
  providers: [PrismaService, {
    provide: ITransactionRepository,
    useClass: PrismaTransactionRepository
  }],
})
export class AppModule {}
