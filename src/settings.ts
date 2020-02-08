import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
import Torus from "@toruslabs/torus-embed";

const WalletConnectProvider = require("@walletconnect/web3-provider");
const Portis = require("@portis/web3");
const Fortmatic = require("fortmatic");

function isMobileBrowser(): boolean {
  // if (!window) {
  //   return false
  // }
  let check = false;
  // from here: https://detectmobilebrowsers.com/
  // eslint-disable-next-line no-useless-escape
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true; })(navigator.userAgent||navigator.vendor||(window as any).opera);
  return check;
}

export const settings = {
  ganache: {
    graphqlHttpProvider: "http://127.0.0.1:8000/subgraphs/name/daostack",
    graphqlWsProvider: "ws://127.0.0.1:8001/subgraphs/name/daostack",
    graphqlSubscribeToQueries: false,
    web3Provider: "ws://127.0.0.1:8545",
    web3ProviderRead: "ws://127.0.0.1:8545",
    ipfsProvider: "http://127.0.0.1:5001/api/v0",
    txSenderServiceUrl: "https://tx-sender-service.herokuapp.com/send-tx",
    web3ConnectProviderOptions: {},
  },
  rinkeby: {
    graphqlHttpProvider: process.env.ARC_GRAPHQLHTTPPROVIDER || "https://api.thegraph.com/subgraphs/name/daostack/v37_3_rinkeby",
    graphqlWsProvider:  process.env.ARC_GRAPHQLWSPROVIDER || "wss://api.thegraph.com/subgraphs/name/daostack/v37_3_rinkeby",
    graphqlSubscribeToQueries: false,
    web3Provider:  process.env.ARC_WEB3PROVIDER || "wss://rinkeby.infura.io/ws/v3/e0cdf3bfda9b468fa908aa6ab03d5ba2",
    web3ProviderRead:  process.env.ARC_WEB3PROVIDERREAD || "wss://rinkeby.infura.io/ws/v3/e0cdf3bfda9b468fa908aa6ab03d5ba2",
    ipfsProvider: process.env.ARC_IPFSPROVIDER || "https://api.thegraph.com:443/ipfs-daostack/api/v0",
    txSenderServiceUrl: "https://tx-sender-service.herokuapp.com/send-tx",
    web3ConnectProviderOptions: {
      network: "rinkeby",
      torus: {
        package: Torus,
        network: "rinkeby",
      },
      walletconnect: {
        package: isMobileBrowser() ? null : WalletConnectProvider,
        options: {
          infuraId: "e0cdf3bfda9b468fa908aa6ab03d5ba2",
        },
      },
      burnerconnect: {
        package: BurnerConnectProvider,
        options: {
          defaultNetwork: "4",
          defaultWallets: [
            { origin: "https://denver-demo.burnerfactory.com/", name: "Denver Demo Wallet" },
          ],
        },
      },
      portis: {
        package: Portis,
        options: {
          id: "aae9cff5-6e61-4b68-82dc-31a5a46c4a86",
        },
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: "pk_test_659B5B486EF199E4",
        },
      },
      squarelink: {
        options: {
          id: null as any,
        },
      },
    },
  },
  xdai: {
    graphqlHttpProvider: process.env.ARC_GRAPHQLHTTPPROVIDER || "https://api.thegraph.com/subgraphs/name/daostack/v38_0_xdai",
    graphqlWsProvider:  process.env.ARC_GRAPHQLWSPROVIDER || "wss://api.thegraph.com/subgraphs/name/daostack/v38_0_xdai",
    graphqlSubscribeToQueries: false,
    web3Provider:  process.env.ARC_WEB3PROVIDER || "https://poa.api.nodesmith.io/v1/dai/jsonrpc?apiKey=128059b9320a462699aef283a7ae2546",
    web3ProviderRead:  process.env.ARC_WEB3PROVIDERREAD || "wss://poa.api.nodesmith.io/v1/dai/jsonrpc/ws?apiKey=128059b9320a462699aef283a7ae2546",
    ipfsProvider: process.env.ARC_IPFSPROVIDER || "https://api.thegraph.com:443/ipfs-daostack/api/v0",
    txSenderServiceUrl: "",
    web3ConnectProviderOptions: {
      network: "xdao",
      burnerconnect: {
        package: BurnerConnectProvider,
        options: {
          defaultNetwork: "100",
          defaultWallets: [
            { origin: "https://buffidao.com/", name: "BuffiDAO" },
            { origin: "https://denver-demo.burnerfactory.com/", name: "Denver Demo Wallet" },
          ],
        },
      },
    },
  },
  main: {
    graphqlHttpProvider: process.env.ARC_GRAPHQLHTTPPROVIDER || "https://api.thegraph.com/subgraphs/name/daostack/v37_3",
    graphqlWsProvider: process.env.ARC_GRAPHQLWSPROVIDER || "wss://api.thegraph.com/subgraphs/name/daostack/v37_3",
    graphqlSubscribeToQueries: false,
    web3Provider: process.env.ARC_WEB3PROVIDER || "wss://mainnet.infura.io/ws/v3/e0cdf3bfda9b468fa908aa6ab03d5ba2",
    web3ProviderRead: process.env.ARC_WEB3PROVIDERREAD || "wss://mainnet.infura.io/ws/v3/e0cdf3bfda9b468fa908aa6ab03d5ba2",
    ipfsProvider: process.env.ARC_IPFSPROVIDER || "https://api.thegraph.com:443/ipfs-daostack/api/v0",
    // txSenderServiceUrl: "https://tx-sender-service-mainnet.herokuapp.com/send-tx",
    txSenderServiceUrl: "",
    web3ConnectProviderOptions: {
      network: "mainnet",
      torus: {
        package: Torus,
        network: "mainnet",
      },
      walletconnect: {
        package: isMobileBrowser() ? null : WalletConnectProvider,
        options: {
          infuraId: "e0cdf3bfda9b468fa908aa6ab03d5ba2",
        },
      },
      burnerconnect: {
        package: BurnerConnectProvider,
        options: {
          defaultNetwork: "1",
          defaultWallets: [
            { origin: "https://buffidao.com/", name: "BuffiDAO" },
          ],
        },
      },
      portis: {
        package: Portis,
        options: {
          id: "aae9cff5-6e61-4b68-82dc-31a5a46c4a86",
        },
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: "pk_live_38A2BD2B1D4E9912",
        },
      },
      squarelink: {
        options: {
          id: null as any,
        },
      },
    },
  },
};

