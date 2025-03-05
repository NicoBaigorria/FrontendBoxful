import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Space, Typography, Divider, Table, Popconfirm } from 'antd';
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
    setPackages([
      ...packages,
      {
        largo: Number(currentPackage.largo), 
        ancho: Number(currentPackage.ancho), 
        alto: Number(currentPackage.alto), 
        peso: Number(currentPackage.peso),  
        contenido: currentPackage.contenido,
      },
    ]);
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

    if (field === 'contenido') {
     
      setCurrentPackage({
        ...currentPackage,
        [field]: value,
      });
    } else {
      const numericValue = Number(value);
      if (isNaN(numericValue)) {
        return; 
      }
      setCurrentPackage({
        ...currentPackage,
        [field]: numericValue, 
      });
    }
  };

  const handleTableChange = (value: any, key: string, dataIndex: keyof Package) => {
    let numericValue = value;
    if (dataIndex !== 'contenido') {
      numericValue = Number(value);
      if (isNaN(numericValue)) {
        return; 
      }
    }

    const updatedPackages = packages.map(pkg =>
      pkg.contenido === key ? { ...pkg, [dataIndex]: numericValue } : pkg
    );
    setPackages(updatedPackages);
  };

  const columns = [
    {
      title: 'Peso',
      dataIndex: 'peso',
      key: 'peso',
      editable: true,
      render: (peso: number, record: Package) => (
        <InputNumber
          defaultValue={peso}
          onBlur={(e) => handleTableChange(e.target.value, record.contenido, 'peso')}
        />
      ),
    },
    {
      title: 'Contenido',
      dataIndex: 'contenido',
      key: 'contenido',
      editable: true,
      render: (contenido: string, record: Package) => (
        <Input
          defaultValue={contenido}
          onBlur={(e) => handleTableChange(e.target.value, record.contenido, 'contenido')}
        />
      ),
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
      editable: true,
      render: (largo: number, record: Package) => (
        <InputNumber
          defaultValue={largo}
          onBlur={(e) => handleTableChange(e.target.value, record.contenido, 'largo')}
        />
      ),
    },
    {
      title: 'Alto',
      dataIndex: 'alto',
      key: 'alto',
      editable: true,
      render: (alto: number, record: Package) => (
        <InputNumber
          defaultValue={alto}
          onBlur={(e) => handleTableChange(e.target.value, record.contenido, 'alto')}
        />
      ),
    },
    {
      title: 'Ancho',
      dataIndex: 'ancho',
      key: 'ancho',
      editable: true,
      render: (ancho: number, record: Package) => (
        <InputNumber
          defaultValue={ancho}
          onBlur={(e) => handleTableChange(e.target.value, record.contenido, 'ancho')}
        />
      ),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_: any, record: Package) => (
        <Popconfirm
          title="¿Estás seguro de eliminar este bulto?"
          onConfirm={() => removePackage(record.contenido)}
          okText="Sí"
          cancelText="No"
        >
          <Button
            danger
            icon={<DeleteOutlined />}
            className={styles.deleteButton}
          />
        </Popconfirm>
      ),
    },
  ];

  const mergedColumns = columns.map(col => ({
    ...col,
    onCell: (record: Package) => ({
      record,
      editable: col.editable,
      onChange: (value: any) => {
        if (col.dataIndex) {
          handleTableChange(value, record.contenido, col.dataIndex as keyof Package);
        }
      },
    }),
  }));

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

      <Title level={5} className={styles.subtitle}>Agrega de bultos</Title>
      <Table
        dataSource={packages}
        columns={mergedColumns}
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
