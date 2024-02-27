import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './accounts/auth/auth.module';
import { DealsModule } from './deals/deals.module';

@Module({
  imports: [AuthModule, DealsModule, AccountsModule],
})
export class DomainsModule {}
