import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const StepTwoForm = () => {
  const [packages, setPackages] = useState([
    { length: 15, width: 15, height: 15, weight: 2, content: 'iPhone 14 pro Max' }
  ]);

  const addPackage = () => {
    setPackages([...packages, { length: 0, width: 0, height: 0, weight: 0, content: '' }]);
  };

  const removePackage = (index: number) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  const updatePackage = (index: number, field: string, value: any) => {
    const updatedPackages = [...packages];
    (updatedPackages[index] as any)[field] = value;
    setPackages(updatedPackages);
  };

  return (
    <div>
      {packages.map((pkg, index) => (
        <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="start">
          <InputNumber value={pkg.length} onChange={(value) => updatePackage(index, 'length', value)} placeholder="Largo" />
          <InputNumber value={pkg.width} onChange={(value) => updatePackage(index, 'width', value)} placeholder="Ancho" />
          <InputNumber value={pkg.height} onChange={(value) => updatePackage(index, 'height', value)} placeholder="Alto" />
          <InputNumber value={pkg.weight} onChange={(value) => updatePackage(index, 'weight', value)} placeholder="Peso" />
          <Input value={pkg.content} onChange={(e) => updatePackage(index, 'content', e.target.value)} placeholder="Contenido" />
          <Button danger icon={<DeleteOutlined />} onClick={() => removePackage(index)} />
        </Space>
      ))}

      <Button type="dashed" onClick={addPackage} icon={<PlusOutlined />}>
        Agregar Paquete
      </Button>

      {/* Guardamos la data en un hidden input para enviar con el form */}
      <Form.Item name="packages" hidden initialValue={packages}>
        <Input type="hidden" />
      </Form.Item>
    </div>
  );
};

export default StepTwoForm;
