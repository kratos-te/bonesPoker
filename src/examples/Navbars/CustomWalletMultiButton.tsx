import { FC, useState, useEffect, useRef, useMemo, useCallback } from "react";

import type { ButtonProps } from "./ConnectButton";
import { ConnectButton as CustomWalletConnectBaseButton } from "./ConnectButton";
import { useWalletModal, WalletConnectButton } from "@solana/wallet-adapter-react-ui";
import { WalletModalButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { Connection } from "@solana/web3.js";

// import * as from "./CustomWalletMultiButton.module.css";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import axios from "axios";
import { useSocket } from "../../context/SocketProvider";

import getConfig from "next/config";
import { userProfile as UserProfileIcon, save as SaveIcon } from "../svgIcons";
import { UserProfile } from "../../types/UserProfile";
import { errorAlert, successAlert } from "../../components/toastGroup";
import { useGame } from "context/GameProvider";

export const Default_User_Pfps = ["/img/avatars/1.png"];

const styles = require("./CustomWalletMultiButton.module.css");

// const { publicRuntimeConfig } = getConfig();
// const SOLANA_NETWORK = publicRuntimeConfig.SOLANA_NETWORK;

const SOLANA_NETWORK: string | undefined = process.env.REACT_APP_SOLANANETWORK as string;
console.log("here>>", process.env.REACT_APP_SOLANANETWORK);

const solConnection = new Connection(SOLANA_NETWORK);

export const CustomWalletMultiButton: FC<ButtonProps> = ({ children, ...props }) => {
  const [userNFTInfo, setUserNFTInfo] = useState<any[]>([]);
  const { socket } = useSocket();
  const theme = useTheme();
  const { setVisible } = useWalletModal();
  // const [userName, setUserName] = useState<string>("");
  // const [userPfp, setUserPfp] = useState<string>("");
  // const [inputUserName, setInputUserName] = useState<string>("");
  // const [inputUserPfp, setInputUserPfp] = useState<string>("");

  const {
    userName,
    userPfp,
    inputUserName,
    inputUserPfp,
    setUserName,
    setUserPfp,
    setInputUserName,
    setInputUserPfp,
  } = useGame();

  const { publicKey, wallet, disconnect, connected } = useWallet();
  const walletComp = useWallet();
  const [profileDialogOpen, setProfileDialogOpen] = useState<boolean>(false);
  const [pfpSelectDialogOpen, setPfpSelectDialogOpen] = useState<boolean>(false);
  const fullScreenMd = useMediaQuery(theme.breakpoints.down("xs"));
  const fullScreenLg = useMediaQuery(theme.breakpoints.down("lg"));
  const handleProfileDialogClickOpen = () => {
    setProfileDialogOpen(true);
    setInputUserPfp(userPfp);
    setInputUserName(userName);
  };

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
  };

  const handlePfpSelectDialogOpen = () => {
    setPfpSelectDialogOpen(true);
  };

  const handlePfpSelectDialogClose = () => {
    setPfpSelectDialogOpen(false);
  };

  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (children) return children;
    if (!wallet || !base58) return null;
    return base58.slice(0, 4) + ".." + base58.slice(-4);
  }, [children, wallet, base58]);

  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58);
      setCopied(true);
      setTimeout(() => setCopied(false), 400);
    }
  }, [base58]);

  const openDropdown = useCallback(() => {
    setActive(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setActive(false);
  }, []);

  const openModal = useCallback(() => {
    if (setVisible) {
      setVisible(true);
      closeDropdown();
    }
  }, [setVisible, closeDropdown]);

  const getNFTInfo = async () => {
    var holderAccount: any[] = [];

    if (!walletComp.connected || !walletComp.publicKey) return;
    var address = walletComp.publicKey?.toBase58();
    const nftAccounts = await getParsedNftAccountsByOwner({
      publicAddress: address,
      connection: solConnection,
    });
    await Promise.allSettled(
      nftAccounts.map(async (holder) => {
        try {
          let res = await get_nft_api_rec(holder.data.uri, holder.mint);

          holderAccount.push({
            ...res,
            // nftname: nftAccounts[j].data.name,
            nftname: holder.data.name,
            nfturi: holder.data.uri,
            mint: holder.mint,
          });
        } catch (e) {
          console.log(`   error occured ${e}`);
        }
      })
    );

    console.log(holderAccount);
    setUserNFTInfo(holderAccount);
  };

  async function get_nft_api_rec(url: any, mint: any) {
    try {
      const response = await axios.get(url);
      // console.log(response.data.collection.name + '-' + response.status)
      if (response.status == 200) {
        let ColName = "";
        let collectionName = "";
        let familyName = "";
        if (response.data.collection) {
          if (typeof response.data.collection === "string") {
            collectionName = response.data.collection;
          } else if (response.data.collection.name) {
            collectionName = response.data.collection.name;
          }
          if (response.data.collection.family) {
            familyName = response.data.collection.family;
          }
        }

        if (ColName == "") {
          const colArray = response.data.name.split(" #");
          ColName = colArray["0"];
        }

        const nftArray = response.data.name.split("#");
        let nftName = nftArray["1"] ? nftArray["1"] : response.data.name;

        return {
          mint: mint,
          projectname: ColName ? ColName : "",
          collectionname: collectionName,
          familyname: familyName,
          nftname: nftName,
          image: response.data.image,
          symbol: response.data.symbol,
          url: url,
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchUserProfileData = (address: string) => {
    if (!socket) return;
    socket.emit("getUserProfileData", address, async (userProfile: UserProfile | null) => {
      if (userProfile) {
        if (userProfile.name) {
          setUserName(userProfile.name);
          setInputUserName(userProfile.name);
        }
        if (userProfile.pfp) {
          setUserPfp(userProfile.pfp);
          setInputUserPfp(userProfile.pfp);
        }
      } else {
        // setUserPfp(Default_User_Pfps[0])
        setUserName("");
        setUserPfp(Default_User_Pfps[0]);
        setInputUserPfp(Default_User_Pfps[0]);
        setInputUserName("");
      }
    });
  };

  const savePfpData = () => {
    if (!socket) return;
    if (!walletComp || !walletComp.connected || !walletComp.publicKey) {
      return;
    }

    if (userName == inputUserName && userPfp == inputUserPfp) return;
    socket.emit(
      "saveUserProfileData",
      walletComp.publicKey.toBase58(),
      inputUserName,
      inputUserPfp,
      async (result: boolean) => {
        if (result) {
          successAlert("save successed!");
          setUserName(inputUserName);
          setUserPfp(inputUserPfp);
        } else {
          errorAlert("save failed! try again");
        }
        handleProfileDialogClose();
        handlePfpSelectDialogClose();
      }
    );
  };

  useEffect(() => {
    if (typeof window != undefined || typeof window !== "undefined") {
      if (walletComp.connected && walletComp.publicKey) {
        getNFTInfo();
        fetchUserProfileData(walletComp.publicKey.toBase58());
      }
    }
  }, [walletComp.connected]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const node = ref.current;

      // Do nothing if clicking dropdown or its descendants
      if (!node || node.contains(event.target as Node)) return;

      closeDropdown();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, closeDropdown]);

  if (!wallet) return <WalletModalButton {...props}>{children}</WalletModalButton>;
  if (!base58) return <WalletConnectButton {...props}>{children}</WalletConnectButton>;

  return (
    <div className="wallet-adapter-dropdown">
      <CustomWalletConnectBaseButton
        aria-expanded={active}
        className="wallet-adapter-button-trigger"
        style={{ pointerEvents: active ? "none" : "auto", ...props.style }}
        onClick={openDropdown}
        startIcon={
          connected && userPfp != "" ? (
            <img src={userPfp} className={styles.userPfpIcon} alt="pfp" />
          ) : (
            <UserProfileIcon />
          )
        }
        {...props}
      >
        {connected && userName && userName != ""
          ? userName.length > 10
            ? userName.slice(0, 10) + "..."
            : userName
          : content}
      </CustomWalletConnectBaseButton>
      <ul
        aria-label="dropdown-list"
        className={`wallet-adapter-dropdown-list ${
          active && "wallet-adapter-dropdown-list-active"
        }`}
        ref={ref}
        role="menu"
      >
        <li
          onClick={handleProfileDialogClickOpen}
          className="wallet-adapter-dropdown-list-item"
          role="menuitem"
        >
          Edit Profile
        </li>
        <li onClick={copyAddress} className="wallet-adapter-dropdown-list-item" role="menuitem">
          {copied ? "Copied" : "Copy address"}
        </li>
        <li onClick={openModal} className="wallet-adapter-dropdown-list-item" role="menuitem">
          Change wallet
        </li>
        <li onClick={disconnect} className="wallet-adapter-dropdown-list-item" role="menuitem">
          Disconnect
        </li>
      </ul>

      <Dialog
        fullScreen={fullScreenLg}
        open={profileDialogOpen}
        onClose={handleProfileDialogClose}
        aria-labelledby="pfp-dialog"
        sx={{
          "& .MuiPaper-root": {
            background: "black",
            color: "white",
            border: "3px solid #93FF9E",
            borderRadius: "10px",
            padding: "10px 10px",
            margin: "10px",
          },
        }}
      >
        {/* <DialogTitle id="responsive-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle> */}
        <DialogContent>
          <div className={styles.dialogRow}>
            <p className={styles.label}>change name</p>
            <input
              className={styles.inputUsername}
              type="text"
              value={inputUserName}
              onChange={(e) => setInputUserName(e.target.value)}
            />
          </div>
          <div className={styles.dialogRow}>
            <p className={styles.label}>change pfp</p>
            <img
              className={styles.pfp}
              src={inputUserPfp}
              alt="pfp"
              onClick={handlePfpSelectDialogOpen}
            />
          </div>
          <div className={styles.alignCenter}>
            <button
              onClick={savePfpData}
              className={`${styles.saveBtn} ${
                userName == inputUserName && userPfp == inputUserPfp && styles.disable
              }`}
              disabled={userName == inputUserName && userPfp == inputUserPfp}
            >
              <span className={styles.icon}>
                <SaveIcon />
              </span>
              Save
            </button>
          </div>
        </DialogContent>

        {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
      </Dialog>
      <Dialog
        fullScreen={fullScreenLg}
        open={pfpSelectDialogOpen}
        onClose={handlePfpSelectDialogClose}
        aria-labelledby="pfp-select-dialog"
        sx={{
          "& .MuiPaper-root": {
            background: "black",
            color: "white",
            border: "3px solid #93FF9E",
            borderRadius: "10px",
            padding: "40px 10px",
          },
        }}
      >
        {/* <DialogTitle id="responsive-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle> */}
        <DialogContent>
          <p className={styles.title}>Select NFT PFP</p>
          <div className={styles.pfpImgContainer}>
            {Default_User_Pfps.map((defaultItem, index) => {
              return (
                <div
                  className={styles.pfpImgWrapper}
                  key={index}
                  onClick={() => {
                    setInputUserPfp(defaultItem);
                    handlePfpSelectDialogClose();
                  }}
                >
                  <img
                    className={`${styles.pfpImg} ${
                      defaultItem == inputUserPfp && styles.pfpActive
                    }`}
                    alt="pfp"
                    src={defaultItem}
                  />
                </div>
              );
            })}
            {userNFTInfo.map((nftItem, index) => {
              return (
                <div
                  className={styles.pfpImgWrapper}
                  key={index}
                  onClick={() => {
                    setInputUserPfp(nftItem.image);
                    handlePfpSelectDialogClose();
                  }}
                >
                  <img
                    className={`${styles.pfpImg} ${
                      nftItem.image == inputUserPfp && styles.pfpActive
                    }`}
                    alt="pfp"
                    src={nftItem.image}
                  />
                </div>
              );
            })}
          </div>
        </DialogContent>

        {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
      </Dialog>
    </div>
  );
};
