"use client";

import Image from 'next/image';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image
                    src="/images/Iso.png"
                    alt="Logo de la empresa"
                    width={50} 
                    height={20}
                    layout="intrinsic"
                />
                <Image
                    src="/images/Logo.png"
                    alt="Logo de la empresa"
                    height={30} 
                    width={100}
                    layout="intrinsic"
                />
            </div>
        </header>
    );
};

export default Header;
