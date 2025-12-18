"use client"

import Prism from "@/lib/prism";
import { useEffect, useRef, useState } from "react";

export const CodeBlock = ({ language, code }: { language: string, code: string }) => {
    const [isCopied, setIsCopied] = useState(false);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [code, language]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="my-10 rounded-lg overflow-hidden bg-[#151515] border border-white/10 shadow-2xl relative group w-full max-w-[90vw]">
            <div className="bg-[#1e1e1e] px-4 py-3 border-b border-white/5 flex justify-between items-center select-none">
                <div className="flex gap-2 items-center">
                    <div className="flex gap-1.5 mr-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80"></span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono uppercase tracking-wider font-bold">{language || 'Code'}</span>
                </div>
                
                <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 hover:bg-white/10 px-4 py-1.5 rounded-md transition-all duration-300"
                >
                    {isCopied ? (
                        <>
                            <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Copied</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                            <span className="text-[10px] text-slate-400 group-hover:text-white font-bold uppercase tracking-widest transition-colors">Copy</span>
                        </>
                    )}
                </button>
            </div>
            <div className="relative">
                 <pre className={`bg-[#151515] m-0 p-6 overflow-x-auto custom-scrollbar text-sm`}>
                    <code ref={codeRef} className={`language-${language || 'none'} text-sm font-mono leading-relaxed`}>
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    );
};
