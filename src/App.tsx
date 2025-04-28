import { useState } from "react";
import "./App.css";
import { generateMnemonic } from "bip39";
import { SolWallet } from "./SolWallet";
import { EthWallet } from "./EthWallet";
import { Eye, EyeOff } from "lucide-react";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [hideButton, setHideButton] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(true);


  return (
    <>
    <div className="flex flex-col w-full items-center justify-center">
      <div
        id="mnemonic-box"
        className="flex flex-col w-full items-center justify-center"
      >
        <textarea
          className="w-80 h-30 m-5 text-pretty items-center text-center justify-center text-[24px] text-black text-shadow-2xs rounded-[14px] bg-gradient-to-r from-[#00ffc6] to-[#007cf0]"
          value={mnemonic}
          readOnly
        />
        {!hideButton &&
          <button
            className="p-3"
            onClick={async function () {
              const mn = generateMnemonic();
              setMnemonic(mn);
              setHideButton(true);
              setShowMnemonic(true);
            }}
          >
            Create Seed Phrase
          </button>
        }
      </div>
      <div className="flex flex-row">
        <div className="p-3">
          {mnemonic && <SolWallet mnemonic={mnemonic} />}
        </div>

        <div className="p-3">
          {mnemonic && <EthWallet mnemonic={mnemonic} />}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
