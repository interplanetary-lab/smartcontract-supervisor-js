import axios, { AxiosInstance } from 'axios';

import {
  SupervisorSignatureCustomData,
  SupervisorSignatureData,
  SupervisorUserData,
  SupervisorUserFields,
  SupervisorWhitelistData,
} from './types';

/**
 * Object allowing to connect and interact with an instance of SmartContractSupervisor
 */
export default class SmartContractSupervisor {
  protected api: AxiosInstance;

  /**
   * Constructor
   * @param url The api url of the instance of SmartContractSupervisor
   * @param apiKey The associated private key to put in the header
   */
  constructor(url: string, apiKey: string) {
    this.api = axios.create({
      baseURL: url,
      headers: {
        'api-key': apiKey,
      },
    });
  }

  /**
   * Add a wallet to the whitelist
   *
   * @param address The address of the wallet
   * @param fields User fields object
   * @returns
   */
  async setUser(address: string, fields: SupervisorUserFields = {}) {
    const response = await this.api.post(`/users`, {
      address,
      fields,
    });
    return !!response.data;
  }

  /**
   * Add a wallet to the whitelist
   *
   * @param whitelistId
   * @param address
   * @param fields
   * @param signature_data
   * @returns
   */
  async addWalletTo(
    whitelistId: string,
    address: string,
    fields: SupervisorUserFields = {},
    signature_data: SupervisorSignatureCustomData = {},
  ) {
    const response = await this.api.post(`/whitelists/${whitelistId}`, {
      address,
      fields,
      signature_data,
    });
    return !!response.data;
  }

  /**
   * Return true if a wallet is in the whitelist
   *
   * @param whitelistId
   * @param wallet
   * @returns bool
   */
  async isWalletIn(whitelistId: string, wallet: string) {
    const response = await this.api.get(`/whitelists/${whitelistId}/${wallet}`);
    return response.data !== 0;
  }

  /**
   * Return true if a wallet is in the validator's whitelist
   *
   * @param validatorAddress
   * @param wallet
   * @returns bool
   */
  async isWalletKnownByValidator(validatorAddress: string, wallet: string) {
    const response = await this.api.get(
      `/validators/${validatorAddress}/${wallet}`,
    );
    return response.data !== 0;
  }

  /**
   * Returns the fields data of a wallet address linked to the whitelist or null if not whitelisted
   *
   * @param whitelistId
   * @param wallet
   * @returns array
   */
  async walletWhitelistData(whitelistId: string, wallet: string) {
    try {
      const response = await this.api.get(
        `/whitelists/${whitelistId}/${wallet}/data`,
      );
      return response.data;
    } catch (err) {
      return null;
    }
  }

  /**
   * Returns the fields data of a wallet address linked to the validator's whitelist or null if not whitelisted
   *
   * @param validatorAddress
   * @param wallet
   * @returns object
   */
  async walletValidatorData(validatorAddress: string, wallet: string) {
    try {
      const response = await this.api.get(
        `/validators/${validatorAddress}/${wallet}/data`,
      );
      return response.data as SupervisorSignatureCustomData;
    } catch (err) {
      return null;
    }
  }

  /**
   * Returns user data corresponding to the wallet
   *
   * @param wallet
   * @returns object
   */
  async userData(wallet: string) {
    const response = await this.api.get(`/users/${wallet}`);
    return response.data as SupervisorUserData & {
      whitelists: SupervisorWhitelistData[];
    };
  }

  /**
   * Get user data by wallet if registered, null otherwise
   *
   * @param whitelistId
   * @param wallet
   * @returns oject
   */
  async whitelistedData(whitelistId: string, wallet: string) {
    const response = await this.api.get(`/whitelists/${whitelistId}/search`, {
      params: {
        value: wallet,
      },
    });

    return (
      (response.data[0] as SupervisorUserData & {
        signature_data: SupervisorSignatureCustomData;
      }) || null
    );
  }

  /**
   * Request the whitelisted signature for a wallet
   *
   * @param whitelistId
   * @param wallet
   * @returns bool
   */
  async sign(whitelistId: string, wallet: string) {
    const response = await this.api.post(
      `/whitelists/${whitelistId}/sign/${wallet}`,
    );
    return response.data as SupervisorSignatureData;
  }

  /**
   * Request the validator signature for a wallet
   *
   * @param validatorAddress
   * @param wallet
   * @returns bool
   */
  async validatorSign(validatorAddress: string, wallet: string) {
    const response = await this.api.post(
      `/validators/${validatorAddress}/sign/${wallet}`,
    );
    return response.data as SupervisorSignatureData;
  }
}
