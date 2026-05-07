import React, { useState, useEffect } from 'react';

const CARDS = [
    { nome: "mastercard", colore: "#0061A8", src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" },
    { nome: "visa", colore: "#E2CB38", src: "https://cdn.discordapp.com/attachments/712721998874148904/1500807386862981210/Visa.png?ex=69f9c74c&is=69f875cc&hm=9e8237b3e0cc5e70bc7ac6d1ad51654b15dee9a513bdda5f7cbae35274986e5c&" },
    { nome: "dinersclub", colore: "#888", src: "http://www.worldsultimatetravels.com/wp-content/uploads/2016/07/Diners-Club-Logo-1920x512.png" },
    { nome: "americanExpress", colore: "#108168", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/600px-American_Express_logo.svg.png" },
    { nome: "discover", colore: "#86B8CF", src: "https://lendedu.com/wp-content/uploads/2016/03/discover-it-for-students-credit-card.jpg" },
    { nome: "dankort", colore: "#0061A8", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Dankort_logo.png" }
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
        if (num.length >= 2) {
            const p2 = parseInt(num.substring(0, 2));
            const p1 = parseInt(num.substring(0, 1));
            const p4 = parseInt(num.substring(0, 4));

            if (p2 > 50 && p2 < 56) setCardType(0);
            else if (p1 === 4) setCardType(1);
            else if ([36, 38, 39].includes(p2)) setCardType(2);
            else if ([34, 37].includes(p2)) setCardType(3);
            else if (p2 === 65) setCardType(4);
            else if (p4 === 5019) setCardType(5);
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
        if (val.length > 6) val = val.substring(0, 6);
        
        let formatted = val;
        if (val.length >= 2) {
            let month = val.substring(0, 2);
            if (parseInt(month) > 12) month = "12";
            formatted = month + (val.length > 2 ? " / " + val.substring(2) : "");
        }
        setExpiry(formatted);
    };

    const cardColor = cardType !== -1 ? CARDS[cardType].colore : "#cecece";

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
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center p-8 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto">
            <style>{`
                .credit-card-container { perspective: 1000px; }
                .credit-card { 
                    width: 350px; height: 210px; transition: 0.6s; 
                    transform-style: preserve-3d; position: relative; 
                }
                .credit-card-front, .credit-card-back { 
                    backface-visibility: hidden; position: absolute; 
                    top: 0; left: 0; width: 100%; height: 100%; 
                    border-radius: 15px; padding: 25px; color: white;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                .credit-card-back { transform: rotateY(180deg); background: #e2e8f0; color: #333; }
                .flipped { transform: rotateY(180deg); }
                .chip { width: 50px; height: 35px; background: #facc15; border-radius: 6px; margin-bottom: 20px; }
                .magnetic-strip { background: #1e293b; height: 45px; width: 100%; margin: 10px 0; position: absolute; left: 0; top: 20px; }
                .signature-bar { background: white; height: 40px; width: 80%; margin-top: 80px; display: flex; align-items: center; justify-content: flex-end; padding-right: 15px; font-style: italic; color: #64748b; }
            `}</style>

            <div className="credit-card-container">
                <div className={`credit-card ${focused === 'cvv' ? 'flipped' : ''}`}>
                    <div className="credit-card-front" style={{ backgroundColor: cardColor }}>
                        <div className="flex justify-between items-start">
                            <div className="chip"></div>
                            {cardType !== -1 && <img src={CARDS[cardType].src} alt="brand" className="h-10 object-contain" />}
                        </div>
                        <div className={`text-2xl tracking-[0.1em] my-1 font-mono transition-colors ${focused === 'number' ? 'text-white' : 'text-white/80'}`}>
                            {number || "•••• •••• •••• ••••"}
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="flex-1">
                                <p className="text-[10px] uppercase opacity-60 mb-1">Card Holder</p>
                                <p className={`text-sm uppercase font-semibold truncate transition-colors ${focused === 'name' ? 'text-white' : 'text-white/80'}`}>
                                    {name || "FULL NAME"}
                                </p>
                            </div>
                            <div className="text-right ml-4">
                                <p className="text-[10px] uppercase opacity-60 mb-1">Expires</p>
                                <p className={`text-sm font-semibold transition-colors ${focused === 'expiry' ? 'text-white' : 'text-white/80'}`}>
                                    {expiry || "MM / YY"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="credit-card-back bg-slate-200">
                        <div className="magnetic-strip"></div>
                        <div className="signature-bar rounded">
                            <span className={focused === 'cvv' ? 'text-blue-600 font-bold' : ''}>
                                {cvv || "•••"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-sm space-y-4">
                <div className="form-group">
                    <label className="text-xs font-bold text-slate-500 uppercase">Card Number</label>
                    <input 
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        type="text" 
                        value={number}
                        onChange={handleNumberInput}
                        onFocus={() => setFocused('number')}
                        onBlur={() => setFocused(null)}
                        maxLength="19"
                        placeholder="0000 0000 0000 0000"
                    />
                </div>
                <div className="form-group">
                    <label className="text-xs font-bold text-slate-500 uppercase">Cardholder Name</label>
                    <input 
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        placeholder="John Doe"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="text-xs font-bold text-slate-500 uppercase">Expiry Date</label>
                        <input 
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            type="text"
                            value={expiry}
                            onChange={handleExpiryInput}
                            onFocus={() => setFocused('expiry')}
                            onBlur={() => setFocused(null)}
                            placeholder="MM / YYYY"
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-xs font-bold text-slate-500 uppercase">CVC</label>
                        <input 
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                <div className="pt-4 flex flex-col gap-3">
                    <button 
                        className="btn btn-primary w-full py-4 text-lg font-bold shadow-lg flex items-center justify-center gap-2"
                        onClick={handleSubmit}
                    >
                        Pay {totalPrice}€
                    </button>
                    <button className="text-slate-500 bg-white border-blue-500 text-sm hover:underline" onClick={onBack}>
                        ← Go back to review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
