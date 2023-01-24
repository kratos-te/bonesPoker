"use strict";
exports.__esModule = true;
var client_1 = require("react-dom/client");
var react_router_dom_1 = require("react-router-dom");
var context_1 = require("context");
var Wallets_1 = require("components/Wallets/Wallets");
var SocketProvider_1 = require("context/SocketProvider");
var GameProvider_1 = require("context/GameProvider");
var wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
var App_1 = require("App");
var container = document.getElementById("root");
var root = client_1.createRoot(container);
root.render(
// <WalletsContextProvider>
//   <SocketProvider>
//     <GameProvider>
//       <BrowserRouter>
//         <MaterialUIControllerProvider>
//           <App />
//         </MaterialUIControllerProvider>
//       </BrowserRouter>
//     </GameProvider>
//   </SocketProvider>
// </WalletsContextProvider>
React.createElement(Wallets_1["default"], null,
    React.createElement(SocketProvider_1["default"], null,
        React.createElement(GameProvider_1["default"], null,
            React.createElement(wallet_adapter_react_ui_1.WalletModalProvider, null,
                React.createElement(react_router_dom_1.BrowserRouter, null,
                    React.createElement(context_1.MaterialUIControllerProvider, null,
                        React.createElement(App_1["default"], null))))))));
