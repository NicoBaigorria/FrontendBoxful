"use client";

import { useRouter } from 'next/navigation';
import { Form, Input, Button, message, Modal } from 'antd';
import axiosInstance from '../utils/axios-instance';
import { useState } from 'react';
import Header from '../components/Header';
import styles from './Register.module.css';

const Register = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRegister = async (values: any) => {
    try {
      const response = await axiosInstance.post('/auth/register', values);
      message.success('Registro exitoso');
      setIsModalVisible(true);
    } catch (error: any) {
      message.error('Hubo un error al intentar registrarte. Intenta nuevamente.');
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    router.push('/login');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Regístrate</h1>
        <Form onFinish={handleRegister} layout="vertical">
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
            Registrarse
          </Button>
        </Form>

        <Modal
          title="¡Registro Exitoso!"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={[<Button key="close" className={styles.modalButton} onClick={handleModalOk}>Ir al Login</Button>]}
        >
          <p>Tu cuenta ha sido creada exitosamente. Haz clic en "Ir al Login" para iniciar sesión.</p>
        </Modal>
      </div>
    </div>
  );
};

export default Register;
