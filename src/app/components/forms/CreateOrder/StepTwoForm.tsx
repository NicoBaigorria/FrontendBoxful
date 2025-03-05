import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Space, Typography, Divider, Table } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './StepTwoForm.module.css';

const { Title, Text } = Typography;

interface StepTwoFormProps {
  form: any;
}

interface Package {
  largo: number;
  ancho: number;
  alto: number;
  peso: number;
  contenido: string;
}

const StepTwoForm: React.FC<StepTwoFormProps> = ({ form }) => {
  const [packages, setPackages] = useState<Package[]>([]);

  const [currentPackage, setCurrentPackage] = useState<Package>({
    largo: 15,
    ancho: 15,
    alto: 15,
    peso: 2,
    contenido: 'iPhone 14 pro Max',
  });

  useEffect(() => {
    form.setFieldsValue({ packages });
  }, [packages, form]);

  const addPackage = () => {
    setPackages([...packages, currentPackage]);
    resetForm();
  };

  const resetForm = () => {
    setCurrentPackage({ largo: 0, ancho: 0, alto: 0, peso: 0, contenido: '' });
  };

  const removePackage = (contenido: string) => {
    if (!contenido) return;
    setPackages(packages.filter(pkg => pkg.contenido !== contenido));
  };

  const handleChange = (field: keyof Package, value: any) => {
    setCurrentPackage({
      ...currentPackage,
      [field]: value,
    });
  };

  const columns = [
    {
      title: 'Peso',
      dataIndex: 'peso',
      key: 'peso',
      render: (peso: number) => <span>{peso} lb</span>,
    },
    {
      title: 'Contenido',
      dataIndex: 'contenido',
      key: 'contenido',
    },
    {
      title: '',
      dataIndex: 'imagen',
      key: 'imagen',
      render: () => <img src="/images/Frame.png" alt="Box" className={styles.boxImage} />,
    },
    {
      title: 'Largo',
      dataIndex: 'largo',
      key: 'largo',
      render: (largo: number) => <span>{largo} cm</span>,
    },
    {
      title: 'Alto',
      dataIndex: 'alto',
      key: 'alto',
      render: (alto: number) => <span>{alto} cm</span>,
    },
    {
      title: 'Ancho',
      dataIndex: 'ancho',
      key: 'ancho',
      render: (ancho: number) => <span>{ancho} cm</span>,
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_: any, record: Package) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => removePackage(record.contenido)}  // Usando `contenido` como clave única
          className={styles.deleteButton}
        />
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Title level={4} className={styles.title}>Agrega tus bultos</Title>

      <div className={styles.packageForm}>
      <Space className={`${styles.packageRow} packageRowGlobal`}>

          <div className={styles.boxImageContainer}>
            <img src="/images/Frame.png" alt="Box" className={styles.boxImage} />
          </div>
          <div>
            <Text>Largo</Text>
            <InputNumber
              className={styles.inputNumber}
              value={currentPackage.largo}
              onChange={(value) => handleChange('largo', value)}
              placeholder="Largo"
            />
          </div>

          <div>
            <Text>Alto</Text>
            <InputNumber
              className={styles.inputNumber}
              value={currentPackage.alto}
              onChange={(value) => handleChange('alto', value)}
              placeholder="Alto"
            />
          </div>

          <div>
            <Text>Ancho</Text>
            <InputNumber
              className={styles.inputNumber}
              value={currentPackage.ancho}
              onChange={(value) => handleChange('ancho', value)}
              placeholder="Ancho"
            />
          </div>

          <div>
            <Text>Peso (lb)</Text>
            <InputNumber
              className={styles.inputNumber}
              value={currentPackage.peso}
              onChange={(value) => handleChange('peso', value)}
              placeholder="Peso (lb)"
            />
          </div>

          <div>
            <Text>Contenido</Text>
            <Input
              className={styles.inputText}
              value={currentPackage.contenido}
              onChange={(e) => handleChange('contenido', e.target.value)}
              placeholder="Contenido"
            />
          </div>

          <Button type="primary" icon={<PlusOutlined />} onClick={addPackage}>
            Agregar
          </Button>
        </Space>
      </div>

      <Divider />

      <Title level={5} className={styles.subtitle}>Lista de bultos</Title>
      <Table
        dataSource={packages}
        columns={columns}
        rowKey="contenido" 
        pagination={false}
      />

      <Form.Item hidden name="packages">
        <Input type="hidden" />
      </Form.Item>
    </div>
  );
};

export default StepTwoForm;
