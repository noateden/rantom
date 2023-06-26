import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import DSProxyFactoryAbi from '../../../configs/abi/maker/DSProxyFactory.json';
import { MakerDSProxyFactoryContract, Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseContractInfoOptions, AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  GemJoin: '0xef693bed00000000000000000000000000000000000000000000000000000000',
  GemExit: '0x3b4da69f00000000000000000000000000000000000000000000000000000000',
  DaiFlashloan: '0x0d7d75e01ab95780d3cd1c8ec0dd6c2ce19e3a20427eec8bf53283b6fb8e95f0',
  AuthGemJoin: '0x16c03c2fe01ac285473b0d10ba5c5de59ede582fcac27a866b5827415fe44b03',
  AuthGemExit: '0x22d324652c93739755cf4581508b60875ebdd78c20c0cff5cf8e23452b299631',
};

export class MakerAdapter extends Adapter {
  public readonly name: string = 'adapter.maker';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.GemJoin]: { abi: [] },
      [Signatures.GemExit]: { abi: [] },
      [Signatures.AuthGemJoin]: EventSignatureMapping[Signatures.AuthGemJoin],
      [Signatures.AuthGemExit]: EventSignatureMapping[Signatures.AuthGemExit],
      [Signatures.DaiFlashloan]: config.customEventMapping
        ? config.customEventMapping[Signatures.DaiFlashloan]
        : { abi: [] },
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3();

      if (signature === Signatures.DaiFlashloan) {
        const abi =
          this.config.customEventMapping && this.config.customEventMapping[signature]
            ? this.config.customEventMapping[signature].abi
            : EventSignatureMapping[signature].abi;
        const event = web3.eth.abi.decodeLog(abi, data, topics.slice(1));
        const receiver = normalizeAddress(event.receiver);
        const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);
        if (token) {
          const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
          return {
            protocol: this.config.protocol,
            action: 'flashloan',
            addresses: [receiver],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${receiver} flashloan ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else {
        if (compareAddress(address, this.config.staticData.daiJoin)) {
          const borrower = normalizeAddress(web3.eth.abi.decodeParameter('address', topics[1]).toString());
          const amount = new BigNumber(web3.eth.abi.decodeParameter('uint256', topics[3]).toString())
            .dividedBy(new BigNumber(10).pow(Tokens.ethereum.DAI.decimals))
            .toString(10);

          const action: KnownAction = signature === Signatures.GemJoin ? 'borrow' : 'repay';

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [borrower],
            tokens: [Tokens.ethereum.DAI],
            tokenAmounts: [amount],
            readableString: `${borrower} ${action} ${amount} ${Tokens.ethereum.DAI.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        } else if (signature === Signatures.GemJoin || signature === Signatures.GemExit) {
          let token: Token | null = null;
          for (const gem of this.config.staticData.gems) {
            if (compareAddress(address, gem.address)) {
              token = gem.token;
            }
          }

          if (token) {
            const depositor = normalizeAddress(web3.eth.abi.decodeParameter('address', topics[1]).toString());
            const amount = new BigNumber(web3.eth.abi.decodeParameter('uint256', topics[3]).toString())
              .dividedBy(new BigNumber(10).pow(token.decimals))
              .toString(10);

            const action: KnownAction = signature === Signatures.GemExit ? 'deposit' : 'withdraw';

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [depositor],
              tokens: [token],
              tokenAmounts: [amount],
              readableString: `${depositor} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        } else if (signature === Signatures.AuthGemJoin || signature === Signatures.AuthGemExit) {
          let token: Token | null = null;
          for (const gem of this.config.staticData.gems) {
            if (compareAddress(address, gem.address)) {
              token = gem.token;
            }
          }

          if (token) {
            const abi =
              this.config.customEventMapping && this.config.customEventMapping[signature]
                ? this.config.customEventMapping[signature].abi
                : EventSignatureMapping[signature].abi;
            const event = web3.eth.abi.decodeLog(abi, data, topics.slice(1));

            const depositor = event.urn ? normalizeAddress(event.urn) : normalizeAddress(event.usr);
            const amount = new BigNumber(event.amt).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

            const action: KnownAction = signature === Signatures.AuthGemJoin ? 'deposit' : 'withdraw';

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [depositor],
              tokens: [token],
              tokenAmounts: [amount],
              readableString: `${depositor} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    }

    return null;
  }

  public async tryParsingContractInfo(options: AdapterParseContractInfoOptions): Promise<string | null> {
    // the original DSProxy contract was deployed: 0x2b9b8b83c09e1d2bd3dace1c3db2fec8ff54a8ac

    const web3 = new Web3(EnvConfig.blockchains[options.chain].nodeRpc);
    const contract = new web3.eth.Contract(DSProxyFactoryAbi as any, MakerDSProxyFactoryContract);
    try {
      const isDsProxy = await contract.methods.isProxy(options.address).call();
      if (isDsProxy) {
        return `DSProxy ${normalizeAddress(options.address).slice(0, 6)}`;
      }
    } catch (e: any) {}

    return null;
  }
}
