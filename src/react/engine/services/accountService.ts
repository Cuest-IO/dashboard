import { RepositoryClient } from "../clients/repository";
import {
  AccountStatuses,
  AccountStatusResponse
} from "../dto/account";

export class AccountService {
  constructor(
    private readonly accountRepository: RepositoryClient
  ) {}

  async getStatus(): Promise<AccountStatusResponse> {
    const endpoint = '/status'
    return this.accountRepository.getRecord<AccountStatusResponse, {}>({}, endpoint);
  };
}
