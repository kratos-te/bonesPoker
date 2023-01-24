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
exports.createUserLeaveTournamentTx = exports.createEnterTournamentTx = exports.createRemoveTournamentTx = exports.createAddTournamentTx = exports.createSendRewardTx = exports.createUserLeaveTableTx = exports.createEnterTableTx = exports.createRemoveTableTx = exports.createAddTableTx = exports.createUpdateBackendWalletTx = exports.createUpdateTreasuryTx = exports.createUpdateAdminTx = exports.createInitializeTx = exports.getTableData = void 0;
var anchor = require("@project-serum/anchor");
var web3_js_1 = require("@solana/web3.js");
var types_1 = require("./types");
exports.getTableData = function (program) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, globalAuthority, global_bump, _b, gamePool, game_bump, tableData, tableCount, buyIn, blinds, stack, i, result, e_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GLOBAL_AUTHORITY_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _c.sent(), globalAuthority = _a[0], global_bump = _a[1];
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GAME_POOL_SEED)], types_1.PROGRAM_ID)];
            case 2:
                _b = _c.sent(), gamePool = _b[0], game_bump = _b[1];
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, program.account.gamePool.fetch(gamePool)];
            case 4:
                tableData = (_c.sent());
                tableCount = tableData.tableCount.toNumber();
                buyIn = [];
                blinds = [];
                stack = [];
                for (i = 0; i < 10; i++) {
                    buyIn.push(tableData.buyIn[i].toNumber());
                    blinds.push(tableData.blinds[i].toNumber());
                    stack.push(tableData.stack[i].toNumber());
                }
                result = {
                    buyIn: buyIn,
                    blinds: blinds,
                    stack: stack,
                    maxSeats: tableData.maxSeats,
                    tableCount: tableCount
                };
                console.log(result);
                return [2 /*return*/, result];
            case 5:
                e_1 = _c.sent();
                console.log(e_1);
                return [2 /*return*/, null];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createInitializeTx = function (admin, program) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, globalAuthority, global_bump, _b, escrowVault, escrow_bump, tx;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GLOBAL_AUTHORITY_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _c.sent(), globalAuthority = _a[0], global_bump = _a[1];
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.ESCROW_VAULT_SEED)], types_1.PROGRAM_ID)];
            case 2:
                _b = _c.sent(), escrowVault = _b[0], escrow_bump = _b[1];
                tx = new web3_js_1.Transaction();
                console.log("==>initializing program", globalAuthority.toBase58(), admin.toBase58());
                tx.add(program.instruction.initialize(global_bump, escrow_bump, {
                    accounts: {
                        admin: admin,
                        globalAuthority: globalAuthority,
                        escrowVault: escrowVault,
                        systemProgram: web3_js_1.SystemProgram.programId,
                        rent: web3_js_1.SYSVAR_RENT_PUBKEY
                    },
                    instructions: [],
                    signers: []
                }));
                return [2 /*return*/, tx];
        }
    });
}); };
exports.createUpdateAdminTx = function (admin, program, newAdmin) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, globalAuthority, global_bump, tx;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GLOBAL_AUTHORITY_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _b.sent(), globalAuthority = _a[0], global_bump = _a[1];
                tx = new web3_js_1.Transaction();
                console.log("==>initializing program", globalAuthority.toBase58(), admin.toBase58());
                tx.add(program.instruction.updateAdmin(global_bump, newAdmin, {
                    accounts: {
                        admin: admin,
                        globalAuthority: globalAuthority
                    },
                    instructions: [],
                    signers: []
                }));
                return [2 /*return*/, tx];
        }
    });
}); };
exports.createUpdateTreasuryTx = function (admin, program, newTreasury) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, globalAuthority, global_bump, tx;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GLOBAL_AUTHORITY_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _b.sent(), globalAuthority = _a[0], global_bump = _a[1];
                tx = new web3_js_1.Transaction();
                console.log("==>initializing program", globalAuthority.toBase58(), admin.toBase58());
                tx.add(program.instruction.updateTreasury(global_bump, newTreasury, {
                    accounts: {
                        admin: admin,
                        globalAuthority: globalAuthority
                    },
                    instructions: [],
                    signers: []
                }));
                return [2 /*return*/, tx];
        }
    });
}); };
exports.createUpdateBackendWalletTx = function (admin, program, backend_wallet) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, globalAuthority, global_bump, tx;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GLOBAL_AUTHORITY_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _b.sent(), globalAuthority = _a[0], global_bump = _a[1];
                tx = new web3_js_1.Transaction();
                console.log("==>initializing program", globalAuthority.toBase58(), admin.toBase58());
                tx.add(program.instruction.updateBackend(global_bump, backend_wallet, {
                    accounts: {
                        admin: admin,
                        globalAuthority: globalAuthority
                    },
                    instructions: [],
                    signers: []
                }));
                return [2 /*return*/, tx];
        }
    });
}); };
exports.createAddTableTx = function (admin, program, stack, buy_in, blinds, max_seats) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, globalAuthority, global_bump, _b, gamePool, game_bump, tx;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GLOBAL_AUTHORITY_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _c.sent(), globalAuthority = _a[0], global_bump = _a[1];
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GAME_POOL_SEED)], types_1.PROGRAM_ID)];
            case 2:
                _b = _c.sent(), gamePool = _b[0], game_bump = _b[1];
                tx = new web3_js_1.Transaction();
                console.log("==>initializing program", globalAuthority.toBase58(), admin.toBase58());
                tx.add(program.instruction.addTable(global_bump, game_bump, new anchor.BN(stack), new anchor.BN(buy_in), new anchor.BN(blinds), new anchor.BN(max_seats), {
                    accounts: {
                        admin: admin,
                        globalAuthority: globalAuthority,
                        gamePool: gamePool,
                        systemProgram: web3_js_1.SystemProgram.programId,
                        rent: web3_js_1.SYSVAR_RENT_PUBKEY
                    },
                    instructions: [],
                    signers: []
                }));
                return [2 /*return*/, tx];
        }
    });
}); };
exports.createRemoveTableTx = function (admin, program, stack, buy_in, blinds, max_seats) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, globalAuthority, global_bump, _b, gamePool, game_bump, tx;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GLOBAL_AUTHORITY_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _c.sent(), globalAuthority = _a[0], global_bump = _a[1];
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GAME_POOL_SEED)], types_1.PROGRAM_ID)];
            case 2:
                _b = _c.sent(), gamePool = _b[0], game_bump = _b[1];
                tx = new web3_js_1.Transaction();
                console.log("==>initializing program", globalAuthority.toBase58(), admin.toBase58());
                tx.add(program.instruction.removeTable(global_bump, game_bump, new anchor.BN(stack), new anchor.BN(buy_in), new anchor.BN(blinds), new anchor.BN(max_seats), {
                    accounts: {
                        admin: admin,
                        globalAuthority: globalAuthority,
                        gamePool: gamePool
                    },
                    instructions: [],
                    signers: []
                }));
                return [2 /*return*/, tx];
        }
    });
}); };
exports.createEnterTableTx = function (player, program, stack, buy_in, blinds, max_seats) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, escrowVault, escrow_bump, _b, gamePool, game_bump, tx;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.ESCROW_VAULT_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _c.sent(), escrowVault = _a[0], escrow_bump = _a[1];
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GAME_POOL_SEED)], types_1.PROGRAM_ID)];
            case 2:
                _b = _c.sent(), gamePool = _b[0], game_bump = _b[1];
                tx = new web3_js_1.Transaction();
                tx.add(program.instruction.enterTable(escrow_bump, game_bump, new anchor.BN(stack), new anchor.BN(buy_in), new anchor.BN(blinds), new anchor.BN(max_seats), {
                    accounts: {
                        player: player,
                        escrowVault: escrowVault,
                        gamePool: gamePool,
                        systemProgram: web3_js_1.SystemProgram.programId
                    },
                    instructions: [],
                    signers: []
                }));
                return [2 /*return*/, tx];
        }
    });
}); };
exports.createUserLeaveTableTx = function (admin, program, stack, buy_in, blinds, max_seats, user) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, globalAuthority, global_bump, _b, escrowVault, escrow_bump, _c, gamePool, game_bump, tx;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GLOBAL_AUTHORITY_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _d.sent(), globalAuthority = _a[0], global_bump = _a[1];
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.ESCROW_VAULT_SEED)], types_1.PROGRAM_ID)];
            case 2:
                _b = _d.sent(), escrowVault = _b[0], escrow_bump = _b[1];
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GAME_POOL_SEED)], types_1.PROGRAM_ID)];
            case 3:
                _c = _d.sent(), gamePool = _c[0], game_bump = _c[1];
                tx = new web3_js_1.Transaction();
                tx.add(program.instruction.userLeaveTable(global_bump, escrow_bump, game_bump, new anchor.BN(stack), new anchor.BN(buy_in), new anchor.BN(blinds), new anchor.BN(max_seats), {
                    accounts: {
                        owner: admin,
                        globalAuthority: globalAuthority,
                        escrowVault: escrowVault,
                        gamePool: gamePool,
                        user: user,
                        systemProgram: web3_js_1.SystemProgram.programId
                    },
                    instructions: [],
                    signers: []
                }));
                return [2 /*return*/, tx];
        }
    });
}); };
exports.createSendRewardTx = function (owner, program, winner, totalWinnedVault, leaveVault) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, globalAuthority, global_bump, _b, escrowVault, escrow_bump, tx;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GLOBAL_AUTHORITY_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _c.sent(), globalAuthority = _a[0], global_bump = _a[1];
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.ESCROW_VAULT_SEED)], types_1.PROGRAM_ID)];
            case 2:
                _b = _c.sent(), escrowVault = _b[0], escrow_bump = _b[1];
                tx = new web3_js_1.Transaction();
                tx.add(program.instruction.sendReward(global_bump, escrow_bump, new anchor.BN(totalWinnedVault), new anchor.BN(leaveVault), {
                    accounts: {
                        owner: owner,
                        globalAuthority: globalAuthority,
                        escrowVault: escrowVault,
                        treasury: types_1.TREASURY_WALLET,
                        winner: winner,
                        systemProgram: web3_js_1.SystemProgram.programId
                    },
                    instructions: [],
                    signers: []
                }));
                return [2 /*return*/, tx];
        }
    });
}); };
exports.createAddTournamentTx = function (admin, program, stack, buy_in, blinds, max_seats) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, globalAuthority, global_bump, _b, tournamentPool, tournament_bump, tx;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GLOBAL_AUTHORITY_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _c.sent(), globalAuthority = _a[0], global_bump = _a[1];
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.TOURNAMENT_POOL_SEED)], types_1.PROGRAM_ID)];
            case 2:
                _b = _c.sent(), tournamentPool = _b[0], tournament_bump = _b[1];
                tx = new web3_js_1.Transaction();
                console.log("==>initializing program", globalAuthority.toBase58(), admin.toBase58());
                tx.add(program.instruction.addTournament(global_bump, tournament_bump, new anchor.BN(stack), new anchor.BN(buy_in), new anchor.BN(blinds), new anchor.BN(max_seats), {
                    accounts: {
                        admin: admin,
                        globalAuthority: globalAuthority,
                        tournamentPool: tournamentPool,
                        systemProgram: web3_js_1.SystemProgram.programId,
                        rent: web3_js_1.SYSVAR_RENT_PUBKEY
                    },
                    instructions: [],
                    signers: []
                }));
                return [2 /*return*/, tx];
        }
    });
}); };
exports.createRemoveTournamentTx = function (admin, program, stack, buy_in, blinds, max_seats) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, globalAuthority, global_bump, _b, tournamentPool, tournament_bump, tx;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GLOBAL_AUTHORITY_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _c.sent(), globalAuthority = _a[0], global_bump = _a[1];
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.TOURNAMENT_POOL_SEED)], types_1.PROGRAM_ID)];
            case 2:
                _b = _c.sent(), tournamentPool = _b[0], tournament_bump = _b[1];
                tx = new web3_js_1.Transaction();
                console.log("==>initializing program", globalAuthority.toBase58(), admin.toBase58());
                tx.add(program.instruction.removeTournament(global_bump, tournament_bump, new anchor.BN(stack), new anchor.BN(buy_in), new anchor.BN(blinds), new anchor.BN(max_seats), {
                    accounts: {
                        admin: admin,
                        globalAuthority: globalAuthority,
                        tournamentPool: tournamentPool
                    },
                    instructions: [],
                    signers: []
                }));
                return [2 /*return*/, tx];
        }
    });
}); };
exports.createEnterTournamentTx = function (player, program, stack, buy_in, blinds, max_seats) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, escrowVault, escrow_bump, _b, tournamentPool, tournament_bump, tx;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.ESCROW_VAULT_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _c.sent(), escrowVault = _a[0], escrow_bump = _a[1];
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.TOURNAMENT_POOL_SEED)], types_1.PROGRAM_ID)];
            case 2:
                _b = _c.sent(), tournamentPool = _b[0], tournament_bump = _b[1];
                tx = new web3_js_1.Transaction();
                tx.add(program.instruction.enterTournament(escrow_bump, tournament_bump, new anchor.BN(stack), new anchor.BN(buy_in), new anchor.BN(blinds), new anchor.BN(max_seats), {
                    accounts: {
                        player: player,
                        escrowVault: escrowVault,
                        tournamentPool: tournamentPool,
                        systemProgram: web3_js_1.SystemProgram.programId
                    },
                    instructions: [],
                    signers: []
                }));
                return [2 /*return*/, tx];
        }
    });
}); };
exports.createUserLeaveTournamentTx = function (admin, program, stack, buy_in, blinds, max_seats, user) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, globalAuthority, global_bump, _b, escrowVault, escrow_bump, _c, tournamentPool, tournament_bump, tx;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GLOBAL_AUTHORITY_SEED)], types_1.PROGRAM_ID)];
            case 1:
                _a = _d.sent(), globalAuthority = _a[0], global_bump = _a[1];
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.ESCROW_VAULT_SEED)], types_1.PROGRAM_ID)];
            case 2:
                _b = _d.sent(), escrowVault = _b[0], escrow_bump = _b[1];
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(types_1.GAME_POOL_SEED)], types_1.PROGRAM_ID)];
            case 3:
                _c = _d.sent(), tournamentPool = _c[0], tournament_bump = _c[1];
                tx = new web3_js_1.Transaction();
                tx.add(program.instruction.userLeaveTournament(global_bump, escrow_bump, tournament_bump, new anchor.BN(stack), new anchor.BN(buy_in), new anchor.BN(blinds), new anchor.BN(max_seats), {
                    accounts: {
                        owner: admin,
                        globalAuthority: globalAuthority,
                        escrowVault: escrowVault,
                        tournamentPool: tournamentPool,
                        user: user,
                        systemProgram: web3_js_1.SystemProgram.programId
                    },
                    instructions: [],
                    signers: []
                }));
                return [2 /*return*/, tx];
        }
    });
}); };
