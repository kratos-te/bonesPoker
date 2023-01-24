import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export const PROGRAM_ID = new PublicKey("7q9ZzDW4o8K4QPoNirc8tfmt72HwAxB4zvf1QnjcsM7E");

export const TREASURY_WALLET = new PublicKey("vbFsWcMNyhp7GeqmBpmTcr5aJ4C8piopvyVSFyHVxVU");
export const BE_ADDRESS = new PublicKey("3wXAk9JUYqbVcXyYtNAgQzHz7m47CzQ6kRPennxpJFtU");
export const ADMIN = new PublicKey("Nu8tPJheGmoe1RnZXTcEs8pPa52CBUNR72DZsqTUd5V");
export const GLOBAL_AUTHORITY_SEED = "global-authority-v1";
export const GAME_POOL_SEED = "game-pool-v2";
export const TOURNAMENT_POOL_SEED = "tournament-pool-v1";
export const ESCROW_VAULT_SEED = "escrow-vault-v1";

export interface GlobalPool {
  // 8 + 128
  superAdmin: PublicKey; // 32
  admin: PublicKey; // 32
  backend: PublicKey; // 32
  treasury: PublicKey; // 32
}

export interface GamePoolOnChain {
  tableCount: anchor.BN; // 8
  stack: anchor.BN[]; // 8*10
  buyIn: anchor.BN[]; // 8*10
  blinds: anchor.BN[]; // 8*10
  maxSeats: number[]; // 1*10
}

export interface GamePool {
  tableCount: number; // 8
  stack: number[]; // 8*10
  buyIn: number[]; // 8*10
  blinds: number[]; // 8*10
  maxSeats: number[]; // 1*10
}
