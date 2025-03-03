import React from 'react';
import MultiStepForm from '@/app/components/MultiStepForm';

const CreateOrder = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2>Crea una orden</h2>
      <p>Dale una ventaja competitiva a tu negocio...</p>
      <MultiStepForm />
    </div>
  );
};

export default CreateOrder;
