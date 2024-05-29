import { RepositoryClient } from '../clients/repository';
import { AccountStatuses, AccountStatusResponse, ClientCredentialsResponse } from '../dto/account';

export class AccountService {
  constructor(
    private readonly accountRepository: RepositoryClient
  ) {}

  async getStatus(): Promise<AccountStatusResponse> {
    const endpoint = '/status'
    return this.accountRepository.getRecord<AccountStatusResponse, {}>({}, endpoint);
    return { status: AccountStatuses.Completed }
  };

  async getClientCredentials(): Promise<ClientCredentialsResponse> {
    const endpoint = '/client-credentials'
    return this.accountRepository.getRecord<ClientCredentialsResponse, {}>({}, endpoint);
  };
}
