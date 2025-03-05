"use client";

import { useRouter } from 'next/navigation';
import { Form, Input, Button, message, Modal } from 'antd';
import axiosInstance from '../utils/axios-instance';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Header from '../components/Header';
import styles from './Login.module.css'; 

const Login = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogin = async (values: any) => {
    try {
      const response = await axiosInstance.post('/auth/login', values);
      const token = response.data.accessToken;

      Cookies.set('token', token, { path: '/' });

      message.success('Login exitoso');
      router.push('/createorder');
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setIsModalVisible(true);
      } else {
        message.error('Hubo un error al intentar iniciar sesión. Intenta nuevamente.');
      }
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Iniciar sesión</h1>
        <Form onFinish={handleLogin} layout="vertical">
          <Form.Item
            name="email"
            label="Correo"
            rules={[{ required: true, message: 'Por favor, ingresa tu correo' }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]}
          >
            <Input.Password />
          </Form.Item>
          <Button className={styles.button} type="primary" htmlType="submit">
            Iniciar sesión
          </Button>
        </Form>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <span>No tienes cuenta? </span>
          <Button type="link" onClick={navigateToRegister} style={{ padding: 0 }}>
            Regístrate aquí
          </Button>
        </div>
        
        <Modal
          title="Error de Inicio de Sesión"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={[<Button key="close" onClick={handleModalCancel}>Cerrar</Button>]}
        >
          <p>Las credenciales que ingresaste son incorrectas. Por favor, verifica tu correo y contraseña.</p>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
