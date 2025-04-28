import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Copy } from "lucide-react";

type SolWalletProps = {
  mnemonic: string;
};

export const SolWallet = ({ mnemonic }: SolWalletProps) => {
  const [curIndex, setCurIndex] = useState(0);
  const [pubKey, setPubKey] = useState<PublicKey[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null); // Track which index was copied

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500); // Reset after 1.5s
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${curIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurIndex(curIndex + 1);
          setPubKey([...pubKey, keypair.publicKey]);
        }}
      >
        Add SOL wallet
      </button>

      <div className="h-40 overflow-y-auto flex flex-col items-center space-y-2 m-3">
        {pubKey.map((pubKey, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-white space-x-2"
          >
            <div className="break-all">{pubKey.toBase58()}</div>
            <button
              onClick={() => handleCopy(pubKey.toBase58(), index)}
              className="hover:text-green-400 m-0 rounded flex items-center justify-center h-0.5"
            >
              <Copy size={12} />
            </button>
            {copiedIndex === index && (
              <span className="text-xs text-green-400">Copied!</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
