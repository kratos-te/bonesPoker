"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

exports.__esModule = true;
exports.CustomWalletMultiButton = exports.Default_User_Pfps = void 0;

var react_1 = require("react");

var Button_1 = require("./Button");

var wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");

var wallet_adapter_react_ui_2 = require("@solana/wallet-adapter-react-ui");

var wallet_adapter_react_1 = require("@solana/wallet-adapter-react");

var Dialog_1 = require("@mui/material/Dialog");

var DialogContent_1 = require("@mui/material/DialogContent");

var useMediaQuery_1 = require("@mui/material/useMediaQuery");

var styles_1 = require("@mui/material/styles");

var web3_js_1 = require("@solana/web3.js"); // import * as from "./CustomWalletMultiButton.module.css";


var sol_rayz_1 = require("@nfteyez/sol-rayz");

var axios_1 = require("axios");

var SocketProvider_1 = require("../../context/SocketProvider");

var svgIcons_1 = require("../svgIcons");

var toastGroup_1 = require("../../components/toastGroup");

exports.Default_User_Pfps = ["/img/avatars/1.png"];

var styles = require("./CustomWalletMultiButton.module.css"); // const { publicRuntimeConfig } = getConfig();
// const SOLANA_NETWORK = publicRuntimeConfig.SOLANA_NETWORK;


var SOLANA_NETWORK = process.env.REACT_APP_SOLANANETWORK;
console.log("here>>", process.env.REACT_APP_SOLANANETWORK);
var solConnection = new web3_js_1.Connection(SOLANA_NETWORK);

exports.CustomWalletMultiButton = function (_a) {
  var children = _a.children,
      props = __rest(_a, ["children"]);

  var _b = react_1.useState([]),
      userNFTInfo = _b[0],
      setUserNFTInfo = _b[1];

  var socket = SocketProvider_1.useSocket().socket;
  var theme = styles_1.useTheme();
  var setVisible = wallet_adapter_react_ui_1.useWalletModal().setVisible;

  var _c = react_1.useState(""),
      userName = _c[0],
      setUserName = _c[1];

  var _d = react_1.useState(""),
      userPfp = _d[0],
      setUserPfp = _d[1];

  var _e = react_1.useState(""),
      inputUserName = _e[0],
      setInputUserName = _e[1];

  var _f = react_1.useState(""),
      inputUserPfp = _f[0],
      setInputUserPfp = _f[1];

  var _g = wallet_adapter_react_1.useWallet(),
      publicKey = _g.publicKey,
      wallet = _g.wallet,
      disconnect = _g.disconnect,
      connected = _g.connected;

  var walletComp = wallet_adapter_react_1.useWallet();

  var _h = react_1.useState(false),
      profileDialogOpen = _h[0],
      setProfileDialogOpen = _h[1];

  var _j = react_1.useState(false),
      pfpSelectDialogOpen = _j[0],
      setPfpSelectDialogOpen = _j[1];

  var fullScreenMd = useMediaQuery_1["default"](theme.breakpoints.down("xs"));
  var fullScreenLg = useMediaQuery_1["default"](theme.breakpoints.down("lg"));

  var handleProfileDialogClickOpen = function handleProfileDialogClickOpen() {
    setProfileDialogOpen(true);
    setInputUserPfp(userPfp);
    setInputUserName(userName);
  };

  var handleProfileDialogClose = function handleProfileDialogClose() {
    setProfileDialogOpen(false);
  };

  var handlePfpSelectDialogOpen = function handlePfpSelectDialogOpen() {
    setPfpSelectDialogOpen(true);
  };

  var handlePfpSelectDialogClose = function handlePfpSelectDialogClose() {
    setPfpSelectDialogOpen(false);
  };

  var _k = react_1.useState(false),
      copied = _k[0],
      setCopied = _k[1];

  var _l = react_1.useState(false),
      active = _l[0],
      setActive = _l[1];

  var ref = react_1.useRef(null);
  var base58 = react_1.useMemo(function () {
    return publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58();
  }, [publicKey]);
  var content = react_1.useMemo(function () {
    if (children) return children;
    if (!wallet || !base58) return null;
    return base58.slice(0, 4) + ".." + base58.slice(-4);
  }, [children, wallet, base58]);
  var copyAddress = react_1.useCallback(function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!base58) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , navigator.clipboard.writeText(base58)];

          case 1:
            _a.sent();

            setCopied(true);
            setTimeout(function () {
              return setCopied(false);
            }, 400);
            _a.label = 2;

          case 2:
            return [2
            /*return*/
            ];
        }
      });
    });
  }, [base58]);
  var openDropdown = react_1.useCallback(function () {
    setActive(true);
  }, []);
  var closeDropdown = react_1.useCallback(function () {
    setActive(false);
  }, []);
  var openModal = react_1.useCallback(function () {
    if (setVisible) {
      setVisible(true);
      closeDropdown();
    }
  }, [setVisible, closeDropdown]);

  var getNFTInfo = function getNFTInfo() {
    return __awaiter(void 0, void 0, void 0, function () {
      var holderAccount, address, nftAccounts;

      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            holderAccount = [];
            if (!walletComp.connected || !walletComp.publicKey) return [2
            /*return*/
            ];
            address = (_a = walletComp.publicKey) === null || _a === void 0 ? void 0 : _a.toBase58();
            return [4
            /*yield*/
            , sol_rayz_1.getParsedNftAccountsByOwner({
              publicAddress: address,
              connection: solConnection
            })];

          case 1:
            nftAccounts = _b.sent();
            return [4
            /*yield*/
            , Promise.allSettled(nftAccounts.map(function (holder) {
              return __awaiter(void 0, void 0, void 0, function () {
                var res, e_1;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      _a.trys.push([0, 2,, 3]);

                      return [4
                      /*yield*/
                      , get_nft_api_rec(holder.data.uri, holder.mint)];

                    case 1:
                      res = _a.sent();
                      holderAccount.push(__assign(__assign({}, res), {
                        // nftname: nftAccounts[j].data.name,
                        nftname: holder.data.name,
                        nfturi: holder.data.uri,
                        mint: holder.mint
                      }));
                      return [3
                      /*break*/
                      , 3];

                    case 2:
                      e_1 = _a.sent();
                      console.log("   error occured " + e_1);
                      return [3
                      /*break*/
                      , 3];

                    case 3:
                      return [2
                      /*return*/
                      ];
                  }
                });
              });
            }))];

          case 2:
            _b.sent();

            console.log(holderAccount);
            setUserNFTInfo(holderAccount);
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  function get_nft_api_rec(url, mint) {
    return __awaiter(this, void 0, void 0, function () {
      var response, ColName, collectionName, familyName, colArray, nftArray, nftName, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);

            return [4
            /*yield*/
            , axios_1["default"].get(url)];

          case 1:
            response = _a.sent(); // console.log(response.data.collection.name + '-' + response.status)

            if (response.status == 200) {
              ColName = "";
              collectionName = "";
              familyName = "";

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
                colArray = response.data.name.split(" #");
                ColName = colArray["0"];
              }

              nftArray = response.data.name.split("#");
              nftName = nftArray["1"] ? nftArray["1"] : response.data.name;
              return [2
              /*return*/
              , {
                mint: mint,
                projectname: ColName ? ColName : "",
                collectionname: collectionName,
                familyname: familyName,
                nftname: nftName,
                image: response.data.image,
                symbol: response.data.symbol,
                url: url
              }];
            }

            return [3
            /*break*/
            , 3];

          case 2:
            error_1 = _a.sent();
            console.error(error_1);
            return [3
            /*break*/
            , 3];

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  }

  var fetchUserProfileData = function fetchUserProfileData(address) {
    if (!socket) return;
    socket.emit("getUserProfileData", address, function (userProfile) {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
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
            setUserPfp(exports.Default_User_Pfps[0]);
            setInputUserPfp(exports.Default_User_Pfps[0]);
            setInputUserName("");
          }

          return [2
          /*return*/
          ];
        });
      });
    });
  };

  var savePfpData = function savePfpData() {
    if (!socket) return;

    if (!walletComp || !walletComp.connected || !walletComp.publicKey) {
      return;
    }

    if (userName == inputUserName && userPfp == inputUserPfp) return;
    socket.emit("saveUserProfileData", walletComp.publicKey.toBase58(), inputUserName, inputUserPfp, function (result) {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          if (result) {
            toastGroup_1.successAlert("save successed!");
            setUserName(inputUserName);
            setUserPfp(inputUserPfp);
          } else {
            toastGroup_1.errorAlert("save failed! try again");
          }

          handleProfileDialogClose();
          handlePfpSelectDialogClose();
          return [2
          /*return*/
          ];
        });
      });
    });
  };

  react_1.useEffect(function () {
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) != undefined || typeof window !== "undefined") {
      if (walletComp.connected && walletComp.publicKey) {
        getNFTInfo();
        fetchUserProfileData(walletComp.publicKey.toBase58());
      }
    }
  }, [walletComp.connected]);
  react_1.useEffect(function () {
    var listener = function listener(event) {
      var node = ref.current; // Do nothing if clicking dropdown or its descendants

      if (!node || node.contains(event.target)) return;
      closeDropdown();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return function () {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, closeDropdown]);
  if (!wallet) return React.createElement(wallet_adapter_react_ui_2.WalletModalButton, __assign({}, props), children);
  if (!base58) return React.createElement(wallet_adapter_react_ui_1.WalletConnectButton, __assign({}, props), children);
  return React.createElement("div", {
    className: "wallet-adapter-dropdown"
  }, React.createElement(Button_1.Button, __assign({
    "aria-expanded": active,
    className: "wallet-adapter-button-trigger",
    style: __assign({
      pointerEvents: active ? "none" : "auto"
    }, props.style),
    onClick: openDropdown,
    startIcon: connected && userPfp != "" ? React.createElement("img", {
      src: userPfp,
      className: styles.userPfpIcon,
      alt: "pfp"
    }) : React.createElement(svgIcons_1.userProfile, null)
  }, props), connected && userName && userName != "" ? userName.length > 10 ? userName.slice(0, 10) + "..." : userName : content), React.createElement("ul", {
    "aria-label": "dropdown-list",
    className: "wallet-adapter-dropdown-list " + (active && "wallet-adapter-dropdown-list-active"),
    ref: ref,
    role: "menu"
  }, React.createElement("li", {
    onClick: handleProfileDialogClickOpen,
    className: "wallet-adapter-dropdown-list-item",
    role: "menuitem"
  }, "Edit Profile"), React.createElement("li", {
    onClick: copyAddress,
    className: "wallet-adapter-dropdown-list-item",
    role: "menuitem"
  }, copied ? "Copied" : "Copy address"), React.createElement("li", {
    onClick: openModal,
    className: "wallet-adapter-dropdown-list-item",
    role: "menuitem"
  }, "Change wallet"), React.createElement("li", {
    onClick: disconnect,
    className: "wallet-adapter-dropdown-list-item",
    role: "menuitem"
  }, "Disconnect")), React.createElement(Dialog_1["default"], {
    fullScreen: fullScreenMd,
    open: profileDialogOpen,
    onClose: handleProfileDialogClose,
    "aria-labelledby": "pfp-dialog",
    sx: {
      "& .MuiPaper-root": {
        background: "black",
        color: "white",
        border: "3px solid #93FF9E",
        borderRadius: "10px",
        padding: "10px 10px",
        margin: "10px"
      }
    }
  }, React.createElement(DialogContent_1["default"], null, React.createElement("div", {
    className: styles.dialogRow
  }, React.createElement("p", {
    className: styles.label
  }, "change name"), React.createElement("input", {
    className: styles.inputUsername,
    type: "text",
    value: inputUserName,
    onChange: function onChange(e) {
      return setInputUserName(e.target.value);
    }
  })), React.createElement("div", {
    className: styles.dialogRow
  }, React.createElement("p", {
    className: styles.label
  }, "change pfp"), React.createElement("img", {
    className: styles.pfp,
    src: inputUserPfp,
    alt: "pfp",
    onClick: handlePfpSelectDialogOpen
  })), React.createElement("div", {
    className: styles.alignCenter
  }, React.createElement("button", {
    onClick: savePfpData,
    className: styles.saveBtn + " " + (userName == inputUserName && userPfp == inputUserPfp && styles.disable),
    disabled: userName == inputUserName && userPfp == inputUserPfp
  }, React.createElement("span", {
    className: styles.icon
  }, React.createElement(svgIcons_1.save, null)), "Save")))), React.createElement(Dialog_1["default"], {
    fullScreen: fullScreenLg,
    open: pfpSelectDialogOpen,
    onClose: handlePfpSelectDialogClose,
    "aria-labelledby": "pfp-select-dialog",
    sx: {
      "& .MuiPaper-root": {
        background: "black",
        color: "white",
        border: "3px solid #93FF9E",
        borderRadius: "10px",
        padding: "40px 10px"
      }
    }
  }, React.createElement(DialogContent_1["default"], null, React.createElement("p", {
    className: styles.title
  }, "Select NFT PFP"), React.createElement("div", {
    className: styles.pfpImgContainer
  }, exports.Default_User_Pfps.map(function (defaultItem, index) {
    return React.createElement("div", {
      className: styles.pfpImgWrapper,
      key: index,
      onClick: function onClick() {
        setInputUserPfp(defaultItem);
        handlePfpSelectDialogClose();
      }
    }, React.createElement("img", {
      className: styles.pfpImg + " " + (defaultItem == inputUserPfp && styles.pfpActive),
      alt: "pfp",
      src: defaultItem
    }));
  }), userNFTInfo.map(function (nftItem, index) {
    return React.createElement("div", {
      className: styles.pfpImgWrapper,
      key: index,
      onClick: function onClick() {
        setInputUserPfp(nftItem.image);
        handlePfpSelectDialogClose();
      }
    }, React.createElement("img", {
      className: styles.pfpImg + " " + (nftItem.image == inputUserPfp && styles.pfpActive),
      alt: "pfp",
      src: nftItem.image
    }));
  })))));
};