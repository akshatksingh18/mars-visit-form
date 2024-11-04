import React, { useState } from 'react';
import styles from './MarsVisitForm.module.css';

export default function MarsVisitForm() {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    email: '',
    phone: '',
    departureDate: '',
    returnDate: '',
    accommodationPreference: 'Space Hotel',
    specialRequests: '',
    healthDeclaration: '',
    emergencyContact: '',
    medicalConditions: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigateForm = (direction) => {
    if (direction === 'next' && currentStage < 3) {
      setCurrentStage(currentStage + 1);
    } else if (direction === 'prev' && currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
    } else {
      alert('Please fill all required fields correctly.');
    }
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.dateOfBirth || !formData.email || !formData.phone || !formData.healthDeclaration) {
      return false;
    }
    return true;
  };

  return (
    <div className={styles.formContainer}>
      <h1>Multi-Stage Mars Visit Application Form</h1>
      <form onSubmit={handleSubmit}>
        {currentStage === 1 && (
          <div className={styles.formStage}>
            <h2>Stage 1: Personal Information</h2>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required />
            <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleInputChange} required />
            <input type="text" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
          </div>
        )}
        {currentStage === 2 && (
          <div className={styles.formStage}>
            <h2>Stage 2: Travel Preferences</h2>
            <input type="date" name="departureDate" placeholder="Departure Date" value={formData.departureDate} onChange={handleInputChange} required />
            <input type="date" name="returnDate" placeholder="Return Date" value={formData.returnDate} onChange={handleInputChange} required />
            <select name="accommodationPreference" value={formData.accommodationPreference} onChange={handleInputChange}>
              <option value="Space Hotel">Space Hotel</option>
              <option value="Martian Base">Martian Base</option>
            </select>
            <textarea name="specialRequests" placeholder="Special Requests or Preferences" value={formData.specialRequests} onChange={handleInputChange} />
          </div>
        )}
        {currentStage === 3 && (
          <div className={styles.formStage}>
            <h2>Stage 3: Health and Safety</h2>
            <select name="healthDeclaration" value={formData.healthDeclaration} onChange={handleInputChange} required>
              <option value="">Do you declare that you are in good health?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <input type="text" name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleInputChange} required />
            <textarea name="medicalConditions" placeholder="Any Medical Conditions (if applicable)" value={formData.medicalConditions} onChange={handleInputChange} />
          </div>
        )}
        <div className={styles.formNavigation}>
          {currentStage > 1 && <button type="button" onClick={() => navigateForm('prev')}>Previous</button>}
          {currentStage < 3 && <button type="button" onClick={() => navigateForm('next')}>Next</button>}
          {currentStage === 3 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
}