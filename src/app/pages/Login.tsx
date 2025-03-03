import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const Login: React.FC = () => {
  const handleLogin = async (values: any) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', values);
      localStorage.setItem('token', response.data.accessToken);
      message.success('Login exitoso');
      window.location.href = '/formulario';
    } catch (error) {
      message.error('Credenciales inválidas');
    }
  };

  return (
    <Form onFinish={handleLogin} layout="vertical">
      <Form.Item name="email" label="Correo" rules={[{ required: true, message: 'Obligatorio' }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Obligatorio' }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">Iniciar sesión</Button>
    </Form>
  );
};

export default Login;
