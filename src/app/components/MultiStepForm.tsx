import React, { useState } from 'react';
import { Form, Button, message, Modal } from 'antd';
import StepOneForm from './forms/CreateOrder/StepOneForm';
import StepTwoForm from './forms/CreateOrder/StepTwoForm';
import axiosInstance from '../utils/axios-instance';
import Cookies from 'js-cookie';
import styles from './MultiStepForm.module.css';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const next = () => setCurrentStep(currentStep + 1);
  const prev = () => setCurrentStep(currentStep - 1);

  const handleSubmit = async () => {
    const values = form.getFieldsValue(true);
    console.log('Form Values:', values);

    const missingFields: string[] = [];

    if (!values.scheduledDate) missingFields.push("Fecha Programada");
    if (!values.pickupAddress) missingFields.push("Dirección de recolección");
    if (!values.firstName) missingFields.push("Nombres");
    if (!values.lastName) missingFields.push("Apellidos");
    if (!values.email) missingFields.push("Correo Electrónico");
    if (!values.phone) missingFields.push("Teléfono");
    if (!values.department) missingFields.push("Departamento");
    if (!values.municipality) missingFields.push("Municipio");

    // Validar que packages no esté vacío
    if (!values.packages || values.packages.length === 0) {
        missingFields.push("Al menos un bulto (paquete)");
    }

    if (missingFields.length > 0) {
        setModalTitle("Campos Faltantes");
        setModalMessage(`Por favor, completa los siguientes campos: ${missingFields.join(', ')}`);
        setIsModalVisible(true);
        return;
    }

    const data = {
        direccion: values.pickupAddress,
        fechaEntrega: values.scheduledDate ? values.scheduledDate.toISOString() : null,
        nombre: values.firstName,
        apellido: values.lastName,
        correo: values.email,
        telefono: values.phone,
        departamento: values.department,
        municipio: values.municipality,
        puntoReferencia: values.referencePoint,
        notas: values.instructions,
        paquetes: values.packages || [],
    };

    console.log('Data to send:', data);

    const token = Cookies.get('token');
    if (!token) {
        message.error('No se encontró un token de autenticación.');
        return;
    }

    try {
        const response = await axiosInstance.post('/ordenes', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200 || response.status === 201) {
            setModalTitle("Éxito");
            setModalMessage('Orden enviada con éxito');
        } else {
            setModalTitle("Error");
            setModalMessage(`Hubo un problema al enviar la orden. Código de estado: ${response.status}`);
        }
    } catch (error: any) {
        console.error('Error al realizar la petición:', error);
        if (error.response) {
            setModalTitle("Error");
            setModalMessage(`Hubo un problema con la solicitud: ${error.response.data?.message || error.response.statusText}. Código de estado: ${error.response.status}`);
        } else if (error.request) {
            setModalTitle("Error de Conexión");
            setModalMessage('No se pudo contactar con el servidor. Verifica tu conexión a internet.');
        } else {
            setModalTitle("Error Inesperado");
            setModalMessage(`Hubo un error inesperado: ${error.message}`);
        }
    } finally {
        setIsModalVisible(true);
    }
};


  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {currentStep === 0 && <StepOneForm form={form} />}
        {currentStep === 1 && <StepTwoForm form={form} />}

        <div className={styles.buttonContainer}>
          {currentStep > 0 && (
            <Button onClick={prev} className={styles.prevButton}>
              <img src="/images/ArrowLeft.png" alt="Previous" className={styles.arrowIcon} />
              Regresar
            </Button>
          )}
          {currentStep < 1 && (
            <Button type="primary" onClick={next} className={styles.nextButton}>
              Siguiente
              <img src="/images/Arrow.png" alt="Next" className={styles.arrowIcon} />
            </Button>
          )}
          {currentStep === 1 && (
            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              Enviar
              <img src="/images/Arrow.png" alt="Submit" className={styles.arrowIcon} />
            </Button>
          )}
        </div>
      </Form>

      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[<Button key="close" onClick={handleModalCancel}>Cerrar</Button>]}
      >
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default MultiStepForm;
