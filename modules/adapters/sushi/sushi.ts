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

      if (signature === Signatures.Transfer) {
        // sushi bar
        if (event.from === AddressZero || event.to === AddressZero) {
          if (options.context) {
            const sushiContract = new web3.eth.Contract(Erc20Abi as any, Tokens.ethereum.SUSHI.address);
            const xSushiContract = new web3.eth.Contract(Erc20Abi as any, Tokens.ethereum.xSUSHI.address);

            const sushiBalance = await sushiContract.methods
              .balanceOf(Tokens.ethereum.xSUSHI.address)
              .call(options.context.blockNumber - 1);
            const xSushiSupply = await xSushiContract.methods.totalSupply().call(options.context.blockNumber - 1);
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
          return {
            protocol: this.config.protocol,
            action: signature === Signatures.MasterchefDeposit ? 'deposit' : 'withdraw',
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
            readableString: `${normalizeAddress(event.user)} ${
              signature === Signatures.MasterchefDeposit ? 'deposit' : 'withdraw'
            } ${amount} ${tokenSymbol} on ${this.config.protocol} chain ${chain}`,
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
