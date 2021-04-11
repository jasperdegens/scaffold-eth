# [🤝 Good Tokens 🤝](https://good-tokens.surge.sh/)

## 💭 Inspiration

As digital artists, we wanted to explore the potential of creating a more balanced model for art ownership, in which NFTs could be used to create positive impact, from addressing the environmental impact of crypto mining to encouraging engagement in targeted communities.

Smart contracts make it possible to imbue assets with agency, an opportunity to make the work itself a continuous, evolving project.

<br/>

## 💡 Concept

Good Tokens is our radical new model for art ownership that guarantees works of art support causes artists care about.

Rather than just a transactional asset that is bought once and held, Good Token NFTs require continuous contribution or engagement with a cause. This creates a long-lasting relationship between the artist, art, owner, and supported organizations.

As one model to maintain ownership, buyers must accumulate Good Fund engagement tokens, the price of which track Good Data Feeds, oracles that index NGO real-world data.

<br/>

## [🏁 Live Demo Here!](https://good-tokens.surge.sh/)
Please connect to the Rinkeby network! 
## [Hosted Subgraph Here!](https://thegraph.com/explorer/subgraph/jasperdegens/good-tokens)

## Youtube video here

<br/>


## 🔨 Contracts

The Good Tokens system consists of three main contracts, deployed to the Rinkeby testnet:
  - 📝 GoodToken  [[0xA508d9bf37baB3162894b4559c001e763537Bc77](https://rinkeby.etherscan.io/address/0xa508d9bf37bab3162894b4559c001e763537bc77)]
  - 📝 GoodTokenFund  [[0xd6a0ad998252274cD4568391743e62CC9Fa9568e](https://rinkeby.etherscan.io/address/0xd6a0ad998252274cD4568391743e62CC9Fa9568e)]
  - 📝 GoodDataFeed  [[0x6E293e996f4D40D66025A7520D7cCd037f93779c](https://rinkeby.etherscan.io/address/0x6E293e996f4D40D66025A7520D7cCd037f93779c)]
  - 🖇️ [Good Tokens Subgraph](https://thegraph.com/explorer/subgraph/jasperdegens/good-tokens)
  - 🌊 [OpenSea Marketplace](https://testnets.opensea.io/collection/goodtokens)

<br/>
<br/>

## 👍 Good Tokens Overview
![Good Token Overview](https://raw.githubusercontent.com/jasperdegens/scaffold-eth/389679d08a84bfd9a186f4525ff2cd654bee4dfb/packages/react-app/public/GoodTokens.png)

<br/>
<br/>

## 🦾 Technical Overview
![Technical Overview](https://raw.githubusercontent.com/jasperdegens/scaffold-eth/good-tokens/packages/react-app/public/GoodTokensTechnical.png)


<br/>
<br/>

## 🔗 Chainlink Oracle and Jobs

For this project we used a Chainlink oracle on the Rinkeby network at address [0x032887D0D0055e0f90447369F57EEb76b7a8e210](https://rinkeby.etherscan.io/address/0x032887D0D0055e0f90447369F57EEb76b7a8e210). We leveraged the HttpGet, JSONParse,  Multiply, EthUint256, and EthTx core adapters. Thanks to Javier, Keenan, Patrick, the excellent node-operator network for making this possible!


<br/>
<br/>

## 🌐 UNICEF, EEA, SDMX Data Queries
Many NGOs and non-profit organizations use the SDMX protocol to provide their data to 3rd parties. Our [GoodDataFeed](https://rinkeby.etherscan.io/address/0x6E293e996f4D40D66025A7520D7cCd037f93779c) contract can register any open SDMX compatable data source and query data for a given year onchain via a [Chainlink oracle](https://rinkeby.etherscan.io/address/0x032887D0D0055e0f90447369F57EEb76b7a8e210) and node for transparent and trusted data. For our prototype, we selected [two data feeds](https://sdmx.data.unicef.org/databrowser/index.html) from UNICEF, one focused on immunizations and the other on out of school rates, and we also used a greenhouse gas emission metric from the [EEA](https://ec.europa.eu/eurostat/web/sdmx-infospace/welcome).


<br/>
<br/>

## [🖇️ The Graph + IPFS](https://thegraph.com/explorer/subgraph/jasperdegens/good-tokens)
We leveraged The Graph to bind together the data from our contracts and our metadata stored on IPFS.

Interesting tidbits:
  - **Event Handlers** for GoodToken, GoodTokenFund, and GoodDataFeed contracts.
  - **Block Handler** to query and update subgraph if tokens on our GoodToken contract were revoked.
  - **IPFS cat** calls to pull in pinned metadata for frontend magic.

We would have liked to use **Call Handlers** as well in order to cut down on gas costs, however at this time they are not supported on Rinkeby (we wanted to stick with Rinkeby to test [intergration with OpenSea](https://testnets.opensea.io/collection/goodtokens));

You can view our [hosted subgraph here](https://thegraph.com/explorer/subgraph/jasperdegens/good-tokens)!


<br/>
<br/>

## 🙏 Special thanks to:
- 🐦 Keenan and Patrick at Chainlink for amazing advice and support.
- Javier for hosting a Chainlink node on Rinkeby.
- Mehran at UNICEF for sharing the orgniazations inspiring vision for blockchain tech.
- The Graph for making block-chain querying, IPFS integration, and frontent development an absolute pleasure.
- Austin Griffith for incredible scaffold code-base to get started with.
