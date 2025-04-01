import { RepositoryClient } from '../clients/repository';
import { InstallScriptParams } from '../dto/installer';

export class InstallerService {
  constructor(private readonly installerRepository: RepositoryClient) {}

  async getInstallScriptPreSignedUrl(params: InstallScriptParams): Promise<string> {
    const endpoint = '/script';
    return this.installerRepository.getRecord<string, InstallScriptParams>(params, endpoint);
  }
}