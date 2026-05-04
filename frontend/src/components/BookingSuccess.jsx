import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingSuccess = ({ totalPrice }) => {
    const navigate = useNavigate();

    return (
        <div className="app-container flex flex-col items-center justify-center min-h-[70vh]">
            <div className="page-container max-w-2xl text-center mx-auto">
                <div className="page-header">
                    <h1 className="text-green-600">Booking Confirmed!</h1>
                    <p className="text-lg text-slate-700">Your trip has been successfully booked.</p>
                </div>

                <div className="card p-8 shadow-lg">
                    <div className="text-6xl mb-6">🎉</div>
                    <p className="text-xl font-semibold mb-4">Thank you for your purchase!</p>
                    {totalPrice && (
                        <p className="text-slate-700 mb-6">
                            Total amount paid: <span className="font-bold text-green-600">{totalPrice}€</span>
                        </p>
                    )}
                    <p className="text-slate-600 mb-8">
                        You will receive an email confirmation shortly with your ticket details.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => navigate('/my-tickets')}
                        >
                            View My Tickets
                        </button>
                        <button
                            className="btn btn-secondary btn-lg"
                            onClick={() => navigate('/')}
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
