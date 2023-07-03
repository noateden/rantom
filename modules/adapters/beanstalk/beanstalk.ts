import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  AddDeposit: '0xdbe49eaf5c2a8a7f65920c200ca5d47395540b884f6a1886fdb2611624f9981b',
  AddWithdrawal: '0xad946216d2715ed9b769178b59b5bd1b1ee3a1ef3adbe82f17d30617109e96f3',
  ClaimWithdrawal: '0xaa6a2412fe6f73e85c713779b0e5a0d7fe8c08cc03c3a7b397ef83a4c1dca538',
  ClaimWithdrawals: '0x7c7b3f4a133861c092bfa3c8ba112156b88763da4e7ed69e50f617bc24c68c4e',

  Sow: '0xdd43b982e9a6350577cad86db14e254b658fb741d7864a6860409c4526bcc641',
  Harvest: '0x2250a3497055c8a54223a5ea64f100a209e9c1c4ab39d3cae64c64a493065fa1',

  PodOrderCreated: '0x7279c7b5d64f6bb98758727f0f16bcc5cf260997bfb49a45234c28fcb55fbcf0',
  PodOrderFilled: '0x525994627282299f72de05d7d3f543c6ec6c2022cb3898ad47ff18553c7655bf',
  PodListingCreated: '0xb7653814153cbbed10e29f56c0ba102e97b4ce1078bbd8bd02da1ccce7d38fc9',
  PodListingFilled: '0xb33a5c3dd7c4265e5702ad84b5c4f6bb3971d2424a47955979a642fe9d77f4c3',
};

export class BeanstalkAdapter extends Adapter {
  public readonly name: string = 'adapter.beanstalk';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.AddDeposit]: EventSignatureMapping[Signatures.AddDeposit],
      [Signatures.AddWithdrawal]: EventSignatureMapping[Signatures.AddWithdrawal],
      [Signatures.ClaimWithdrawal]: EventSignatureMapping[Signatures.ClaimWithdrawal],
      [Signatures.ClaimWithdrawals]: EventSignatureMapping[Signatures.ClaimWithdrawals],

      [Signatures.Sow]: EventSignatureMapping[Signatures.Sow],
      [Signatures.Harvest]: EventSignatureMapping[Signatures.Harvest],

      [Signatures.PodOrderCreated]: EventSignatureMapping[Signatures.PodOrderCreated],
      [Signatures.PodOrderFilled]: EventSignatureMapping[Signatures.PodOrderFilled],
      [Signatures.PodListingCreated]: EventSignatureMapping[Signatures.PodListingCreated],
      [Signatures.PodListingFilled]: EventSignatureMapping[Signatures.PodListingFilled],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (
      this.config.contracts[chain] &&
      this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1 &&
      this.eventMappings[signature]
    ) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      if (signature === Signatures.AddDeposit || signature === Signatures.AddWithdrawal) {
        const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);
        if (token) {
          const account = normalizeAddress(event.account);
          const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

          const action = signature === Signatures.AddDeposit ? 'deposit' : 'withdraw';

          return {
            protocol: this.config.protocol,
            action: action,
            tokens: [token],
            tokenAmounts: [amount],
            addresses: [account],
            readableString: `${account} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${options.chain}`,
          };
        }
      } else if (signature === Signatures.Sow || signature === Signatures.Harvest) {
        const account = normalizeAddress(event.account);
        const amount = new BigNumber(event.beans)
          .dividedBy(new BigNumber(10).pow(Tokens.ethereum.BEAN.decimals))
          .toString(10);

        const action = signature === Signatures.Sow ? 'sow' : 'collect';

        return {
          protocol: this.config.protocol,
          action: action,
          tokens: [Tokens.ethereum.BEAN],
          tokenAmounts: [amount],
          addresses: [account],
          readableString: `${account} ${action} ${amount} ${Tokens.ethereum.BEAN.symbol} on ${this.config.protocol} chain ${options.chain}`,
          addition:
            signature === Signatures.Sow
              ? {
                  podAmount: event.pods.toString(),
                }
              : undefined,
        };
      } else if (signature === Signatures.ClaimWithdrawal || signature === Signatures.ClaimWithdrawals) {
        const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);

        if (token) {
          const account = normalizeAddress(event.account);
          const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
          return {
            protocol: this.config.protocol,
            action: 'collect',
            tokens: [token],
            tokenAmounts: [amount],
            addresses: [account],
            readableString: `${account} collect ${amount} ${token.symbol} on ${this.config.protocol} chain ${options.chain}`,
          };
        }
      } else if (signature === Signatures.PodOrderCreated) {
        const account = normalizeAddress(event.account);
        const podAmount = new BigNumber(event.amount).dividedBy(1e6).toString(10);
        const price = new BigNumber(event.pricePerPod).dividedBy(1e6).toString(10);
        const amount = new BigNumber(podAmount).multipliedBy(new BigNumber(price)).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'offer',
          tokens: [Tokens.ethereum.BEAN],
          tokenAmounts: [amount],
          addresses: [account],
          readableString: `${account} offer ${amount} BEANs for ${podAmount} PODs on ${this.config.protocol} chain ${options.chain}`,
          addition: {
            podAmount: podAmount,
          },
        };
      } else if (signature === Signatures.PodOrderFilled || signature === Signatures.PodListingFilled) {
        const seller = normalizeAddress(event.from);
        const buyer = normalizeAddress(event.to);
        const costInBean = new BigNumber(event.costInBeans).dividedBy(1e6).toString(10);
        const podAmount = new BigNumber(event.amount).dividedBy(1e6).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'buy',
          tokens: [Tokens.ethereum.BEAN],
          tokenAmounts: [costInBean],
          addresses: [buyer, seller],
          readableString: `${buyer} buy ${podAmount} PODs for ${costInBean} BEANs on ${this.config.protocol} chain ${options.chain}`,
          addition: {
            podAmount: podAmount,
          },
        };
      } else if (signature === Signatures.PodListingCreated) {
        const account = normalizeAddress(event.account);
        const podAmount = new BigNumber(event.amount).dividedBy(1e6).toString(10);
        const price = new BigNumber(event.pricePerPod).dividedBy(1e6).toString(10);
        const amount = new BigNumber(podAmount).multipliedBy(new BigNumber(price)).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'list',
          tokens: [Tokens.ethereum.BEAN],
          tokenAmounts: [amount],
          addresses: [account],
          readableString: `${account} list ${podAmount} PODs for ${amount} BEANs on ${this.config.protocol} chain ${options.chain}`,
          addition: {
            podAmount: podAmount,
          },
        };
      }
    }

    return null;
  }
}
