"use client";

import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import styles from './Home.module.css'; 
import Header from './components/Header';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Header/>
      <h1 className={styles.header}>Bienvenido a la webapp de BoxFull del Postulante Nicolás Baigorria</h1>
      <Button className={styles.button} onClick={() => router.push('/login')}>Ir a Login</Button>
    </div>
  );
}
