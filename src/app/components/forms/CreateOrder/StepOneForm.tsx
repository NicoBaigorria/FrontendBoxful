import React from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';

const StepOneForm = () => {
  return (
    <>
      <Form.Item label="Dirección de recolección" name="pickupAddress">
        <Input />
      </Form.Item>

      <Form.Item label="Fecha Programada" name="scheduledDate">
        <DatePicker />
      </Form.Item>

      <Form.Item label="Nombres" name="firstName">
        <Input />
      </Form.Item>

      <Form.Item label="Apellidos" name="lastName">
        <Input />
      </Form.Item>

      <Form.Item label="Correo Electrónico" name="email">
        <Input />
      </Form.Item>

      <Form.Item label="Teléfono" name="phone">
        <Input />
      </Form.Item>

      <Form.Item label="Dirección del destinatario" name="destinationAddress">
        <Input />
      </Form.Item>

      <Form.Item label="Departamento" name="department">
        <Select>
          <Select.Option value="San Salvador">San Salvador</Select.Option>
          {/* Otros departamentos */}
        </Select>
      </Form.Item>

      <Form.Item label="Municipio" name="municipality">
        <Select>
          <Select.Option value="San Salvador">San Salvador</Select.Option>
          {/* Otros municipios */}
        </Select>
      </Form.Item>

      <Form.Item label="Punto de referencia" name="referencePoint">
        <Input />
      </Form.Item>

      <Form.Item label="Indicaciones" name="instructions">
        <Input />
      </Form.Item>
    </>
  );
};

export default StepOneForm;
