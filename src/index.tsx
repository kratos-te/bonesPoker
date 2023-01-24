import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MaterialUIControllerProvider } from "context";
import WalletsContextProvider from "components/Wallets/Wallets";
import SocketProvider from "context/SocketProvider";
import GameProvider from "context/GameProvider";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import App from "App";

const container = document.getElementById("root");
const root = createRoot(container);

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
  <WalletsContextProvider>
    <SocketProvider>
      <GameProvider>
        <WalletModalProvider>
          <BrowserRouter>
            <MaterialUIControllerProvider>
              <App />
            </MaterialUIControllerProvider>
          </BrowserRouter>
        </WalletModalProvider>
      </GameProvider>
    </SocketProvider>
  </WalletsContextProvider>
);
