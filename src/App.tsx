import { useState } from "react";
import "./App.css";
import { generateMnemonic } from "bip39";
import { SolWallet } from "./SolWallet";
import { EthWallet } from "./EthWallet";
import { Eye, EyeOff, Copy } from "lucide-react";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [hideButton, setHideButton] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        <div
          id="mnemonic-box"
          className="flex flex-col w-full items-center justify-center relative"
        >
          {/* Textarea only shows if showMnemonic is true */}
          {showMnemonic && (
            <textarea
              className="w-80 h-30 m-5 p-3 text-pretty items-center text-center justify-center text-[24px] text-black text-shadow-2xs rounded-[14px] bg-gradient-to-r from-[#00ffc6] to-[#007cf0]"
              value={mnemonic}
              readOnly
            />
          )}

          {/* Eye button only shows if hideButton is true */}
          {hideButton && (
            <div className="flex flex-row items-center justify-center gap-4 mt-2">
              <button
                className="flex flex-row items-center gap-2 p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-black"
                onClick={() => setShowMnemonic(!showMnemonic)}
              >
                {showMnemonic ? <EyeOff size={20} /> : <Eye size={20} />}
                <span className="text-sm">
                  {showMnemonic ? "Hide Seed Phrase" : "Show Seed Phrase"}
                </span>
              </button>

              <button
                className="flex flex-row items-center gap-2 p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-black"
                onClick={handleCopy}
              >
                <Copy size={20} />
                <span className="text-sm">
                  {copySuccess ? "Copied!" : "Copy Seed Phrase"}
                </span>
              </button>
            </div>
          )}

          {/* Create Seed Phrase button initially */}
          {!hideButton && (
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
          )}
        </div>

        {/* SolWallet and EthWallet appear once mnemonic is ready */}
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
