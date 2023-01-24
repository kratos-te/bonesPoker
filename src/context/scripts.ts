import { Program, web3 } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";

import { IDL } from "./bones_poker_contract";
import { PublicKey, Keypair } from "@solana/web3.js";
import { GLOBAL_AUTHORITY_SEED, PROGRAM_ID } from "./types";
import {
  createAddTableTx,
  createAddTournamentTx,
  createEnterTableTx,
  createEnterTournamentTx,
  createInitializeTx,
  createRemoveTableTx,
  createRemoveTournamentTx,
  createSendRewardTx,
  createUpdateAdminTx,
  createUpdateBackendWalletTx,
  createUpdateTreasuryTx,
  createUserLeaveTableTx,
  createUserLeaveTournamentTx,
  getTableData,
} from "./script";
import getConfig from "next/config";
import { WalletContextState } from "@solana/wallet-adapter-react";

// const { publicRuntimeConfig } = getConfig();
const SOLANA_NETWORK = process.env.REACT_APP_SOLANANETWORK;

let solConnection = new web3.Connection(SOLANA_NETWORK);

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

const main = async () => {
  // setClusterConfig('devnet');
  // await initProject();
  // await updateAdmin(new PublicKey("6tszx7eZ2hBFQBKqx8emdWmSZc9SLQKubRKfvfgdgdnK"));
  // await updateTreasury(new PublicKey("G42V1DfQKKHrxxfdjDrRphPStZx5Jqu2JwShfN3WoKmK"));
  // await updateBackendWallet(new PublicKey("3wXAk9JUYqbVcXyYtNAgQzHz7m47CzQ6kRPennxpJFtU"));
  // await addTable(100, 100000000, 10, 8);
  // await RemoveTable(100, 100000000, 10, 10);
  // await enterTable(100, 100000000, 10, 8);
  // await userLeaveTable(100, 100000000, 10, 8, new PublicKey("3wXAk9JUYqbVcXyYtNAgQzHz7m47CzQ6kRPennxpJFtU"))
};

export const getTableDataOnChain = async () => {
  try {
    let cloneWindow: any = window;

    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
    let tableData = await getTableData(program);
    return tableData;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const initProject = async (wallet: WalletContextState) => {
  try {
    if (wallet.publicKey === null) return;

    let cloneWindow: any = window;

    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

    const tx = await createInitializeTx(wallet.publicKey, program);
    const { blockhash } = await solConnection.getRecentBlockhash("confirmed");
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = blockhash;

    if (wallet.signTransaction !== undefined) {
      // const signedTransactions = await wallet.signAllTransactions([tx]);
      let signedTx = await wallet.signTransaction(tx);
      let txId = await provider.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
        preflightCommitment: "finalized",
      });

      await solConnection.confirmTransaction(txId, "finalized");

      console.log("Your transaction signature", txId);
    }

    // wallet.signTransaction(tx);
    // let txId = await solConnection.sendTransaction(tx, [(payer as NodeWallet).payer]);
    // await solConnection.confirmTransaction(txId, "confirmed");
  } catch (e) {
    console.log(e);
  }
};

export const updateAdmin = async (wallet: WalletContextState, newAdmin: PublicKey) => {
  try {
    if (wallet.publicKey === null) return;
    if (!wallet) return;
    let cloneWindow: any = window;

    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

    const tx = await createUpdateAdminTx(wallet.publicKey, program, newAdmin);

    const { blockhash } = await solConnection.getRecentBlockhash("confirmed");
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction !== undefined) {
      // const signedTransactions = await wallet.signAllTransactions([tx]);
      let signedTx = await wallet.signTransaction(tx);
      let txId = await provider.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
        preflightCommitment: "finalized",
      });

      await solConnection.confirmTransaction(txId, "finalized");

      console.log("Your transaction signature", txId);
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateTreasury = async (wallet: WalletContextState, treasury: PublicKey) => {
  try {
    if (wallet.publicKey === null) return;

    let cloneWindow: any = window;

    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

    const tx = await createUpdateTreasuryTx(wallet.publicKey, program, treasury);
    const { blockhash } = await solConnection.getRecentBlockhash("confirmed");
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = blockhash;

    if (wallet.signTransaction !== undefined) {
      // const signedTransactions = await wallet.signAllTransactions([tx]);
      let signedTx = await wallet.signTransaction(tx);
      let txId = await provider.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
        preflightCommitment: "finalized",
      });

      await solConnection.confirmTransaction(txId, "finalized");

      console.log("Your transaction signature", txId);
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateBackendWallet = async (wallet: WalletContextState, newBackend: PublicKey) => {
  try {
    if (wallet.publicKey === null) return;

    let cloneWindow: any = window;

    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

    const tx = await createUpdateBackendWalletTx(wallet.publicKey, program, newBackend);
    const { blockhash } = await solConnection.getRecentBlockhash("confirmed");
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction !== undefined) {
      // const signedTransactions = await wallet.signAllTransactions([tx]);
      let signedTx = await wallet.signTransaction(tx);
      let txId = await provider.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
        preflightCommitment: "finalized",
      });

      await solConnection.confirmTransaction(txId, "finalized");

      console.log("Your transaction signature", txId);
    }
  } catch (e) {
    console.log(e);
  }
};

export const addTableOnChain = async (
  wallet: WalletContextState,
  stack: number,
  buy_in: number,
  blinds: number,
  max_seats: number
) => {
  try {
    if (!wallet || !wallet.publicKey) return -3;

    let cloneWindow: any = window;

    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

    const tx = await createAddTableTx(wallet.publicKey, program, stack, buy_in, blinds, max_seats);
    const { blockhash } = await solConnection.getRecentBlockhash("confirmed");
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction !== undefined) {
      // const signedTransactions = await wallet.signAllTransactions([tx]);
      let signedTx = await wallet.signTransaction(tx);
      let txId = await provider.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
        preflightCommitment: "finalized",
      });
      console.log("txId >> ", txId);
      let result = await solConnection.confirmTransaction(txId, "finalized");

      console.log(result);

      if (!result.value.err) {
        return 0;
      } else {
        console.log((result.value.err as any).InstructionError[1].Custom);
        return -(result.value.err as any).InstructionError[1].Custom;
      }

      console.log("Your transaction signature", txId);
    }
    return -2;
  } catch (e) {
    console.log(e);
    return -1;
    // if ((e as any).includes("Requested resource not available")) {
    //     return 0;
    // } else {
    //     return -1;
    // }
  }
};

export const removeTableOnChain = async (
  wallet: WalletContextState,
  stack: number,
  buy_in: number,
  blinds: number,
  max_seats: number
) => {
  try {
    if (!wallet || !wallet.publicKey) return -3;

    let cloneWindow: any = window;

    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

    const tx = await createRemoveTableTx(
      wallet.publicKey,
      program,
      stack,
      buy_in,
      blinds,
      max_seats
    );
    const { blockhash } = await solConnection.getRecentBlockhash("confirmed");
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction !== undefined) {
      // const signedTransactions = await wallet.signAllTransactions([tx]);
      let signedTx = await wallet.signTransaction(tx);
      let txId = await provider.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
        preflightCommitment: "finalized",
      });

      let result = await solConnection.confirmTransaction(txId, "finalized");

      console.log("Your transaction signature", txId);
      console.log(result);

      if (!result.value.err) {
        return 0;
      } else {
        console.log((result.value.err as any).InstructionError[1].Custom);
        return -(result.value.err as any).InstructionError[1].Custom;
      }
    }
    return -2;
  } catch (e) {
    console.log(e);
    return -1;
    // if ((e as any).includes("Requested resource not available")) {
    //     return 0;
    // } else {
    //     return -1;
    // }
  }
};

export const enterTableOnChain = async (
  wallet: WalletContextState,
  stack: number,
  buy_in: number,
  blinds: number,
  max_seats: number
) => {
  try {
    if (!wallet || !wallet.publicKey || !wallet.connected)
      return {
        result: -3,
        txId: null,
      };

    let cloneWindow: any = window;

    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

    const tx = await createEnterTableTx(
      wallet.publicKey,
      program,
      stack,
      buy_in,
      blinds,
      max_seats
    );
    const { blockhash } = await solConnection.getRecentBlockhash("confirmed");
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction !== undefined) {
      // const signedTransactions = await wallet.signAllTransactions([tx]);
      let signedTx = await wallet.signTransaction(tx);
      let txId = await provider.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
        preflightCommitment: "finalized",
      });

      console.log("join tx id >> ", txId);

      let result = await solConnection.confirmTransaction(txId, "finalized");
      console.log("tx result >> ", result);
      if (!result.value.err) {
        return {
          result: 0,
          txId: txId,
        };
      } else {
        console.log((result.value.err as any).InstructionError[1].Custom);
        return {
          result: -(result.value.err as any).InstructionError[1].Custom,
          txId: null,
        };
      }
      console.log("Your transaction signature", txId);
    }
    return {
      result: -2,
      txId: null,
    };
  } catch (e) {
    console.log(e);
    // if ((e as any).includes("Requested resource not available")) {
    //     return 0;
    // } else {
    //     return -1;
    // }
    return {
      result: -1,
      txId: null,
    };
  }
};

export const userLeaveTable = async (
  wallet: WalletContextState,
  stack: number,
  buy_in: number,
  blinds: number,
  max_seats: number,
  user: PublicKey
) => {
  try {
    if (wallet.publicKey === null) return;
    if (!wallet) return;
    let cloneWindow: any = window;

    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

    const tx = await createUserLeaveTableTx(
      wallet.publicKey,
      program,
      stack,
      buy_in,
      blinds,
      max_seats,
      user
    );
    const { blockhash } = await solConnection.getRecentBlockhash("confirmed");
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction !== undefined) {
      // const signedTransactions = await wallet.signAllTransactions([tx]);
      let signedTx = await wallet.signTransaction(tx);
      let txId = await provider.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
        preflightCommitment: "finalized",
      });

      await solConnection.confirmTransaction(txId, "finalized");

      console.log("Your transaction signature", txId);
    }
  } catch (e) {
    console.log(e);
  }
};

export const addTournamentOnChain = async (
  wallet: WalletContextState,
  stack: number,
  buy_in: number,
  blinds: number,
  max_seats: number
) => {
  try {
    if (!wallet || !wallet.publicKey) return -3;

    let cloneWindow: any = window;

    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

    const tx = await createAddTournamentTx(
      wallet.publicKey,
      program,
      stack,
      buy_in,
      blinds,
      max_seats
    );
    const { blockhash } = await solConnection.getLatestBlockhash("confirmed");
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction !== undefined) {
      // const signedTransactions = await wallet.signAllTransactions([tx]);
      let signedTx = await wallet.signTransaction(tx);
      let txId = await provider.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
        preflightCommitment: "finalized",
      });
      console.log("txId >> ", txId);
      let result = await solConnection.confirmTransaction(txId, "finalized");

      console.log(result);

      if (!result.value.err) {
        return 0;
      } else {
        console.log((result.value.err as any).InstructionError[1].Custom);
        return -(result.value.err as any).InstructionError[1].Custom;
      }
    }
    return -2;
  } catch (e) {
    console.log(e);
    return -1;
  }
};
export const removeTournamentOnChain = async (
  wallet: WalletContextState,
  stack: number,
  buy_in: number,
  blinds: number,
  max_seats: number
) => {
  try {
    if (!wallet || !wallet.publicKey) return -3;
    let cloneWindow: any = window;

    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

    const tx = await createRemoveTournamentTx(
      wallet.publicKey,
      program,
      stack,
      buy_in,
      blinds,
      max_seats
    );
    const { blockhash } = await solConnection.getLatestBlockhash("confirmed");
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = blockhash;

    if (wallet.signTransaction !== undefined) {
      // const signedTransactions = await wallet.signAllTransactions([tx]);
      let signedTx = await wallet.signTransaction(tx);
      let txId = await provider.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
        preflightCommitment: "finalized",
      });

      let result = await solConnection.confirmTransaction(txId, "finalized");

      console.log("Your transaction signature", txId);
      console.log(result);

      if (!result.value.err) {
        return 0;
      } else {
        console.log((result.value.err as any).InstructionError[1].Custom);
        return -(result.value.err as any).InstructionError[1].Custom;
      }
    }
    return -2;
  } catch (e) {
    console.log(e);
    return -1;
  }
};

export const enterTournamentOnChain = async (
  wallet: WalletContextState,
  stack: number,
  buy_in: number,
  blinds: number,
  max_seats: number
) => {
  try {
    if (!wallet || !wallet.publicKey || !wallet.connected)
      return {
        result: -3,
        txId: null,
      };

    let cloneWindow: any = window;

    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

    const tx = await createEnterTournamentTx(
      wallet.publicKey,
      program,
      stack,
      buy_in,
      blinds,
      max_seats
    );
    const { blockhash } = await solConnection.getRecentBlockhash("confirmed");
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction !== undefined) {
      // const signedTransactions = await wallet.signAllTransactions([tx]);
      let signedTx = await wallet.signTransaction(tx);
      let txId = await provider.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
        preflightCommitment: "finalized",
      });

      console.log("join tx id >> ", txId);

      let result = await solConnection.confirmTransaction(txId, "finalized");
      console.log("tx result >> ", result);
      if (!result.value.err) {
        return {
          result: 0,
          txId: txId,
        };
      } else {
        console.log((result.value.err as any).InstructionError[1].Custom);
        return {
          result: -(result.value.err as any).InstructionError[1].Custom,
          txId: null,
        };
      }
      console.log("Your transaction signature", txId);
    }
    return {
      result: -2,
      txId: null,
    };
  } catch (e) {
    console.log(e);

    return {
      result: -1,
      txId: null,
    };
  }
};

export const userLeaveTournament = async (
  wallet: WalletContextState,
  stack: number,
  buy_in: number,
  blinds: number,
  max_seats: number,
  user: PublicKey
) => {
  try {
    if (!wallet || !wallet.publicKey) return;
    let cloneWindow: any = window;

    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

    const tx = await createUserLeaveTournamentTx(
      wallet.publicKey,
      program,
      stack,
      buy_in,
      blinds,
      max_seats,
      user
    );
    const { blockhash } = await solConnection.getLatestBlockhash("confirmed");
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = blockhash;

    if (wallet.signTransaction !== undefined) {
      // const signedTransactions = await wallet.signAllTransactions([tx]);
      let signedTx = await wallet.signTransaction(tx);
      let txId = await provider.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
        preflightCommitment: "finalized",
      });

      await solConnection.confirmTransaction(txId, "finalized");

      console.log("Your transaction signature", txId);
    }
  } catch (e) {
    console.log(e);
  }
};
