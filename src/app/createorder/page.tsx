"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import MultiStepForm from '@/app/components/MultiStepForm';
import Header from '../components/Header';
import styles from './CreateOrder.module.css'; 

const CreateOrder = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login'); 
    }
  }, [router]);

  return (
    <>
      <Header />
      <div className={styles.createOrderContainer}>
        <h2 className={styles.createOrderTitle}>Crea una orden</h2>
        <p className={styles.createOrderDescription}>
          Dale una ventaja competitiva a tu negocio con entregas el mismo día (Área Metropolitana) y el día siguiente a nivel nacional.
        </p>
        <div className={styles.multiStepFormWrapper}>
          <MultiStepForm />
        </div>
      </div>
    </>
  );
};

export default CreateOrder;
