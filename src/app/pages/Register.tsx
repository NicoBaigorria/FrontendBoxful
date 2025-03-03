import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const Register: React.FC = () => {
  const handleRegister = async (values: any) => {
    try {
      await axios.post('http://localhost:3000/auth/register', values);
      message.success('Registro exitoso, ahora inicia sesión');
      window.location.href = '/login';
    } catch (error) {
      message.error('Error en el registro');
    }
  };

  return (
    <Form onFinish={handleRegister} layout="vertical">
      <Form.Item name="email" label="Correo" rules={[{ required: true, message: 'Obligatorio' }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Obligatorio' }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">Registrarse</Button>
    </Form>
  );
};

export default Register;
