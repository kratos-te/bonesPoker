"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.userLeaveTournament = exports.enterTournamentOnChain = exports.removeTournamentOnChain = exports.addTournamentOnChain = exports.userLeaveTable = exports.enterTableOnChain = exports.removeTableOnChain = exports.addTableOnChain = exports.updateBackendWallet = exports.updateTreasury = exports.updateAdmin = exports.initProject = exports.getTableDataOnChain = void 0;
var anchor_1 = require("@project-serum/anchor");
var anchor = require("@project-serum/anchor");
var bones_poker_contract_1 = require("./bones_poker_contract");
var types_1 = require("./types");
var script_1 = require("./script");
// const { publicRuntimeConfig } = getConfig();
var SOLANA_NETWORK = process.env.REACT_APP_SOLANANETWORK;
var solConnection = new anchor_1.web3.Connection(SOLANA_NETWORK);
// let solConnection = null;
// let payer = null;
// let program: Program = null;
// let programId = new anchor.web3.PublicKey(PROGRAM_ID);
// export const setClusterConfig = async (cluster: web3.Cluster) => {
//     solConnection = new web3.Connection(web3.clusterApiUrl(cluster));
//     const walletKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(path.resolve(process.env.ANCHOR_WALLET), 'utf-8'))), { skipValidation: true });
//     const wallet = new NodeWallet(walletKeypair);
//     // anchor.setProvider(anchor.AnchorProvider.local(web3.clusterApiUrl(cluster)));
//     // Configure the client to use the local cluster.
//     anchor.setProvider(new anchor.AnchorProvider(solConnection, wallet, { skipPreflight: true, commitment: 'confirmed' }));
//     payer = wallet;
//     console.log("payer path: ", process.env.ANCHOR_WALLET);
//     console.log("payer: ", payer.publicKey.toBase58());
//     // Generate the program client from IDL.
//     program = new anchor.Program(KingKongGameIdl as anchor.Idl, programId);
//     console.log('ProgramId: ', program.programId.toBase58());
//     const [globalAuthority, bump] = await PublicKey.findProgramAddress(
//         [Buffer.from(GLOBAL_AUTHORITY_SEED)],
//         program.programId
//     );
//     console.log('GlobalAuthority: ', globalAuthority.toBase58());
//     // await main();
// }
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.getTableDataOnChain = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cloneWindow, provider, program, tableData, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cloneWindow = window;
                provider = new anchor.AnchorProvider(solConnection, cloneWindow["solana"], anchor.AnchorProvider.defaultOptions());
                program = new anchor.Program(bones_poker_contract_1.IDL, types_1.PROGRAM_ID, provider);
                return [4 /*yield*/, script_1.getTableData(program)];
            case 1:
                tableData = _a.sent();
                return [2 /*return*/, tableData];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.initProject = function (wallet) { return __awaiter(void 0, void 0, void 0, function () {
    var cloneWindow, provider, program, tx, blockhash, signedTx, txId, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (wallet.publicKey === null)
                    return [2 /*return*/];
                cloneWindow = window;
                provider = new anchor.AnchorProvider(solConnection, cloneWindow["solana"], anchor.AnchorProvider.defaultOptions());
                program = new anchor.Program(bones_poker_contract_1.IDL, types_1.PROGRAM_ID, provider);
                return [4 /*yield*/, script_1.createInitializeTx(wallet.publicKey, program)];
            case 1:
                tx = _a.sent();
                return [4 /*yield*/, solConnection.getRecentBlockhash("confirmed")];
            case 2:
                blockhash = (_a.sent()).blockhash;
                tx.feePayer = wallet.publicKey;
                tx.recentBlockhash = blockhash;
                if (!(wallet.signTransaction !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, wallet.signTransaction(tx)];
            case 3:
                signedTx = _a.sent();
                return [4 /*yield*/, provider.connection.sendRawTransaction(signedTx.serialize(), {
                        skipPreflight: true,
                        maxRetries: 3,
                        preflightCommitment: "finalized"
                    })];
            case 4:
                txId = _a.sent();
                return [4 /*yield*/, solConnection.confirmTransaction(txId, "finalized")];
            case 5:
                _a.sent();
                console.log("Your transaction signature", txId);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                e_2 = _a.sent();
                console.log(e_2);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateAdmin = function (wallet, newAdmin) { return __awaiter(void 0, void 0, void 0, function () {
    var cloneWindow, provider, program, tx, blockhash, signedTx, txId, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (wallet.publicKey === null)
                    return [2 /*return*/];
                if (!wallet)
                    return [2 /*return*/];
                cloneWindow = window;
                provider = new anchor.AnchorProvider(solConnection, cloneWindow["solana"], anchor.AnchorProvider.defaultOptions());
                program = new anchor.Program(bones_poker_contract_1.IDL, types_1.PROGRAM_ID, provider);
                return [4 /*yield*/, script_1.createUpdateAdminTx(wallet.publicKey, program, newAdmin)];
            case 1:
                tx = _a.sent();
                return [4 /*yield*/, solConnection.getRecentBlockhash("confirmed")];
            case 2:
                blockhash = (_a.sent()).blockhash;
                tx.feePayer = wallet.publicKey;
                tx.recentBlockhash = blockhash;
                if (!(wallet.signTransaction !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, wallet.signTransaction(tx)];
            case 3:
                signedTx = _a.sent();
                return [4 /*yield*/, provider.connection.sendRawTransaction(signedTx.serialize(), {
                        skipPreflight: true,
                        maxRetries: 3,
                        preflightCommitment: "finalized"
                    })];
            case 4:
                txId = _a.sent();
                return [4 /*yield*/, solConnection.confirmTransaction(txId, "finalized")];
            case 5:
                _a.sent();
                console.log("Your transaction signature", txId);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                e_3 = _a.sent();
                console.log(e_3);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateTreasury = function (wallet, treasury) { return __awaiter(void 0, void 0, void 0, function () {
    var cloneWindow, provider, program, tx, blockhash, signedTx, txId, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (wallet.publicKey === null)
                    return [2 /*return*/];
                cloneWindow = window;
                provider = new anchor.AnchorProvider(solConnection, cloneWindow["solana"], anchor.AnchorProvider.defaultOptions());
                program = new anchor.Program(bones_poker_contract_1.IDL, types_1.PROGRAM_ID, provider);
                return [4 /*yield*/, script_1.createUpdateTreasuryTx(wallet.publicKey, program, treasury)];
            case 1:
                tx = _a.sent();
                return [4 /*yield*/, solConnection.getRecentBlockhash("confirmed")];
            case 2:
                blockhash = (_a.sent()).blockhash;
                tx.feePayer = wallet.publicKey;
                tx.recentBlockhash = blockhash;
                if (!(wallet.signTransaction !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, wallet.signTransaction(tx)];
            case 3:
                signedTx = _a.sent();
                return [4 /*yield*/, provider.connection.sendRawTransaction(signedTx.serialize(), {
                        skipPreflight: true,
                        maxRetries: 3,
                        preflightCommitment: "finalized"
                    })];
            case 4:
                txId = _a.sent();
                return [4 /*yield*/, solConnection.confirmTransaction(txId, "finalized")];
            case 5:
                _a.sent();
                console.log("Your transaction signature", txId);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                e_4 = _a.sent();
                console.log(e_4);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateBackendWallet = function (wallet, newBackend) { return __awaiter(void 0, void 0, void 0, function () {
    var cloneWindow, provider, program, tx, blockhash, signedTx, txId, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (wallet.publicKey === null)
                    return [2 /*return*/];
                cloneWindow = window;
                provider = new anchor.AnchorProvider(solConnection, cloneWindow["solana"], anchor.AnchorProvider.defaultOptions());
                program = new anchor.Program(bones_poker_contract_1.IDL, types_1.PROGRAM_ID, provider);
                return [4 /*yield*/, script_1.createUpdateBackendWalletTx(wallet.publicKey, program, newBackend)];
            case 1:
                tx = _a.sent();
                return [4 /*yield*/, solConnection.getRecentBlockhash("confirmed")];
            case 2:
                blockhash = (_a.sent()).blockhash;
                tx.feePayer = wallet.publicKey;
                tx.recentBlockhash = blockhash;
                if (!(wallet.signTransaction !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, wallet.signTransaction(tx)];
            case 3:
                signedTx = _a.sent();
                return [4 /*yield*/, provider.connection.sendRawTransaction(signedTx.serialize(), {
                        skipPreflight: true,
                        maxRetries: 3,
                        preflightCommitment: "finalized"
                    })];
            case 4:
                txId = _a.sent();
                return [4 /*yield*/, solConnection.confirmTransaction(txId, "finalized")];
            case 5:
                _a.sent();
                console.log("Your transaction signature", txId);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                e_5 = _a.sent();
                console.log(e_5);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.addTableOnChain = function (wallet, stack, buy_in, blinds, max_seats) { return __awaiter(void 0, void 0, void 0, function () {
    var cloneWindow, provider, program, tx, blockhash, signedTx, txId, result, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (!wallet || !wallet.publicKey)
                    return [2 /*return*/, -3];
                cloneWindow = window;
                provider = new anchor.AnchorProvider(solConnection, cloneWindow["solana"], anchor.AnchorProvider.defaultOptions());
                program = new anchor.Program(bones_poker_contract_1.IDL, types_1.PROGRAM_ID, provider);
                return [4 /*yield*/, script_1.createAddTableTx(wallet.publicKey, program, stack, buy_in, blinds, max_seats)];
            case 1:
                tx = _a.sent();
                return [4 /*yield*/, solConnection.getRecentBlockhash("confirmed")];
            case 2:
                blockhash = (_a.sent()).blockhash;
                tx.feePayer = wallet.publicKey;
                tx.recentBlockhash = blockhash;
                if (!(wallet.signTransaction !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, wallet.signTransaction(tx)];
            case 3:
                signedTx = _a.sent();
                return [4 /*yield*/, provider.connection.sendRawTransaction(signedTx.serialize(), {
                        skipPreflight: true,
                        maxRetries: 3,
                        preflightCommitment: "finalized"
                    })];
            case 4:
                txId = _a.sent();
                console.log("txId >> ", txId);
                return [4 /*yield*/, solConnection.confirmTransaction(txId, "finalized")];
            case 5:
                result = _a.sent();
                console.log(result);
                if (!result.value.err) {
                    return [2 /*return*/, 0];
                }
                else {
                    console.log(result.value.err.InstructionError[1].Custom);
                    return [2 /*return*/, -result.value.err.InstructionError[1].Custom];
                }
                console.log("Your transaction signature", txId);
                _a.label = 6;
            case 6: return [2 /*return*/, -2];
            case 7:
                e_6 = _a.sent();
                console.log(e_6);
                return [2 /*return*/, -1];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.removeTableOnChain = function (wallet, stack, buy_in, blinds, max_seats) { return __awaiter(void 0, void 0, void 0, function () {
    var cloneWindow, provider, program, tx, blockhash, signedTx, txId, result, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (!wallet || !wallet.publicKey)
                    return [2 /*return*/, -3];
                cloneWindow = window;
                provider = new anchor.AnchorProvider(solConnection, cloneWindow["solana"], anchor.AnchorProvider.defaultOptions());
                program = new anchor.Program(bones_poker_contract_1.IDL, types_1.PROGRAM_ID, provider);
                return [4 /*yield*/, script_1.createRemoveTableTx(wallet.publicKey, program, stack, buy_in, blinds, max_seats)];
            case 1:
                tx = _a.sent();
                return [4 /*yield*/, solConnection.getRecentBlockhash("confirmed")];
            case 2:
                blockhash = (_a.sent()).blockhash;
                tx.feePayer = wallet.publicKey;
                tx.recentBlockhash = blockhash;
                if (!(wallet.signTransaction !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, wallet.signTransaction(tx)];
            case 3:
                signedTx = _a.sent();
                return [4 /*yield*/, provider.connection.sendRawTransaction(signedTx.serialize(), {
                        skipPreflight: true,
                        maxRetries: 3,
                        preflightCommitment: "finalized"
                    })];
            case 4:
                txId = _a.sent();
                return [4 /*yield*/, solConnection.confirmTransaction(txId, "finalized")];
            case 5:
                result = _a.sent();
                console.log("Your transaction signature", txId);
                console.log(result);
                if (!result.value.err) {
                    return [2 /*return*/, 0];
                }
                else {
                    console.log(result.value.err.InstructionError[1].Custom);
                    return [2 /*return*/, -result.value.err.InstructionError[1].Custom];
                }
                _a.label = 6;
            case 6: return [2 /*return*/, -2];
            case 7:
                e_7 = _a.sent();
                console.log(e_7);
                return [2 /*return*/, -1];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.enterTableOnChain = function (wallet, stack, buy_in, blinds, max_seats) { return __awaiter(void 0, void 0, void 0, function () {
    var cloneWindow, provider, program, tx, blockhash, signedTx, txId, result, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (!wallet || !wallet.publicKey || !wallet.connected)
                    return [2 /*return*/, {
                            result: -3,
                            txId: null
                        }];
                cloneWindow = window;
                provider = new anchor.AnchorProvider(solConnection, cloneWindow["solana"], anchor.AnchorProvider.defaultOptions());
                program = new anchor.Program(bones_poker_contract_1.IDL, types_1.PROGRAM_ID, provider);
                return [4 /*yield*/, script_1.createEnterTableTx(wallet.publicKey, program, stack, buy_in, blinds, max_seats)];
            case 1:
                tx = _a.sent();
                return [4 /*yield*/, solConnection.getRecentBlockhash("confirmed")];
            case 2:
                blockhash = (_a.sent()).blockhash;
                tx.feePayer = wallet.publicKey;
                tx.recentBlockhash = blockhash;
                if (!(wallet.signTransaction !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, wallet.signTransaction(tx)];
            case 3:
                signedTx = _a.sent();
                return [4 /*yield*/, provider.connection.sendRawTransaction(signedTx.serialize(), {
                        skipPreflight: true,
                        maxRetries: 3,
                        preflightCommitment: "finalized"
                    })];
            case 4:
                txId = _a.sent();
                console.log("join tx id >> ", txId);
                return [4 /*yield*/, solConnection.confirmTransaction(txId, "finalized")];
            case 5:
                result = _a.sent();
                console.log("tx result >> ", result);
                if (!result.value.err) {
                    return [2 /*return*/, {
                            result: 0,
                            txId: txId
                        }];
                }
                else {
                    console.log(result.value.err.InstructionError[1].Custom);
                    return [2 /*return*/, {
                            result: -result.value.err.InstructionError[1].Custom,
                            txId: null
                        }];
                }
                console.log("Your transaction signature", txId);
                _a.label = 6;
            case 6: return [2 /*return*/, {
                    result: -2,
                    txId: null
                }];
            case 7:
                e_8 = _a.sent();
                console.log(e_8);
                // if ((e as any).includes("Requested resource not available")) {
                //     return 0;
                // } else {
                //     return -1;
                // }
                return [2 /*return*/, {
                        result: -1,
                        txId: null
                    }];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.userLeaveTable = function (wallet, stack, buy_in, blinds, max_seats, user) { return __awaiter(void 0, void 0, void 0, function () {
    var cloneWindow, provider, program, tx, blockhash, signedTx, txId, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (wallet.publicKey === null)
                    return [2 /*return*/];
                if (!wallet)
                    return [2 /*return*/];
                cloneWindow = window;
                provider = new anchor.AnchorProvider(solConnection, cloneWindow["solana"], anchor.AnchorProvider.defaultOptions());
                program = new anchor.Program(bones_poker_contract_1.IDL, types_1.PROGRAM_ID, provider);
                return [4 /*yield*/, script_1.createUserLeaveTableTx(wallet.publicKey, program, stack, buy_in, blinds, max_seats, user)];
            case 1:
                tx = _a.sent();
                return [4 /*yield*/, solConnection.getRecentBlockhash("confirmed")];
            case 2:
                blockhash = (_a.sent()).blockhash;
                tx.feePayer = wallet.publicKey;
                tx.recentBlockhash = blockhash;
                if (!(wallet.signTransaction !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, wallet.signTransaction(tx)];
            case 3:
                signedTx = _a.sent();
                return [4 /*yield*/, provider.connection.sendRawTransaction(signedTx.serialize(), {
                        skipPreflight: true,
                        maxRetries: 3,
                        preflightCommitment: "finalized"
                    })];
            case 4:
                txId = _a.sent();
                return [4 /*yield*/, solConnection.confirmTransaction(txId, "finalized")];
            case 5:
                _a.sent();
                console.log("Your transaction signature", txId);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                e_9 = _a.sent();
                console.log(e_9);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.addTournamentOnChain = function (wallet, stack, buy_in, blinds, max_seats) { return __awaiter(void 0, void 0, void 0, function () {
    var cloneWindow, provider, program, tx, blockhash, signedTx, txId, result, e_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (!wallet || !wallet.publicKey)
                    return [2 /*return*/, -3];
                cloneWindow = window;
                provider = new anchor.AnchorProvider(solConnection, cloneWindow["solana"], anchor.AnchorProvider.defaultOptions());
                program = new anchor.Program(bones_poker_contract_1.IDL, types_1.PROGRAM_ID, provider);
                return [4 /*yield*/, script_1.createAddTournamentTx(wallet.publicKey, program, stack, buy_in, blinds, max_seats)];
            case 1:
                tx = _a.sent();
                return [4 /*yield*/, solConnection.getLatestBlockhash("confirmed")];
            case 2:
                blockhash = (_a.sent()).blockhash;
                tx.feePayer = wallet.publicKey;
                tx.recentBlockhash = blockhash;
                if (!(wallet.signTransaction !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, wallet.signTransaction(tx)];
            case 3:
                signedTx = _a.sent();
                return [4 /*yield*/, provider.connection.sendRawTransaction(signedTx.serialize(), {
                        skipPreflight: true,
                        maxRetries: 3,
                        preflightCommitment: "finalized"
                    })];
            case 4:
                txId = _a.sent();
                console.log("txId >> ", txId);
                return [4 /*yield*/, solConnection.confirmTransaction(txId, "finalized")];
            case 5:
                result = _a.sent();
                console.log(result);
                if (!result.value.err) {
                    return [2 /*return*/, 0];
                }
                else {
                    console.log(result.value.err.InstructionError[1].Custom);
                    return [2 /*return*/, -result.value.err.InstructionError[1].Custom];
                }
                _a.label = 6;
            case 6: return [2 /*return*/, -2];
            case 7:
                e_10 = _a.sent();
                console.log(e_10);
                return [2 /*return*/, -1];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.removeTournamentOnChain = function (wallet, stack, buy_in, blinds, max_seats) { return __awaiter(void 0, void 0, void 0, function () {
    var cloneWindow, provider, program, tx, blockhash, signedTx, txId, result, e_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (!wallet || !wallet.publicKey)
                    return [2 /*return*/, -3];
                cloneWindow = window;
                provider = new anchor.AnchorProvider(solConnection, cloneWindow["solana"], anchor.AnchorProvider.defaultOptions());
                program = new anchor.Program(bones_poker_contract_1.IDL, types_1.PROGRAM_ID, provider);
                return [4 /*yield*/, script_1.createRemoveTournamentTx(wallet.publicKey, program, stack, buy_in, blinds, max_seats)];
            case 1:
                tx = _a.sent();
                return [4 /*yield*/, solConnection.getLatestBlockhash("confirmed")];
            case 2:
                blockhash = (_a.sent()).blockhash;
                tx.feePayer = wallet.publicKey;
                tx.recentBlockhash = blockhash;
                if (!(wallet.signTransaction !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, wallet.signTransaction(tx)];
            case 3:
                signedTx = _a.sent();
                return [4 /*yield*/, provider.connection.sendRawTransaction(signedTx.serialize(), {
                        skipPreflight: true,
                        maxRetries: 3,
                        preflightCommitment: "finalized"
                    })];
            case 4:
                txId = _a.sent();
                return [4 /*yield*/, solConnection.confirmTransaction(txId, "finalized")];
            case 5:
                result = _a.sent();
                console.log("Your transaction signature", txId);
                console.log(result);
                if (!result.value.err) {
                    return [2 /*return*/, 0];
                }
                else {
                    console.log(result.value.err.InstructionError[1].Custom);
                    return [2 /*return*/, -result.value.err.InstructionError[1].Custom];
                }
                _a.label = 6;
            case 6: return [2 /*return*/, -2];
            case 7:
                e_11 = _a.sent();
                console.log(e_11);
                return [2 /*return*/, -1];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.enterTournamentOnChain = function (wallet, stack, buy_in, blinds, max_seats) { return __awaiter(void 0, void 0, void 0, function () {
    var cloneWindow, provider, program, tx, blockhash, signedTx, txId, result, e_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (!wallet || !wallet.publicKey || !wallet.connected)
                    return [2 /*return*/, {
                            result: -3,
                            txId: null
                        }];
                cloneWindow = window;
                provider = new anchor.AnchorProvider(solConnection, cloneWindow["solana"], anchor.AnchorProvider.defaultOptions());
                program = new anchor.Program(bones_poker_contract_1.IDL, types_1.PROGRAM_ID, provider);
                return [4 /*yield*/, script_1.createEnterTournamentTx(wallet.publicKey, program, stack, buy_in, blinds, max_seats)];
            case 1:
                tx = _a.sent();
                return [4 /*yield*/, solConnection.getRecentBlockhash("confirmed")];
            case 2:
                blockhash = (_a.sent()).blockhash;
                tx.feePayer = wallet.publicKey;
                tx.recentBlockhash = blockhash;
                if (!(wallet.signTransaction !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, wallet.signTransaction(tx)];
            case 3:
                signedTx = _a.sent();
                return [4 /*yield*/, provider.connection.sendRawTransaction(signedTx.serialize(), {
                        skipPreflight: true,
                        maxRetries: 3,
                        preflightCommitment: "finalized"
                    })];
            case 4:
                txId = _a.sent();
                console.log("join tx id >> ", txId);
                return [4 /*yield*/, solConnection.confirmTransaction(txId, "finalized")];
            case 5:
                result = _a.sent();
                console.log("tx result >> ", result);
                if (!result.value.err) {
                    return [2 /*return*/, {
                            result: 0,
                            txId: txId
                        }];
                }
                else {
                    console.log(result.value.err.InstructionError[1].Custom);
                    return [2 /*return*/, {
                            result: -result.value.err.InstructionError[1].Custom,
                            txId: null
                        }];
                }
                console.log("Your transaction signature", txId);
                _a.label = 6;
            case 6: return [2 /*return*/, {
                    result: -2,
                    txId: null
                }];
            case 7:
                e_12 = _a.sent();
                console.log(e_12);
                return [2 /*return*/, {
                        result: -1,
                        txId: null
                    }];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.userLeaveTournament = function (wallet, stack, buy_in, blinds, max_seats, user) { return __awaiter(void 0, void 0, void 0, function () {
    var cloneWindow, provider, program, tx, blockhash, signedTx, txId, e_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (!wallet || !wallet.publicKey)
                    return [2 /*return*/];
                cloneWindow = window;
                provider = new anchor.AnchorProvider(solConnection, cloneWindow["solana"], anchor.AnchorProvider.defaultOptions());
                program = new anchor.Program(bones_poker_contract_1.IDL, types_1.PROGRAM_ID, provider);
                return [4 /*yield*/, script_1.createUserLeaveTournamentTx(wallet.publicKey, program, stack, buy_in, blinds, max_seats, user)];
            case 1:
                tx = _a.sent();
                return [4 /*yield*/, solConnection.getLatestBlockhash("confirmed")];
            case 2:
                blockhash = (_a.sent()).blockhash;
                tx.feePayer = wallet.publicKey;
                tx.recentBlockhash = blockhash;
                if (!(wallet.signTransaction !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, wallet.signTransaction(tx)];
            case 3:
                signedTx = _a.sent();
                return [4 /*yield*/, provider.connection.sendRawTransaction(signedTx.serialize(), {
                        skipPreflight: true,
                        maxRetries: 3,
                        preflightCommitment: "finalized"
                    })];
            case 4:
                txId = _a.sent();
                return [4 /*yield*/, solConnection.confirmTransaction(txId, "finalized")];
            case 5:
                _a.sent();
                console.log("Your transaction signature", txId);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                e_13 = _a.sent();
                console.log(e_13);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
