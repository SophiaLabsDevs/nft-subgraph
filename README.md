https://api.studio.thegraph.com/query/64123/nft-sentience/version/latest

npm install -g @graphprotocol/graph-cli
graph init --studio nft-sentience
graph auth --studio $APIKEY
cd nft-sentience
graph codegen && graph build
graph deploy --studio nft-sentience

graph deploy sophiaverse --deploy-key XXX --network mainnet







