import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import BeefyVaultAbi from '../../../configs/abi/beefy/BeefyVaultV7.json';
import { AddressZero, Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Staked: '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d',
  Withdrawn: '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5',
  RewardPaid: '0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486',

  // We detect vaults deposit/withdraw by get the mooTokens transfer events
  // It's a deposit action when the transfer event from zero address
  // It's a withdrawal action when the transfer event to zero address
  Transfer: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
};

export class BeefyAdapter extends Adapter {
  public readonly name: string = 'adapter.beefy';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Staked]: EventSignatureMapping[Signatures.Staked],
      [Signatures.Withdrawn]: EventSignatureMapping[Signatures.Withdrawn],
      [Signatures.RewardPaid]: config.customEventMapping
        ? config.customEventMapping[Signatures.RewardPaid]
        : EventSignatureMapping[Signatures.RewardPaid],
      [Signatures.Transfer]: EventSignatureMapping[Signatures.Transfer],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const rpcWrapper = this.getRpcWrapper();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.Transfer) {
        const from = normalizeAddress(event.from);
        const to = normalizeAddress(event.to);

        if (compareAddress(from, AddressZero) || compareAddress(to, AddressZero)) {
          let blockNumber = 0;
          let token = null;
          let priceShare = '0';

          if (this.config.staticData) {
            for (const vault of this.config.staticData.vaults) {
              if (compareAddress(vault.address, address)) {
                token = vault.token;
              }
            }
          }

          try {
            if (options.context) {
              blockNumber = options.context.blockNumber;
            } else {
              const tx = await web3.eth.getTransactionReceipt(options.hash as string);
              blockNumber = tx.blockNumber;
            }
            priceShare = await rpcWrapper.queryContract({
              chain,
              abi: BeefyVaultAbi,
              contract: address,
              method: 'getPricePerFullShare',
              params: [],
              blockNumber: blockNumber,
            });

            if (!token) {
              const tokenAddress = await rpcWrapper.queryContract({
                chain,
                abi: BeefyVaultAbi,
                contract: address,
                method: 'want',
                params: [],
                blockNumber: blockNumber,
              });
              token = await this.getWeb3Helper().getErc20Metadata(chain, tokenAddress);
            }
          } catch (e: any) {}

          if (blockNumber > 0 && token) {
            const amount = new BigNumber(event.value)
              .multipliedBy(new BigNumber(priceShare.toString()))
              .dividedBy(1e18)
              .dividedBy(new BigNumber(10).pow(token.decimals))
              .toString(10);
            const action: KnownAction = compareAddress(from, AddressZero) ? 'deposit' : 'withdraw';
            const user: string = compareAddress(from, AddressZero) ? to : from;

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [user],
              tokens: [token],
              tokenAmounts: [amount],
              readableString: `${user} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }

        if (compareAddress(from, AddressZero)) {
        } else if (compareAddress(to, AddressZero)) {
        }
      } else if (signature === Signatures.RewardPaid) {
        const user = normalizeAddress(event.user);
        const amount = new BigNumber(event.reward.toString()).dividedBy(1e18).toString(10);
        // reward WETH
        return {
          protocol: this.config.protocol,
          action: 'collect',
          addresses: [user],
          tokens: [Tokens.ethereum.WETH],
          tokenAmounts: [amount],
          readableString: `${user} collect ${amount} ${Tokens.ethereum.WETH.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      } else {
        const user = normalizeAddress(event.user);
        const amount = new BigNumber(event.amount.toString()).dividedBy(1e18).toString(10);
        // deposit/withdraw BIFI
        let action: KnownAction = 'deposit';
        if (signature === Signatures.Withdrawn) {
          action = 'withdraw';
        }

        return {
          protocol: this.config.protocol,
          action: action,
          addresses: [user],
          tokens: [Tokens.ethereum.BIFI],
          tokenAmounts: [amount],
          readableString: `${user} ${action} ${amount} ${Tokens.ethereum.BIFI.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
