import React from 'react';
import { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import Image from 'next/image'
import DummyUser from '../media/dummy-profile.jpg';
import EdansupportLogo from '../media/logos/edansuport-logo.png';
import { useUser } from '../../context/ContextContainer';


function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="fixed top-0 right-0 z-10 bg-white w-full flex justify-between items-center px-8 h-20">
                {/* <!-- logo --> */}
                <div className="inline-flex">
                    <a className="_o6689fn" href="/"
                    ><div className="hidden md:block">
                            <Image
                                src={EdansupportLogo}
                                alt="Companey Logo"
                                width={250}
                                height={32}
                                className="rounded"
                                style={{ display: 'block' }}
                            />
                        </div>
                        <div className="block md:hidden">
                            <Image
                                src={EdansupportLogo}
                                alt="Companey Logo"
                                width={150}
                                height={25}
                                className="rounded"
                                style={{ display: 'block' }}
                            />
                        </div>
                    </a>
                </div>

                {/* <!-- end logo --> */}


                {/* <!-- login --> */}
                <div className="flex-initial">
                    <div className="flex justify-end items-center relative gap-x-8">
                        <div className="block">
                            {user && (
                                <h4 className="text-sm text-black">
                                    Hi, <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium border border-blue-300">{user.role}</span>
                                </h4>
                            )}

                        </div>
                        <div className="block">
                            <div className="inline relative">
                                <button onClick={toggleSidebar} type="button" className="inline-flex items-center relative px-2 border border-black-200 rounded-full shadow-sm hover:shadow-lg">
                                    <div className="pl-1">
                                        <svg
                                            viewBox="0 0 32 32"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            role="presentation"
                                            focusable="false"
                                            style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'black', strokeWidth: '3', overflow: 'visible' }}
                                        >
                                            <g fill="none" fillRule="nonzero">
                                                <path d="m2 16h28"></path>
                                                <path d="m2 24h28"></path>
                                                <path d="m2 8h28"></path>
                                            </g>
                                        </svg>
                                    </div>

                                    <div className="block content-center flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                                        <Image
                                            src={DummyUser}
                                            alt="User Profile"
                                            width={30}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end login --> */}
            </nav >

            <ProfileSidebar isOpen={isOpen} onClose={toggleSidebar} />

        </>
    )
}

export default NavBar