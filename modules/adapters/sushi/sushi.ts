import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import Erc20Abi from '../../../configs/abi/ERC20.json';
import { AddressZero, Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Uniswapv2Adapter } from '../uniswap/uniswapv2';

const Signatures = {
  MasterchefDeposit: '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15',
  MasterchefWithdraw: '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568',
  MasterchefEmergencyWithdraw: '0xbb757047c2b5f3974fe26b7c10f732e7bce710b0952a71082702781e62ae0595',
  MasterchefDepositV2: '0x02d7e648dd130fc184d383e55bb126ac4c9c60e8f94bf05acdf557ba2d540b47',
  MasterchefWithdrawV2: '0x8166bf25f8a2b7ed3c85049207da4358d16edbed977d23fa2ee6f0dde3ec2132',
  MasterchefEmergencyWithdrawV2: '0x2cac5e20e1541d836381527a43f651851e302817b71dc8e810284e69210c1c6b',

  Transfer: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',

  // minichef
  MinichefDeposit: '0x02d7e648dd130fc184d383e55bb126ac4c9c60e8f94bf05acdf557ba2d540b47',
  MinichefWithdraw: '0x8166bf25f8a2b7ed3c85049207da4358d16edbed977d23fa2ee6f0dde3ec2132',
  MinichefEmergencyWithdraw: '0x2cac5e20e1541d836381527a43f651851e302817b71dc8e810284e69210c1c6b',
  MinichefHarvest: '0x71bab65ced2e5750775a0613be067df48ef06cf92a496ebf7663ae0660924954',

  // bentobox
  LogDeposit: '0xb2346165e782564f17f5b7e555c21f4fd96fbc93458572bf0113ea35a958fc55',
  LogWithdraw: '0xad9ab9ee6953d4d177f4a03b3a3ac3178ffcb9816319f348060194aa76b14486',
  LogFlashLoan: '0x3be9b85936d5d30a1655ea116a17ee3d827b2cd428cc026ce5bf2ac46a223204',
};

export class SushiAdapter extends Uniswapv2Adapter {
  public readonly name: string = 'adapter.sushi';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);

    this.eventMappings[Signatures.MasterchefDeposit] = EventSignatureMapping[Signatures.MasterchefDeposit];
    this.eventMappings[Signatures.MasterchefWithdraw] = EventSignatureMapping[Signatures.MasterchefWithdraw];
    this.eventMappings[Signatures.MasterchefEmergencyWithdraw] =
      EventSignatureMapping[Signatures.MasterchefEmergencyWithdraw];
    this.eventMappings[Signatures.MasterchefDepositV2] = EventSignatureMapping[Signatures.MasterchefDepositV2];
    this.eventMappings[Signatures.MasterchefWithdrawV2] = EventSignatureMapping[Signatures.MasterchefWithdrawV2];
    this.eventMappings[Signatures.MasterchefEmergencyWithdrawV2] =
      EventSignatureMapping[Signatures.MasterchefEmergencyWithdrawV2];

    this.eventMappings[Signatures.Transfer] = EventSignatureMapping[Signatures.Transfer];

    this.eventMappings[Signatures.MinichefDeposit] = this.config.customEventMapping
      ? this.config.customEventMapping[Signatures.MinichefDeposit]
      : EventSignatureMapping[Signatures.MinichefDeposit];
    this.eventMappings[Signatures.MinichefWithdraw] = this.config.customEventMapping
      ? this.config.customEventMapping[Signatures.MinichefWithdraw]
      : EventSignatureMapping[Signatures.MinichefWithdraw];
    this.eventMappings[Signatures.MinichefEmergencyWithdraw] = this.config.customEventMapping
      ? this.config.customEventMapping[Signatures.MinichefEmergencyWithdraw]
      : EventSignatureMapping[Signatures.MinichefEmergencyWithdraw];
    this.eventMappings[Signatures.MinichefHarvest] = EventSignatureMapping[Signatures.MinichefHarvest];

    this.eventMappings[Signatures.LogDeposit] = EventSignatureMapping[Signatures.LogDeposit];
    this.eventMappings[Signatures.LogWithdraw] = EventSignatureMapping[Signatures.LogWithdraw];
    this.eventMappings[Signatures.LogFlashLoan] = EventSignatureMapping[Signatures.LogFlashLoan];
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const action: TransactionAction | null = await super.tryParsingActions(options);

    if (action) {
      return action;
    }

    const { chain, address, topics, data } = options;
    const signature = topics[0];
    if (
      this.config.contracts[chain] &&
      this.config.contracts[chain].indexOf(address) !== -1 &&
      this.eventMappings[signature]
    ) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.Transfer && chain === 'ethereum') {
        // sushi bar
        if (event.from === AddressZero || event.to === AddressZero) {
          if (options.blockNumber) {
            const sushiContract = new web3.eth.Contract(Erc20Abi as any, Tokens.ethereum.SUSHI.address);
            const xSushiContract = new web3.eth.Contract(Erc20Abi as any, Tokens.ethereum.xSUSHI.address);

            const sushiBalance = await sushiContract.methods
              .balanceOf(Tokens.ethereum.xSUSHI.address)
              .call(options.blockNumber - 1);
            const xSushiSupply = await xSushiContract.methods.totalSupply().call(options.blockNumber - 1);
            const xSushiPrice = new BigNumber(sushiBalance.toString())
              .multipliedBy(1e18)
              .dividedBy(new BigNumber(xSushiSupply.toString()));
            const sushiAmount = new BigNumber(event.value).multipliedBy(xSushiPrice).dividedBy(1e36).toString(10);

            const action: KnownAction = event.from === AddressZero ? 'deposit' : 'withdraw';
            const address = event.from === AddressZero ? normalizeAddress(event.to) : normalizeAddress(event.from);

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [address],
              tokens: [Tokens.ethereum.SUSHI],
              tokenAmounts: [sushiAmount],
              readableString: `${address} ${action} ${sushiAmount} SUSHI on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      } else if (
        signature === Signatures.MinichefDeposit ||
        signature === Signatures.MinichefWithdraw ||
        signature === Signatures.MinichefHarvest ||
        signature === Signatures.MinichefEmergencyWithdraw
      ) {
        // minichef

        if (signature === Signatures.MinichefHarvest) {
          const amount = new BigNumber(event.amount.toString()).dividedBy(1e18).toString(10);
          const address = normalizeAddress(event.user);

          return {
            protocol: this.config.protocol,
            action: 'collect',
            addresses: [address],
            tokens: [Tokens.ethereum.SUSHI],
            tokenAmounts: [amount],
            readableString: `${address} ${action} ${amount} SUSHI on ${this.config.protocol} chain ${chain}`,
          };
        } else {
          let poolInfo = null;
          if (this.config.staticData.pools) {
            for (const pool of this.config.staticData.pools) {
              if (compareAddress(pool.address, address) && pool.pid === Number(event[1])) {
                poolInfo = pool;
              }
            }
          }

          if (poolInfo) {
            const amount = new BigNumber(event[2].toString()).dividedBy(1e18).toString(10);
            const tokenSymbol = `${poolInfo.lpToken.token0.symbol}-${poolInfo.lpToken.token1.symbol} ${poolInfo.lpToken.symbol}`;
            return {
              protocol: this.config.protocol,
              action: signature === Signatures.MinichefDeposit ? 'deposit' : 'withdraw',
              addresses: [normalizeAddress(event.user)],
              tokens: [
                {
                  chain: chain,
                  symbol: tokenSymbol,
                  decimals: 18,
                  address: normalizeAddress(poolInfo.lpToken.address),
                },
              ],
              tokenAmounts: [amount],
              readableString: `${normalizeAddress(event[0])} ${
                signature === Signatures.MinichefDeposit ? 'deposit' : 'withdraw'
              } ${amount} ${tokenSymbol} on ${this.config.protocol} chain ${chain}`,
              addition: {
                lpToken: poolInfo.lpToken,
              },
            };
          }
        }
      } else if (
        signature === Signatures.LogDeposit ||
        signature === Signatures.LogWithdraw ||
        signature === Signatures.LogFlashLoan
      ) {
        // bentobox
        const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);
        if (token) {
          const amount = new BigNumber(event.amount.toString())
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString(10);
          const address = event.from ? normalizeAddress(event.from) : normalizeAddress(event.borrower);
          let action: KnownAction = 'deposit';
          if (signature === Signatures.LogWithdraw) {
            action = 'withdraw';
          } else if (signature === Signatures.LogFlashLoan) {
            action = 'flashloan';
          }

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [address],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${address} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else {
        // masterchef
        let poolInfo = null;
        if (this.config.staticData.pools) {
          for (const pool of this.config.staticData.pools) {
            if (compareAddress(pool.address, address) && pool.pid === Number(event.pid)) {
              poolInfo = pool;
            }
          }
        }

        if (poolInfo) {
          const amount = new BigNumber(event.amount.toString()).dividedBy(1e18).toString(10);
          const tokenSymbol = `${poolInfo.lpToken.token0.symbol}-${poolInfo.lpToken.token1.symbol} ${poolInfo.lpToken.symbol}`;
          const action: KnownAction =
            signature === Signatures.MasterchefDeposit || signature === Signatures.MasterchefDepositV2
              ? 'deposit'
              : 'withdraw';
          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [normalizeAddress(event.user)],
            tokens: [
              {
                chain: chain,
                symbol: tokenSymbol,
                decimals: 18,
                address: normalizeAddress(poolInfo.lpToken.address),
              },
            ],
            tokenAmounts: [amount],
            readableString: `${normalizeAddress(event.user)} ${action} ${amount} ${tokenSymbol} on ${
              this.config.protocol
            } chain ${chain}`,
            addition: {
              lpToken: poolInfo.lpToken,
            },
          };
        }
      }
    }

    return null;
  }
}
