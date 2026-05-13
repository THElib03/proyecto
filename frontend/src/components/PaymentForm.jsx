import React, { useState, useEffect } from 'react';

const CARDS = [
    { name: "mastercard", color: "#0061A8", src: "https://files.catbox.moe/0ctign.png" },
    { name: "visa", color: "#E2CB38", src: "https://files.catbox.moe/3g771l.jpg" },
    { name: "dinersclub", color: "#888", src: "https://files.catbox.moe/lrib33.png" },
    { name: "americanExpress", color: "#108168", src: "https://files.catbox.moe/l6m1io.png" },
    { name: "discover", color: "#86B8CF", src: "https://files.catbox.moe/0xdely.jpg" },
    { name: "dankort", color: "#0061A8", src: "https://files.catbox.moe/ivsmcv.png" },
    { name: "unionpay", color: "#6366f1", src: "https://files.catbox.moe/i8gxv9.jpg" }
];

const PaymentForm = ({ totalPrice, onBack, onPaymentSuccess }) => {
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [focused, setFocused] = useState(null);
    const [cardType, setCardType] = useState(-1);

    // Card type detection logic translated from your jQuery snippet
    useEffect(() => {
        const num = number.replace(/\s/g, '');
        if (num.length >= 1) {
            const p2 = parseInt(num.substring(0, 2));
            const p1 = parseInt(num.substring(0, 1));
            const p4 = parseInt(num.substring(0, 4));

            if (p2 > 50 && p2 < 56) setCardType(0);
            else if (p1 === 4) setCardType(1);
            else if ([36, 38, 39].includes(p2)) setCardType(2);
            else if ([34, 37].includes(p2)) setCardType(3);
            else if (p2 === 65) setCardType(4);
            else if (p4 === 5019) setCardType(5);
            else if ((p2 >= 61 && p2 <= 63) || p1 === 8) setCardType(6);
            else setCardType(-1);
        } else {
            setCardType(-1);
        }
    }, [number]);

    const handleNumberInput = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
        setNumber(formatted.substring(0, 19));
    };

    const handleExpiryInput = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 4) val = val.substring(0, 4);
        
        let formatted = val;
        if (val.length >= 2) {
            let month = val.substring(0, 2);
            if (parseInt(month) > 12) month = "12";
            formatted = month + (val.length > 2 ? " / " + val.substring(2) : "");
        }
        setExpiry(formatted);
    };

    const cardColor = cardType !== -1 ? CARDS[cardType].color : "#cecece";

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation checks
        if (number.replace(/\s/g, '').length < 13) {
            alert("Please enter a valid card number.");
            return;
        }

        if (!name.trim()) {
            alert("Please enter the cardholder name.");
            return;
        }

        if (expiry.replace(/[\s/]/g, '').length < 4) {
            alert("Please enter a valid expiry date.");
            return;
        }

        if (cvv.length < 3) {
            alert("Please enter a valid CVC code.");
            return;
        }

        onPaymentSuccess();
    };

    return (
        <div className="page-container max-w-5xl mx-auto mt-8 px-4 sm:px-8">
            <style>{`
                .scene { width: 100%; max-width: 400px; aspect-ratio: 1.586; margin: 0 auto; }
                .credit-card { 
                    width: 100%; height: 100%; transition: transform 0.6s; 
                    transform-style: preserve-3d; position: relative;
                    margin-bottom: 30px;
                }
                .credit-card-front, .credit-card-back { 
                    backface-visibility: hidden; position: absolute; 
                    width: 100%; height: 100%; inset: 0;
                    border-radius: 1rem; padding: 6%; color: white;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
                    display: flex; flex-direction: column; justify-content: space-between;
                }
                .credit-card-back { transform: rotateY(180deg); background: #e2e8f0; color: #333; padding: 0 }
                .flipped { transform: rotateY(180deg); }
                .chip { width: 15%; aspect-ratio: 1.4; background: #facc15; border-radius: 6px;}
                .magnetic-strip { background: #1e293b; height: 20%; width: 100%; margin-top: 8%; }
                .signature-bar { background: white; height: 18%; width: 80%; margin: 5% auto 0; display: flex; align-items: center; justify-content: flex-end; padding-right: 15px; font-style: italic; color: #64748b; border-radius: 4px; }
            `}</style>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start pt-4">
                <div className="w-full lg:w-1/2 flex justify-center max-w-md mx-auto">
                    <div className="scene aspect-[1.4] sm:aspect-[1.586]">
                        <div className={`credit-card ${focused === 'cvv' ? 'flipped' : ''}`}>
                            <div className="credit-card-front rounded-xl sm:rounded-2xl shadow-xl flex flex-col justify-between p-4 sm:p-6 text-white transition-colors duration-300" style={{ backgroundColor: cardColor }}>
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-8 sm:w-12 sm:h-9 bg-yellow-400 rounded-md opacity-90"></div>
                                    {cardType !== -1 && <img src={CARDS[cardType].src} alt="brand" className="h-6 md:h-10 object-contain max-w-15 sm:max-w-20" />}
                                </div>

                                <div className={`font-mono tracking-widest text-[1.1rem] min-[400px]:text-[1.3rem] sm:text-[1.6rem] transition-opacity ${focused === 'number' ? 'opacity-100' : 'opacity-80'}`}>
                                    {number || "•••• •••• •••• ••••"}
                                </div>

                                <div className="flex justify-between items-end gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[9px] sm:text-[13px] uppercase opacity-60 mb-0.5">Card Holder</p>
                                        <p className={`text-xs sm:text-[10px] uppercase font-semibold transition-opacity ${focused === 'name' ? 'opacity-100' : 'opacity-80'}`}>
                                            {name || "FULL NAME"}
                                        </p>
                                    </div>

                                    <div className="text-right whitespace-nowrap shrink-0">
                                        <p className="text-[9px] sm:text-[13px] uppercase opacity-60 mb-0.5">Expires</p>
                                        <p className={`text-xs sm:text-sm font-semibold transition-opacity ${focused === 'expiry' ? 'opacity-100' : 'opacity-80'}`}>
                                            {expiry || "MM / YY"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="credit-card-back rounded-xl sm:rounded-2xl shadow-xl bg-slate-200 overflow-hidden text-slate-800">
                                <div className="magnetic-strip"></div>
                                <div className="mt-4 sm:mt-8 px-4 sm:px-6">
                                    <div className="bg-white h-10 sm:h-12 w-full flex items-center justify-end px-4 rounded font-mono text-sm sm:text-base italic text-slate-500 shadow-inner">
                                        <span className={`font-mono ${focused === 'cvv' ? 'text-[var(--color-primary-teal)] font-bold' : ''}`}>
                                            {cvv || "•••"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Inputs */}
                <div className="w-full lg:w-1/2 space-y-3 sm:space-y-4 lg:px-0 sm:px-14">
                    <div className="form-group mb-0">
                        <label>Card Number</label>
                        <input 
                            className="search-input text-sm sm:text-base"
                            type="text" 
                            value={number}
                            onChange={handleNumberInput}
                            onFocus={() => setFocused('number')}
                            onBlur={() => setFocused(null)}
                            maxLength="19"
                            placeholder="0000 0000 0000 0000"
                        />
                    </div>
                    
                    <div className="form-group mb-0 mt-2">
                        <label>Cardholder Name</label>
                        <input 
                            className="search-input text-sm sm:text-base"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused(null)}
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <div className="form-group flex-1 min-w-30 mb-0 mt-2">
                            <label>Expiry Date</label>
                            <input 
                                className="search-input text-sm sm:text-base"
                                type="text"
                                value={expiry}
                                onChange={handleExpiryInput}
                                onFocus={() => setFocused('expiry')}
                                onBlur={() => setFocused(null)}
                                placeholder="MM / YY"
                            />
                        </div>
                        <div className="form-group flex-1 min-w-30 mb-0">
                            <label>CVC</label>
                            <input 
                                className="search-input text-sm sm:text-base"
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                                onFocus={() => setFocused('cvv')}
                                onBlur={() => setFocused(null)}
                                maxLength="3"
                                placeholder="123"
                            />
                        </div>
                    </div>

                    <div className="pt-4 sm:pt-6 flex flex-col gap-3">
                        <button 
                            className="btn btn-primary w-full shadow-md text-base sm:text-lg flex items-center justify-center gap-2 py-3 sm:py-4"
                            onClick={handleSubmit}
                        >
                            Pay {totalPrice}€
                        </button>
                        <button 
                            className="text-[var(--color-slate-blue)] bg-transparent border-none text-sx sm:text-sm font-semibold hover:underline cursor-pointer" 
                            onClick={onBack}
                        >
                            ← Go back to review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
