"use client";
import { useState, useEffect } from 'react';
import styles from './passengerForm.module.css'
import validator from 'validator';


export default function PassengerForm({FormNotComplete, setFormNotComplete}) {
    const [passengerInfo, setPassengerInfo] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        redressNumber: '',
        knownTravellerNumber: '',
    });

    const [emergencyContact, setEmergencyContact] = useState({
        sameAsPassenger: false,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const [checkedBags, setCheckedBags] = useState(1);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (emergencyContact.sameAsPassenger) {
            setEmergencyContact(prev => ({
                ...prev,
                firstName: passengerInfo.firstName,
                lastName: passengerInfo.lastName,
                email: passengerInfo.email,
                phone: passengerInfo.phone,
            }));
        }
    }, [emergencyContact.sameAsPassenger, passengerInfo]);

    const handlePassengerInfoChange = (e) => {
        const { name, value } = e.target;
        setPassengerInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleEmergencyContactChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setEmergencyContact(prev => ({
                ...prev,
                [name]: checked, //name property in html element
                firstName: checked ? passengerInfo.firstName : prev.firstName,
                lastName: checked ? passengerInfo.lastName : prev.lastName,
                email: checked ? passengerInfo.email : prev.email,
                phone: checked ? passengerInfo.phone : prev.phone,
            }));
        } else {
            setEmergencyContact(prev => ({ ...prev, [name]: value }));
        }
    };

    const validateName = (name) => {
        const nameRegex = /^[A-Za-z]+$/;
        return nameRegex.test(name) && name.length <= 20 && name.length > 2;
    };

    const validateForm = () => {
        
        const newErrors = {};
        if (!passengerInfo.firstName.trim()) newErrors.firstName = 'First name is required';
        else if (!validateName(passengerInfo.firstName.trim())) newErrors.firstName = 'First name must be valid';
        
        if (!passengerInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
        else if (!validateName(passengerInfo.lastName.trim())) newErrors.lastName = 'Last name must be valid';

        if (!passengerInfo.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

        if (!passengerInfo.email) newErrors.email = 'Email is required';
        else if (!validator.isEmail(passengerInfo.email)) newErrors.email = 'Please enter a valid email address';
        
        if (!passengerInfo.phone) newErrors.phone = 'Phone number is required';
        else if (!validator.isMobilePhone(passengerInfo.phone, 'any', { strictMode: true })) newErrors.phone = 'Please enter a valid phone number and must be supplied with the country code and therefore must start with +';
    
        // Emergency Contact Validation
        if (!emergencyContact.firstName.trim()) newErrors.emergencyFirstName = 'Emergency contact first name is required';
        else if (!validateName(passengerInfo.firstName.trim())) newErrors.emergencyFirstName = 'First name must be valid';
        
        if (!emergencyContact.lastName.trim()) newErrors.emergencyLastName = 'Emergency contact last name is required';
        else if (!validateName(passengerInfo.lastName.trim())) newErrors.emergencyLastName = 'Last name must be valid';
        
        if (!emergencyContact.email) newErrors.emergencyEmail = 'Emergency contact email is required';
        else if (!validator.isEmail(emergencyContact.email)) newErrors.emergencyEmail = 'Please enter a valid email address';
        
        if (!emergencyContact.phone) newErrors.emergencyPhone = 'Emergency contact phone is required';
        else if (!validator.isMobilePhone(emergencyContact.phone, 'any', { strictMode: true })) newErrors.emergencyPhone = 'Please enter a valid phone number and must be supplied with the country code and therefore must start with +';

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) setFormNotComplete(true);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted', { passengerInfo, emergencyContact, checkedBags });

            setFormNotComplete(false);
            // Here you would typically send this data to your backend
        } else {
            console.log('Form has errors');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formTitle}>Passenger information</div>
            <p className={styles.formDescription}>
                Enter the required information for each traveler and be sure that it exactly matches
                the government-issued ID presented at the airport.
            </p>
           
            <div className={styles.passengerTitle}>Passenger 1 (Adult)</div>
           

            {errors.firstName && <div className={styles.error}>{errors.firstName}</div>}
            {errors.lastName && <div className={styles.error}>{errors.lastName}</div>}
            <div className={`${styles.formGrid3} ${styles.formGridWidth3}`}>
                <input
                    type="text"
                    name="firstName"
                    value={passengerInfo.firstName}
                    onChange={handlePassengerInfoChange}
                    placeholder="First name*"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="middleName"
                    value={passengerInfo.middleName}
                    onChange={handlePassengerInfoChange}
                    placeholder="Middle"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="lastName"
                    value={passengerInfo.lastName}
                    onChange={handlePassengerInfoChange}
                    placeholder="Last name*"
                    className={`${styles.input} ${styles.passengerLastNameInput}`}
                />
            </div>
            
            {errors.dateOfBirth && <div className={styles.error}>{errors.dateOfBirth}</div>}
            <div className={`${styles.formGrid2} ${styles.formGridWidth2}`}>
                <div style={{ display: 'flex', flexDirection: 'column',}}>
                <input
                    type="text"
                    name="suffix"
                    value={passengerInfo.suffix}
                    onChange={handlePassengerInfoChange}
                    placeholder="Suffix"
                    className={styles.input}
                />
                <div style={{ fontSize: "12px", textAlign: "left",  color: "#7c8db0", margin: "2px 4px", visibility: "hidden"}}> MM/DD/YY </div> 
                {/* just to match height*/}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column',}}>
                <div className={styles.dateInputContainer}>
                    <input
                        type="text"
                        name="dateOfBirth"
                        value={passengerInfo.dateOfBirth}
                        onChange={handlePassengerInfoChange}
                        placeholder="Date of birth*"
                        className={`${styles.input} ${styles.passengerDateOfBirthInput} ${styles.dateInput} ${errors.dateOfBirth ? styles.error : ''}`}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text";
                        }}
                    />
                </div>
                <div style={{ fontSize: "12px", textAlign: "left",  color: "#7c8db0", margin: "2px 4px", }}> MM/DD/YY </div>
                </div>
            </div>
            
            {errors.email && <div className={styles.error}>{errors.email}</div>}
            {errors.phone && <div className={styles.error}>{errors.phone}</div>}    
            <div className={styles.formGrid2}>
                <input
                    type="email"
                    name="email"
                    value={passengerInfo.email}
                    onChange={handlePassengerInfoChange}
                    placeholder="Email address*"
                    className={`${styles.input} ${styles.passengerLargeInput}`}
                />
                <input
                    type="tel"
                    name="phone"
                    value={passengerInfo.phone}
                    onChange={handlePassengerInfoChange}
                    placeholder="Phone number*"
                    className={`${styles.input} ${styles.passengerLargeInput}`}
                />
            </div>
            
           
            <div className={styles.formGrid2}>
                <input
                    type="text"
                    name="redressNumber"
                    value={passengerInfo.redressNumber}
                    onChange={handlePassengerInfoChange}
                    placeholder="Redress number"
                    className={`${styles.input} ${styles.passengerLargeInput}`}
                />
                <input
                    type="text"
                    name="knownTravellerNumber"
                    value={passengerInfo.knownTravellerNumber}
                    onChange={handlePassengerInfoChange}
                    placeholder="Known traveller number"
                    className={`${styles.input} ${styles.passengerLargeInput}`}
                />
            </div>

            <div className={styles.sectionTitle}>Emergency contact information</div>
            <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    name="sameAsPassenger"
                    checked={emergencyContact.sameAsPassenger}
                    onChange={handleEmergencyContactChange}
                    className={styles.checkbox}
                />
                Same as Passenger 1
            </label>
           
            {errors.emergencyFirstName && <div className={styles.error}>{errors.emergencyFirstName}</div>}
            {errors.emergencyLastName && <div className={styles.error}>{errors.emergencyLastName}</div>}
            <div className={styles.formGrid2}>
                <input
                    type="text"
                    name="firstName"
                    value={emergencyContact.firstName}
                    onChange={handleEmergencyContactChange}
                    placeholder="First name*"
                    className={`${styles.input} ${styles.passengerLargeInput}`}
                    disabled={emergencyContact.sameAsPassenger}
                />
                <input
                    type="text"
                    name="lastName"
                    value={emergencyContact.lastName}
                    onChange={handleEmergencyContactChange}
                    placeholder="Last name*"
                    className={`${styles.input} ${styles.passengerLargeInput}`}
                    disabled={emergencyContact.sameAsPassenger}
                />
            </div>
            
           
            {errors.emergencyEmail && <div className={styles.error}>{errors.emergencyEmail}</div>}
            {errors.emergencyPhone && <div className={styles.error}>{errors.emergencyPhone}</div>}
            <div className={styles.formGrid2}>
                <input
                    type="email"
                    name="email"
                    value={emergencyContact.email}
                    onChange={handleEmergencyContactChange}
                    placeholder="Email address*"
                    className={`${styles.input} ${styles.passengerLargeInput}`}
                    disabled={emergencyContact.sameAsPassenger}
                />
                <input
                    type="tel"
                    name="phone"
                    value={emergencyContact.phone}
                    onChange={handleEmergencyContactChange}
                    placeholder="Phone number*"
                    className={`${styles.input} ${styles.passengerLargeInput}`}
                    disabled={emergencyContact.sameAsPassenger}
                />
            </div>
            

            <div className={styles.sectionTitle2}>Bag information</div>
            <p className={styles.bagPolicy}>
                Each passenger is allowed one free carry-on bag and one personal item. First
                checked bag for each passenger is also free. Second bag check fees are waived for
                loyalty program members. <a style={{color : "#5000B9"}}> See the full bag policy. </a>
            </p>
            <div className={styles.bagCounter}>
                <div className={styles.bagCounterTitles}>
                    <div>Passenger 1</div>
                    <div>Checked bags</div>
                </div>
                <div className={styles.counterControls}>
                    <div>{passengerInfo.firstName} {passengerInfo.lastName}</div>
                    <div className={styles.counterButtons}>
                        <button type="button" onClick={() => setCheckedBags(Math.max(0, checkedBags - 1))}>−</button>
                        <span>{checkedBags}</span>
                        <button type="button" onClick={() => setCheckedBags(checkedBags + 1)}>+</button>
                    </div>
                </div>
            </div>
            <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton}>Save and close</button>
                <button type="button" className={FormNotComplete? styles.selectSeatsPurple : styles.selectSeatsButton }>Select seats</button>
            </div>
        </form>
    );
}