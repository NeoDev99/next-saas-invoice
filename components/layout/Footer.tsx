"use client";

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Next SaaS Invoicer. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;