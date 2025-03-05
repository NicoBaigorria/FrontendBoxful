import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, FormInstance } from 'antd';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Don't forget to import the style
import styles from './StepOneForm.module.css';

interface StepOneFormProps {
  form: FormInstance;
}

const StepOneForm: React.FC<StepOneFormProps> = ({ form }) => {
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(undefined); // Estado para el departamento seleccionado

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value); 
  };

  const departments = [
    "Ahuachapán", "Cabañas", "Chalatenango", "Cuscatlán", "La Libertad",
    "La Paz", "La Unión", "Morazán", "San Miguel", "San Salvador", "San Vicente",
    "Santa Ana", "Sonsonate", "La Paz", "Usulután", "Zacatecoluca"
  ];

  const municipalities: { [key: string]: string[] } = {
    "Ahuachapán": [
      "Ahuachapán", "Apaneca", "Ataco", "Conchagua", "El Refugio", "Guaymango", "Jujutla", "San Francisco Menéndez", "San Lorenzo", "San Pedro Puxtla", "Tacuba"
    ],
    "Cabañas": [
      "Ilobasco", "Cinquera", "Coffe", "Jutiapa", "Sensuntepeque", "Tejutepeque"
    ],
    "Chalatenango": [
      "Chalatenango", "Agua Caliente", "Arcatao", "La Palma", "La Laguna", "San Isidro Labrador", "San José Las Flores", "San Salvador", "El Carrizal", "La Laguna"
    ],
    "Cuscatlán": [
      "Coatepeque", "La Libertad", "San Vicente", "Zacatecoluca", "La Paz"
    ],
    "La Libertad": [
      "Antiguo Cuscatlán", "Chalatenango", "Colón", "Comasagua", "El Salvador", "La Libertad"
    ],
    "La Paz": [
      "San Juan Nonualco", "San Pedro Masahuat", "San Sebastián", "Olocuilta", "Zacatecoluca", "Cuyultitán", "El Rosario", "San Antonio Masahuat", "Santa María Ostuma"
    ],
    "La Unión": [
      "La Unión", "Conchagua", "El Carmen", "El Sauce", "Yucuaiquín", "La Ceiba", "Lislique", "Pasaquina", "Polorós", "Santa Rosa de Lima"
    ],
    "Morazán": [
      "San Carlos", "San Fernando", "Delicias de Concepción", "San Antonio del Monte", "San Miguel", "La Unión", "Corinto", "San Vicente"
    ],
    "San Miguel": [
      "San Miguel", "Carolina", "Chapeltique", "Chinameca", "Chirilagua", "El Tránsito", "La Unión", "La Palma", "San Rafael", "San Antonio Masahuat"
    ],
    "San Salvador": [
      "San Salvador", "Ilopango", "Mejicanos", "Soyapango", "Apopa", "Ayutuxtepeque", "Cuscatancingo", "Ciudad Delgado", "San Marcos"
    ],
    "San Vicente": [
      "San Vicente", "Tecoluca", "San Esteban Catarina", "Santa Clara", "Verapaz"
    ],
    "Santa Ana": [
      "Santa Ana", "Candelaria de La Frontera", "Coatepeque", "El Congo", "El Porvenir", "Masahuat", "Metapán", "San Sebastián Salitrillo"
    ],
    "Sonsonate": [
      "Sonsonate", "Acajutla", "Armenia", "Izalco", "Juayúa", "Nahuizalco", "Salcoatitán", "San Sebastián Salitrillo", "Sonzacate", "Santo Tomás"
    ],
    "Usulután": [
      "Usulután", "Alegría", "Conchagua", "El Triunfo", "Ereguayquín", "Jiquilisco", "La Ureña", "Santiago de María", "Santa Elena"
    ],
    "Zacatecoluca": [
      "Zacatecoluca", "San Vicente", "San Esteban", "La Paz", "La Palma", "El Salvador"
    ]
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value); 
    form.setFieldsValue({ municipality: undefined }); 
  };


  const municipalitiesList = selectedDepartment ? municipalities[selectedDepartment] : [];

  return (
    <div className={styles.container}>
      <div className={styles.rowWide}>
        <Form.Item label="📍 Dirección de recolección" name="pickupAddress">
          <Input className={styles.input} />
        </Form.Item>
        <Form.Item label="📅 Fecha Programada" name="scheduledDate">
          <DatePicker className={styles.datePicker} />
        </Form.Item>
      </div>

      <div className={styles.row}>
        <Form.Item label="Nombres" name="firstName">
          <Input className={styles.input} />
        </Form.Item>

        <Form.Item label="Apellidos" name="lastName">
          <Input className={styles.input} />
        </Form.Item>

        <Form.Item label="Correo Electrónico" name="email">
          <Input className={styles.input} />
        </Form.Item>
      </div>

      <div className={styles.row}>
        <Form.Item label="Teléfono" name="phone">
          <PhoneInput
            className={styles.input}
            international
            defaultCountry="US" 
            placeholder="Ingrese su número de teléfono"
            value={phone}
            onChange={handlePhoneChange} 
          />
        </Form.Item>

        <Form.Item label="Dirección del destinatario" name="destinationAddress" className={styles.twoColumns}>
          <div className={styles.destinationAddressWrapper}>
            <div className={styles.dotImage}>
              <img src="/images/MapDot.png" alt="Dot" />
            </div>
            <Input className={styles.input} />
          </div>
        </Form.Item>

      </div>

      <div className={styles.row}>
        <Form.Item label="Departamento" name="department">
          <Select className={styles.select} onChange={handleDepartmentChange}>
            {departments.map((department) => (
              <Select.Option key={department} value={department}>
                {department}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Municipio" name="municipality">
          <Select className={styles.select}>
            {municipalitiesList.map((municipality) => (
              <Select.Option key={municipality} value={municipality}>
                {municipality}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Punto de referencia" name="referencePoint">
          <Input className={styles.input} />
        </Form.Item>
      </div>

      <Form.Item label="Indicaciones" name="instructions" className={styles.fullWidth}>
        <Input className={styles.input} />
      </Form.Item>
    </div>
  );
};

export default StepOneForm
