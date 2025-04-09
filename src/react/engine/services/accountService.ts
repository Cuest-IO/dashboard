import { RepositoryClient } from '../clients/repository';
import { AccountStatusResponse, ClientCredentialsResponse } from '../dto/account';

export class AccountService {
  constructor(private readonly accountRepository: RepositoryClient) {}

  async getStatus(): Promise<AccountStatusResponse> {
    const endpoint = '/status';
    return this.accountRepository.getRecord<AccountStatusResponse, {}>({}, endpoint);
  }

  async getClientAccessData(): Promise<ClientCredentialsResponse> {
    const endpoint = '/client-access-data';
    return this.accountRepository.getRecord<ClientCredentialsResponse, {}>({}, endpoint);
  }
}
