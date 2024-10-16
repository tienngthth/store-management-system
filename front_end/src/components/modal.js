import React from 'react'


export default function Modal({ closeModal, shown, children, disabled }) {
    return (
        <>
            {shown &&
                <div tabIndex="-1"
                    className="flex justify-around bg-slate-300  bg-opacity-20 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                    onClick={() => {
                        if (disabled) return;
                        closeModal();
                    }}
                >
                    <div onClick={e => {
                        e.stopPropagation();
                    }} className="w-[400px]">
                        <div className="relative bg-white rounded-lg shadow ">
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}