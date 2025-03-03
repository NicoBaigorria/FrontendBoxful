"use client"

import React, { useState } from 'react';
import { Form, Button, Steps } from 'antd';
import StepOneForm from './forms/CreateOrder/StepOneForm';
import StepTwoForm from './forms/CreateOrder/StepTwoForm';

const { Step } = Steps;

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const next = () => setCurrentStep(currentStep + 1);
  const prev = () => setCurrentStep(currentStep - 1);

  const handleSubmit = async (values: any) => {
    console.log('Formulario completo:', values);
    // Aquí envías `values` al backend NestJS
    // fetch('/api/orders', { method: 'POST', body: JSON.stringify(values) })
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Steps current={currentStep} style={{ marginBottom: 24 }}>
        <Step title="Datos Generales" />
        <Step title="Detalle de Paquetes" />
      </Steps>

      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {currentStep === 0 && <StepOneForm />}
        {currentStep === 1 && <StepTwoForm />}

        <div style={{ marginTop: 24 }}>
          {currentStep > 0 && (
            <Button onClick={prev} style={{ marginRight: 8 }}>
              Regresar
            </Button>
          )}
          {currentStep < 1 && (
            <Button type="primary" onClick={next}>
              Siguiente
            </Button>
          )}
          {currentStep === 1 && (
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default MultiStepForm;
