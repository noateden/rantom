import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import CreditFacadeAbi from '../../../configs/abi/gearbox/CreditFacade.json';
import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseContractInfoOptions, AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  AddLiquidity: '0xd2491a9b4fe81a7cd4511e8b7b7743951b061dad5bed7da8a7795b080ee08c7e',
  RemoveLiquidity: '0xd8ae9b9ba89e637bcb66a69ac91e8f688018e81d6f92c57e02226425c8efbdf6',
  Borrow: '0x312a5e5e1079f5dda4e95dbbd0b908b291fd5b992ef22073643ab691572c5b52',
  Repay: '0x2fe77b1c99aca6b022b8efc6e3e8dd1b48b30748709339b65c50ef3263443e09',
  Claimed: '0xfa8256f7c08bb01a03ea96f8b3a904a4450311c9725d1c52cdbe21ed3dc42dcc',

  OpenCreditAccount: '0xfa2baf5d3eb95569f312f22477b246f9d4c50276f1cb3ded8e1aeadcbc07a763',
  CloseCreditAccount: '0x460ad03b1cf79b1d64d3aefa28475f110ab66e84649c52bb41ed796b9b391981',
};

export class GearboxAdapter extends Adapter {
  public readonly name: string = 'adapter.gearbox';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.AddLiquidity]: EventSignatureMapping[Signatures.AddLiquidity],
      [Signatures.RemoveLiquidity]: EventSignatureMapping[Signatures.RemoveLiquidity],
      [Signatures.Borrow]: config.customEventMapping
        ? config.customEventMapping[Signatures.Borrow]
        : EventSignatureMapping[Signatures.Borrow],
      [Signatures.Repay]: EventSignatureMapping[Signatures.Repay],
      [Signatures.Claimed]: EventSignatureMapping[Signatures.Claimed],
      [Signatures.OpenCreditAccount]: EventSignatureMapping[Signatures.OpenCreditAccount],
      [Signatures.CloseCreditAccount]: EventSignatureMapping[Signatures.CloseCreditAccount],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    const web3 = new Web3();

    if (signature === Signatures.OpenCreditAccount || signature === Signatures.CloseCreditAccount) {
      try {
        const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));
        const account = event.onBehalfOf ? normalizeAddress(event.onBehalfOf) : normalizeAddress(event.borrower);
        const action: KnownAction = signature === Signatures.OpenCreditAccount ? 'openAccount' : 'closeAccount';
        return {
          protocol: this.config.protocol,
          action: action,
          tokens: [],
          tokenAmounts: [],
          addresses: [account],
          readableString: `${account} ${action} on ${this.config.protocol} chain ${options.chain}`,
        };
      } catch (e: any) {}
    }

    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      if (signature === Signatures.Claimed) {
        const user = normalizeAddress(event.account);
        const amount = new BigNumber(event.amount).dividedBy(1e18).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'collect',
          tokens: [Tokens.ethereum.GEAR],
          tokenAmounts: [amount],
          addresses: [user],
          readableString: `${user} collect ${amount} ${Tokens.ethereum.GEAR.symbol} on ${this.config.protocol} chain ${options.chain}`,
        };
      } else {
        let token = null;
        if (this.config.staticData) {
          for (const pool of this.config.staticData.pools) {
            if (compareAddress(pool.address, address)) {
              token = pool.token;
            }
          }
        }

        if (token) {
          const sender = event.sender
            ? normalizeAddress(event.sender)
            : event.creaditAccount
            ? normalizeAddress(event.creaditAccount)
            : normalizeAddress(event.creditManager);
          const amount = new BigNumber(event.amount ? event.amount : event.borrowedAmount)
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString(10);
          let action: KnownAction = 'deposit';
          if (signature === Signatures.RemoveLiquidity) {
            action = 'withdraw';
          }
          if (signature === Signatures.Borrow) {
            action = 'borrow';
          }
          if (signature === Signatures.Repay) {
            action = 'repay';
          }

          return {
            protocol: this.config.protocol,
            action: action,
            tokens: [token],
            tokenAmounts: [amount],
            addresses: [sender],
            readableString: `${sender} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${options.chain}`,
          };
        }
      }
    }

    return null;
  }

  public async tryParsingContractInfo(options: AdapterParseContractInfoOptions): Promise<string | null> {
    const web3 = new Web3(EnvConfig.blockchains[options.chain].nodeRpc);
    const contract = new web3.eth.Contract(CreditFacadeAbi as any, options.address);
    try {
      const creditManagerAddress = await contract.methods.creditManager().call();
      if (creditManagerAddress) {
        for (const pool of this.config.staticData.pools) {
          if (compareAddress(pool.creditManager, creditManagerAddress)) {
            return `Gearbox Credit Account ${normalizeAddress(options.address).slice(0, 6)}`;
          }
        }
      }
    } catch (e: any) {}

    return null;
  }
}
