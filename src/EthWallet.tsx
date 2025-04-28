import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { Copy } from "lucide-react";

type EthWalletProps = {
  mnemonic: string;
};

export const EthWallet = ({ mnemonic }: EthWalletProps) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);


  const handleCopy = async (address: string, index: number) => {
    await navigator.clipboard.writeText(address);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={async () => {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currIndex}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrIndex(currIndex + 1);
          setAddresses([...addresses, wallet.address]);
        }}
      >
        Add ETH Wallet
      </button>
      <div className="h-40 overflow-y-auto flex flex-col items-center space-y-2 m-3">
      {addresses.map((address, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-white space-x-2"
          >
            <div className="break-all font-mono">{address}</div>
            <button
              onClick={() => handleCopy(address, index)}
              className="hover:text-green-400 p-1 m-0 rounded flex items-center justify-center h-0.5"
            >
              <Copy size={12} />
            </button>
            {copiedIndex === index && (
              <span className="text-xs text-green-400 ml-2">Copied!</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
