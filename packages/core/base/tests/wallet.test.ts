import type { Wallet, WalletAccount } from '../src/wallet.js';

class GlowWallet implements Wallet {
    version = '1.0.0' as const;
    name = 'Glow';
    icon = `data:image/png;base64,` as const;
    chains = ['trezoa:mainnet', 'trezoa:devnet'] as const;
    features = {
        'standard:connect': {
            connect: async () => ({ accounts: this.accounts }),
        },
        'standard:events': {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            on: (event: string, listener: () => void) => () => {},
        },
        'experimental:signTransaction': {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            signTransaction(account: WalletAccount, chain: string, transaction: Uint8Array) {},
        },
        'experimental:signMessage': {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            signMessage(account: WalletAccount, message: Uint8Array) {},
        },
        'glow:': {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            signIn() {},
        },
    };
    accounts = [new GlowTrezoaWalletAccount()];
}

class GlowTrezoaWalletAccount implements WalletAccount {
    address = '';
    publicKey = new Uint8Array();
    chains = ['trezoa:mainnet', 'trezoa:devnet', 'trezoa:testnet', 'trezoa:localnet'] as const;
    features = ['experimental:signMessage', 'experimental:signTransaction'] as const;
}

const wallet = new GlowWallet();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const account = wallet.accounts[0]!;

await wallet.features['standard:connect'].connect();

// eslint-disable-next-line @typescript-eslint/no-empty-function
wallet.features['standard:events'].on('change', () => {});
wallet.features['experimental:signTransaction'].signTransaction(account, 'trezoa', new Uint8Array());
wallet.features['experimental:signMessage'].signMessage(account, new Uint8Array());
wallet.features['glow:'].signIn();
