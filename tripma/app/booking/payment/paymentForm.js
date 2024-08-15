"use client";

import { useEffect, useState } from 'react';
import { CreditCard, Info } from 'lucide-react';
import styles from './PaymentForm.module.css';
import validator from 'validator';

import { useCart } from '@/providers/CartProvider'
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

export default function PaymentForm() {
    const router = useRouter();
    const session = useSession();
    const [userId, setUserId] = useState(null);
    const {cartItems, flightSeats, passengersInfo, resetFlightSeats, clearRequestData, setPaymentResponse} = useCart(); //paymentData, updatePaymentData, 

    const goBackToSeats = () => {
        resetFlightSeats();
        router.push('/booking/seats');
    }
    
    useEffect(() => {
        if(session && session.data && session.data.user) setUserId(session?.data?.user?.id)
        // console.log('session', session);
        // console.log("userId", userId);
    });

    

    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [billingAddressSame, setBillingAddressSame] = useState(true);
    const [saveCard, setSaveCard] = useState(false);
    const [formData, setFormData] = useState({
        nameOnCard: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (paymentMethod === 'credit_card') {
            if (!formData.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card is required';
            if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
            else if (!validator.isCreditCard(formData.cardNumber)) newErrors.cardNumber = 'Invalid credit card number';
            if (!formData.expirationDate) newErrors.expirationDate = 'Expiration date is required';
            else {
                const [month, year] = formData.expirationDate.split('/');
                if (!validator.isDate(`20${year}-${month}-01`)) newErrors.expirationDate = 'Invalid expiration date'; //format is MM/YY
            }
            if (!formData.cvv) newErrors.cvv = 'CVV is required';
            else if (!validator.isNumeric(formData.cvv) || formData.cvv.length < 3 || formData.cvv.length > 4) newErrors.cvv = 'Invalid CVV';
        }
        if (saveCard && !userId) {
            if (!formData.email) newErrors.email = 'Email is required';
            else if (!validator.isEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
            if (!formData.password) newErrors.password = 'Password is required';
            else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
        }
        if(!billingAddressSame){
            if (!formData.billingAddress) newErrors.billingAddress = 'Billing address is required';
        }
        console.log(newErrors)
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            if (saveCard && !userId) {
                try {
                    const userData = {
                        identifier: formData.email, 
                        password: formData.password,
                        alertsAccepted: true,
                    };
            
                    // First, try to create an account
                    const signupResponse = await fetch('/api/auth/signup', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userData),
                    });
            
                    if (signupResponse.ok) {
                        console.log('Signup successful');
                        // If signup is successful, log in the user
                        const signInResult = await signIn('credentials', {
                            identifier: userData.identifier,
                            password: userData.password,
                            redirect: false,
                        });
            
                        if (signInResult.error) {
                            setErrors({...errors, Signup: 'Signup successful, but login failed. Please try logging in.'});
                        } else {
                            console.log('User signed in after signup');
                        }

                        

                    } else if (signupResponse.status === 409) {
                        // 409 typically means the user already exists
                        console.log('User already exists, attempting to sign in');
                        const signInResult = await signIn('credentials', {
                            identifier: userData.identifier,
                            password: userData.password,
                            redirect: false,
                        });
            
                        if (signInResult.error) {
                            setErrors({...errors, Signup: 'Login failed. Please check your credentials.'});
                        } else {
                            console.log('Existing user signed in');

                            
                        }
                    } else {
                        const data = await signupResponse.json();
                        setErrors({...errors, Signup: data.error || 'Signup failed'});
                    }
                } catch (error) {
                    console.error('Error signing up or logging in:', error);
                    setErrors({...errors, Signup: 'Signup or login failed. Please try again.'});
                }

            }

            //todo session doesn't reset until refresh so find a solution

            try {
                //console.log('Form submitted', formData);
                //updatePaymentData({paymentMethod, billingAddressSame, saveCard, formData}, true); no need + (refreshes page so less localstorage/cart context?)
                // console.log('to be sent', {cartItems, paymentData, flightSeats, passengersInfo, userId})

                let billingAddress = '';
                if (billingAddressSame)  billingAddress = passengersInfo[0].passengerInfo.email;
                else billingAddress = formData.billingAddress;
                //console.log('billing address', passengersInfo[0].passengerInfo.email, formData.billingAddress, billingAddress)

                const paymentDataToSend = {
                    paymentMethod,
                    billingAddress,
                    saveCard,
                    formData: {
                    nameOnCard: formData.nameOnCard,
                    cardNumber: formData.cardNumber.toString(),
                    expirationDate: formData.expirationDate,
                    cvv: formData.cvv,
                    },
                };

                // Make POST request
                const response = await fetch('/api/payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({cartItems, paymentData: paymentDataToSend, flightSeats, passengersInfo, userId, saveCard}),
                });

                // console.log('Full response:', response);
                // console.log('Response status:', response.status);
                // console.log('Response headers:', response.headers);

                const responseText = await response.text();
                // console.log('Response text:', responseText);

                let responseData;
                try {
                    responseData = JSON.parse(responseText);
                    // console.log('responseData', responseData);
                } catch (error) {
                    // console.error('Error parsing JSON:', error);
                    throw new Error('Invalid JSON response');
                }
                // console.log('result ', responseData.result);
                setPaymentResponse(responseData.result);

                // console.log('Payment successful');
                //clearRequestData(); //clears cart
                
                router.push('/booking/success');
            
            } catch (error) {
                //console.error('Error during payment:', error);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    reqResponse: 'Payment failed. Please try again. qqqqqqq'
                }));
            } finally {
                setIsSubmitting(false);
            }
        }else{
            console.log('Form not valid')
        }
    };

    const renderPaymentMethodFields = () => {
        if (paymentMethod === 'credit_card') {
            return (
                <div className={styles.inputGroup}>
                    <input 
                        type="text"
                        name="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        placeholder="Name on card"
                        className={`${styles.input} ${errors.nameOnCard ? styles.inputError : ''}`}
                    />
                    {errors.nameOnCard && <span className={styles.errorMessage}>{errors.nameOnCard}</span>}
                    <input 
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="Card number"
                        className={`${styles.input} ${errors.cardNumber ? styles.inputError : ''}`}
                    />
                    {errors.cardNumber && <span className={styles.errorMessage}>{errors.cardNumber}</span>}
                    <div className={styles.inputRow}>
                        <div className={styles.inputHalf}>
                            <input 
                                type="text"
                                name="expirationDate"
                                value={formData.expirationDate}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                className={`${styles.input} ${errors.expirationDate ? styles.inputError : ''}`}
                            />
                            {errors.expirationDate && <span className={styles.errorMessage}>{errors.expirationDate}</span>}
                        </div>
                        <div className={styles.inputHalf} style={{ position: 'relative' }}>
                            <input 
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                placeholder="CVV"
                                className={`${styles.input} ${errors.cvv ? styles.inputError : ''}`}
                            />
                            <Info className={styles.infoIcon} size={20} />
                            {errors.cvv && <span className={styles.errorMessage}>{errors.cvv}</span>}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <h2 className={styles.title}>Payment method</h2>
            <p className={styles.description}>
                Select a payment method below. Tripma processes your payment securely with
                end-to-end encryption.
            </p>

            <div className={styles.paymentMethods}>
                {['credit_card', 'google_pay', 'apple_pay', 'paypal', 'crypto'].map((method) => (
                    <button 
                        key={method}
                        type="button"
                        className={`${styles.paymentButton} ${paymentMethod === method ? styles.paymentButtonActive : styles.paymentButtonInactive}`}
                        onClick={() => setPaymentMethod(method)}
                    >
                        {method === 'credit_card' && <CreditCard size={15} />}
                        {method === 'google_pay' && 
                            <GooglePay />
                        }
                        {method === 'apple_pay' && 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.99463 16.0305C5.70717 15.8381 5.45191 15.6024 5.23859 15.3302C5.00582 15.0482 4.79007 14.7516 4.59195 14.4446C4.12641 13.7625 3.76237 13.0165 3.51015 12.2302C3.20628 11.3155 3.05859 10.4397 3.05859 9.58283C3.05859 8.62667 3.26523 7.79231 3.66756 7.09194C3.96536 6.54382 4.40901 6.08523 4.94383 5.76306C5.46042 5.44028 6.06209 5.26366 6.66984 5.25148C6.88255 5.25148 7.1135 5.28193 7.3566 5.34284C7.53284 5.39156 7.74556 5.47073 8.00689 5.56817C8.34115 5.69607 8.52348 5.77524 8.58425 5.79351C8.77873 5.86659 8.94282 5.89704 9.07045 5.89704C9.16769 5.89704 9.30747 5.86659 9.46245 5.81787C9.55057 5.78742 9.7177 5.73261 9.95472 5.62908C10.1893 5.54381 10.3753 5.47073 10.523 5.41592C10.7478 5.34893 10.9654 5.28802 11.1611 5.25757C11.3981 5.22103 11.6333 5.20885 11.8588 5.22712C12.2903 5.25757 12.6853 5.34893 13.0378 5.48291C13.6577 5.73261 14.1579 6.12238 14.5311 6.67659C14.3731 6.77403 14.2272 6.88731 14.0905 7.01155C13.7945 7.27343 13.5435 7.58403 13.3429 7.92813C13.0816 8.39707 12.9479 8.92692 12.9515 9.46286C12.9607 10.1224 13.1278 10.7022 13.462 11.2047C13.6972 11.5701 14.0115 11.8831 14.3943 12.1401C14.5827 12.268 14.748 12.3563 14.9048 12.4142C14.8319 12.6425 14.7517 12.8648 14.6587 13.0841C14.4478 13.5756 14.1968 14.0463 13.899 14.4909C13.6365 14.8746 13.4298 15.1608 13.273 15.3496C13.0287 15.642 12.7929 15.8612 12.5559 16.0177C12.2946 16.1913 11.9876 16.2833 11.6734 16.2833C11.4607 16.2924 11.248 16.265 11.045 16.2059C10.8688 16.1481 10.695 16.0829 10.5248 16.0092C10.3467 15.9276 10.1626 15.8582 9.97478 15.8021C9.74384 15.7412 9.50681 15.712 9.26736 15.7126C9.02426 15.7126 8.78724 15.7431 8.56237 15.8009C8.37397 15.8545 8.19164 15.9203 8.01114 15.9989C7.75589 16.1054 7.58876 16.1755 7.49152 16.2059C7.29461 16.2644 7.09283 16.2997 6.88984 16.3125C6.57382 16.3125 6.27966 16.2211 5.98673 16.0384L5.99463 16.0305ZM10.1601 4.78802C9.74687 4.99509 9.35427 5.08278 8.96105 5.05355C8.90028 4.66013 8.96105 4.25574 9.12515 3.81298C9.27101 3.43539 9.46549 3.09434 9.7329 2.78983C10.0125 2.47314 10.3467 2.21126 10.7235 2.02246C11.1246 1.81539 11.5075 1.70577 11.8722 1.6875C11.9208 2.10163 11.8722 2.50968 11.7202 2.94817C11.5817 3.33794 11.375 3.69727 11.1125 4.02005C10.8481 4.33674 10.5199 4.59861 10.1486 4.78741L10.1601 4.78802Z" fill="#605DEC"/>
                            </svg>
                        }
                        {method === 'paypal' && 
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.99463 16.0305C5.70717 15.8381 5.45191 15.6024 5.23859 15.3302C5.00582 15.0482 4.79007 14.7516 4.59195 14.4446C4.12641 13.7625 3.76237 13.0165 3.51015 12.2302C3.20628 11.3155 3.05859 10.4397 3.05859 9.58283C3.05859 8.62667 3.26523 7.79231 3.66756 7.09194C3.96536 6.54382 4.40901 6.08523 4.94383 5.76306C5.46042 5.44028 6.06209 5.26366 6.66984 5.25148C6.88255 5.25148 7.1135 5.28193 7.3566 5.34284C7.53284 5.39156 7.74556 5.47073 8.00689 5.56817C8.34115 5.69607 8.52348 5.77524 8.58425 5.79351C8.77873 5.86659 8.94282 5.89704 9.07045 5.89704C9.16769 5.89704 9.30747 5.86659 9.46245 5.81787C9.55057 5.78742 9.7177 5.73261 9.95472 5.62908C10.1893 5.54381 10.3753 5.47073 10.523 5.41592C10.7478 5.34893 10.9654 5.28802 11.1611 5.25757C11.3981 5.22103 11.6333 5.20885 11.8588 5.22712C12.2903 5.25757 12.6853 5.34893 13.0378 5.48291C13.6577 5.73261 14.1579 6.12238 14.5311 6.67659C14.3731 6.77403 14.2272 6.88731 14.0905 7.01155C13.7945 7.27343 13.5435 7.58403 13.3429 7.92813C13.0816 8.39707 12.9479 8.92692 12.9515 9.46286C12.9607 10.1224 13.1278 10.7022 13.462 11.2047C13.6972 11.5701 14.0115 11.8831 14.3943 12.1401C14.5827 12.268 14.748 12.3563 14.9048 12.4142C14.8319 12.6425 14.7517 12.8648 14.6587 13.0841C14.4478 13.5756 14.1968 14.0463 13.899 14.4909C13.6365 14.8746 13.4298 15.1608 13.273 15.3496C13.0287 15.642 12.7929 15.8612 12.5559 16.0177C12.2946 16.1913 11.9876 16.2833 11.6734 16.2833C11.4607 16.2924 11.248 16.265 11.045 16.2059C10.8688 16.1481 10.695 16.0829 10.5248 16.0092C10.3467 15.9276 10.1626 15.8582 9.97478 15.8021C9.74384 15.7412 9.50681 15.712 9.26736 15.7126C9.02426 15.7126 8.78724 15.7431 8.56237 15.8009C8.37397 15.8545 8.19164 15.9203 8.01114 15.9989C7.75589 16.1054 7.58876 16.1755 7.49152 16.2059C7.29461 16.2644 7.09283 16.2997 6.88984 16.3125C6.57382 16.3125 6.27966 16.2211 5.98673 16.0384L5.99463 16.0305ZM10.1601 4.78802C9.74687 4.99509 9.35427 5.08278 8.96105 5.05355C8.90028 4.66013 8.96105 4.25574 9.12515 3.81298C9.27101 3.43539 9.46549 3.09434 9.7329 2.78983C10.0125 2.47314 10.3467 2.21126 10.7235 2.02246C11.1246 1.81539 11.5075 1.70577 11.8722 1.6875C11.9208 2.10163 11.8722 2.50968 11.7202 2.94817C11.5817 3.33794 11.375 3.69727 11.1125 4.02005C10.8481 4.33674 10.5199 4.59861 10.1486 4.78741L10.1601 4.78802Z" fill="#605DEC"/>
                        </svg>
                        }
                        {method === 'crypto' && 
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.09562 13.4188C2.04552 13.7233 2.28043 14 2.58899 14H4.75968L4.59806 15.0173C4.50159 15.6246 4.97082 16.1742 5.58568 16.1742H7.3524C7.84403 16.1742 8.26274 15.8169 8.33998 15.3313L8.8418 12.1771H11.1101C12.5474 12.1771 13.7265 11.831 14.5667 11.0617C15.4069 10.2926 15.8041 9.23895 15.8041 7.96759C15.8041 6.8936 15.4535 6.00617 14.6993 5.38702C14.4843 5.20754 14.2447 5.05744 13.9824 4.93481C13.9023 4.05176 13.5497 3.36285 12.9244 2.86809C12.2073 2.28936 11.1611 2 9.78577 2H4.39927C4.15447 2 3.94566 2.17725 3.90591 2.41881L2.09562 13.4188ZM6.4861 9.50638H9.11573C10.7027 9.50638 11.9134 9.13759 12.7481 8.4C13.4189 7.8071 13.8202 7.03091 13.9518 6.07141C13.9892 6.09869 14.0252 6.12682 14.0598 6.15577L14.0598 6.15579L14.0635 6.15887C14.5395 6.54904 14.8041 7.12463 14.8041 7.96759C14.8041 9.0178 14.4846 9.78109 13.8915 10.3241C13.2984 10.8671 12.3981 11.1771 11.1101 11.1771H8.8418C8.35017 11.1771 7.93146 11.5344 7.85422 12.02L7.3524 15.1742H5.58568L6.4861 9.50638Z" fill="#605DEC"/>
                        </svg>
                        }
                        {method.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                ))}
            </div>

            {paymentMethod === 'credit_card' && (
                <>
                    <h3 className={styles.sectionTitle}>Credit card details</h3>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={billingAddressSame}
                            onChange={(e) => setBillingAddressSame(e.target.checked)}
                            className={styles.checkbox}
                        />
                        Billing address is same as Passenger 1
                    </label>
                    {!billingAddressSame && 
                    <div className={styles.inputGroup}>
                        <input 
                            type="text"
                            name="billingAddress"
                            value={formData.billingAddress}
                            onChange={handleInputChange}
                            placeholder="billing Address"
                            className={`${styles.input} ${errors.billingAddress ? styles.inputError : ''}`}
                        />
                    </div>
                    }
                </>
            )}

            {renderPaymentMethodFields()}

            <h3 className={styles.sectionTitle}>Create an account</h3>
            <p className={styles.description}>
                Tripma is free to use as a guest, but if you create an account today, you can save and view
                flights, manage your trips, earn rewards, and more.
            </p>

            <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className={styles.checkbox}
                />
                Save card {!userId? 'and create account for later' : 'to account'}
            </label>

            {saveCard &&  !userId && (
                    <>
                    {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                    {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
                    {errors.Signup && <span className={styles.errorMessage}>{errors.Signup}</span>}
                    <div className={styles.signupContainer}>
                        <div className={styles.signupForm}>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className={styles.signupInput}
                        />

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className={styles.signupInput}
                        />

                        <div className={styles.divider2}>
                            <div className={styles.divider3}> </div>
                                or
                            <div className={styles.divider3}> </div>
                        </div>

                        {/* Social login buttons */}
                        <button className={`${styles.socialButton} ${styles.googleButton}`} onClick={() => signIn('google')}>
                            <span className={styles.socialIcon}>
                                <GoogleIcon />
                            </span>
                            Continue with Google
                            <div className={styles.rightArrow}></div>
                        </button>

                        <button className={`${styles.socialButton} ${styles.appleButton}`}>
                            <span className={styles.socialIcon}>
                                <AppleIcon />
                            </span>
                            Continue with Apple
                            <div className={styles.rightArrow}></div>
                        </button>

                        <button className={`${styles.socialButton} ${styles.facebookButton}`}>
                            <span className={styles.socialIcon}>
                                <FacebookIcon />
                            </span>
                            Continue with Facebook
                            <div className={styles.rightArrow}></div>
                        </button>
                        </div>
                    </div>
                    </>
                    
            )}


            <h3 className={styles.sectionTitle}>Cancellation policy</h3>
            <p className={styles.description}>
                This flight has a flexible cancellation policy. If you cancel or change your flight up to 30 days
                before the departure date, you are eligible for a free refund. All flights booked on Tripma are
                backed by our satisfaction guarantee; however cancellation policies vary by airline. See the full
                cancellation policy for this flight.
            </p>
            
            {errors.reqResponse && <span className={styles.reqResponse}>{errors.reqResponse}</span>}
            <div className={styles.actionButtons}>
                <button type="submit" className={styles.confirmButton} disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Save and close'}
                </button>
                <button type="button" className={styles.backButton} onClick={goBackToSeats}>prev seats</button>{/*confirmButton */}
            </div>
        </form>
    );
}

const GooglePay = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_85_11924)">
    <path d="M16.1171 9.13689C16.1171 8.53945 16.0687 8.10348 15.9638 7.65137H9.1416V10.3479H13.146C13.0653 11.018 12.6294 12.0272 11.6605 12.7054L11.6469 12.7956L13.804 14.4667L13.9534 14.4816C15.3259 13.214 16.1171 11.349 16.1171 9.13689Z" fill="#4285F4"/>
    <path d="M9.14154 16.2412C11.1034 16.2412 12.7504 15.5953 13.9534 14.4812L11.6605 12.705C11.0469 13.1329 10.2234 13.4316 9.14154 13.4316C7.22005 13.4316 5.58921 12.1641 5.00785 10.4121L4.92264 10.4193L2.67972 12.1552L2.65039 12.2367C3.84526 14.6103 6.29963 16.2412 9.14154 16.2412Z" fill="#34A853"/>
    <path d="M5.00848 10.4124C4.85509 9.9603 4.76631 9.47585 4.76631 8.97531C4.76631 8.47472 4.85509 7.99033 5.00041 7.53821L4.99635 7.44192L2.72532 5.67822L2.65102 5.71357C2.15855 6.69855 1.87598 7.80465 1.87598 8.97531C1.87598 10.146 2.15855 11.252 2.65102 12.237L5.00848 10.4124Z" fill="#FBBC05"/>
    <path d="M9.14154 4.51856C10.506 4.51856 11.4263 5.10793 11.9511 5.60045L14.0018 3.59819C12.7424 2.42753 11.1034 1.70898 9.14154 1.70898C6.29963 1.70898 3.84526 3.33983 2.65039 5.71343L4.99978 7.53808C5.58921 5.78612 7.22005 4.51856 9.14154 4.51856Z" fill="#EB4335"/>
    </g>
    <g clipPath="url(#clip1_85_11924)">
    <path d="M16.1171 9.13689C16.1171 8.53945 16.0687 8.10348 15.9638 7.65137H9.1416V10.3479H13.146C13.0653 11.018 12.6294 12.0272 11.6605 12.7054L11.6469 12.7956L13.804 14.4667L13.9534 14.4816C15.3259 13.214 16.1171 11.349 16.1171 9.13689Z" fill="#605DEC"/>
    <path d="M9.14154 16.2412C11.1034 16.2412 12.7504 15.5953 13.9534 14.4812L11.6605 12.705C11.0469 13.1329 10.2234 13.4316 9.14154 13.4316C7.22005 13.4316 5.58921 12.1641 5.00785 10.4121L4.92264 10.4193L2.67972 12.1552L2.65039 12.2367C3.84526 14.6103 6.29963 16.2412 9.14154 16.2412Z" fill="#605DEC"/>
    <path d="M5.00848 10.4124C4.85509 9.9603 4.76631 9.47585 4.76631 8.97531C4.76631 8.47472 4.85509 7.99033 5.00041 7.53821L4.99635 7.44192L2.72532 5.67822L2.65102 5.71357C2.15855 6.69855 1.87598 7.80465 1.87598 8.97531C1.87598 10.146 2.15855 11.252 2.65102 12.237L5.00848 10.4124Z" fill="#605DEC"/>
    <path d="M9.14154 4.51856C10.506 4.51856 11.4263 5.10793 11.9511 5.60045L14.0018 3.59819C12.7424 2.42753 11.1034 1.70898 9.14154 1.70898C6.29963 1.70898 3.84526 3.33983 2.65039 5.71343L4.99978 7.53808C5.58921 5.78612 7.22005 4.51856 9.14154 4.51856Z" fill="#605DEC"/>
    </g>
    <defs>
    <clipPath id="clip0_85_11924">
    <rect width="14.25" height="14.5825" fill="white" transform="translate(1.875 1.70898)"/>
    </clipPath>
    <clipPath id="clip1_85_11924">
    <rect width="14.25" height="14.5825" fill="white" transform="translate(1.875 1.70898)"/>
    </clipPath>
    </defs>
    </svg>
)
const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_2784_10043)">
        <path d="M16.1176 9.1364C16.1176 8.53896 16.0692 8.10299 15.9642 7.65088H9.14209V10.3474H13.1465C13.0658 11.0175 12.6299 12.0267 11.661 12.7049L11.6474 12.7952L13.8045 14.4662L13.9539 14.4811C15.3264 13.2135 16.1176 11.3485 16.1176 9.1364Z" fill="#4285F4"/>
        <path d="M9.14203 16.2411C11.1039 16.2411 12.7509 15.5952 13.9539 14.4811L11.661 12.7048C11.0474 13.1327 10.2239 13.4315 9.14203 13.4315C7.22054 13.4315 5.58969 12.1639 5.00834 10.412L4.92313 10.4192L2.68021 12.155L2.65088 12.2366C3.84575 14.6102 6.30012 16.2411 9.14203 16.2411Z" fill="#34A853"/>
        <path d="M5.00848 10.412C4.85509 9.95993 4.76631 9.47548 4.76631 8.97494C4.76631 8.47435 4.85509 7.98996 5.00041 7.53785L4.99635 7.44156L2.72532 5.67786L2.65102 5.7132C2.15855 6.69818 1.87598 7.80428 1.87598 8.97494C1.87598 10.1456 2.15855 11.2516 2.65102 12.2366L5.00848 10.412Z" fill="#FBBC05"/>
        <path d="M9.14203 4.51832C10.5064 4.51832 11.4268 5.10768 11.9516 5.6002L14.0023 3.59795C12.7428 2.42729 11.1039 1.70874 9.14203 1.70874C6.30012 1.70874 3.84575 3.33958 2.65088 5.71319L5.00027 7.53784C5.58969 5.78588 7.22054 4.51832 9.14203 4.51832Z" fill="#EB4335"/>
        </g>
        <defs>
        <clipPath id="clip0_2784_10043">
            <rect width="14.25" height="14.5825" fill="white" transform="translate(1.875 1.70874)"/>
        </clipPath>
        </defs>
    </svg>
)
const AppleIcon  = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.99463 16.0305C5.70717 15.8381 5.45191 15.6024 5.23859 15.3302C5.00582 15.0482 4.79007 14.7516 4.59195 14.4446C4.12641 13.7625 3.76237 13.0165 3.51015 12.2302C3.20628 11.3155 3.05859 10.4397 3.05859 9.58283C3.05859 8.62667 3.26523 7.79231 3.66756 7.09194C3.96536 6.54382 4.40901 6.08523 4.94383 5.76306C5.46042 5.44028 6.06209 5.26366 6.66984 5.25148C6.88255 5.25148 7.1135 5.28193 7.3566 5.34284C7.53284 5.39156 7.74556 5.47073 8.00689 5.56817C8.34115 5.69607 8.52348 5.77524 8.58425 5.79351C8.77873 5.86659 8.94282 5.89704 9.07045 5.89704C9.16769 5.89704 9.30747 5.86659 9.46245 5.81787C9.55057 5.78742 9.7177 5.73261 9.95472 5.62908C10.1893 5.54381 10.3753 5.47073 10.523 5.41592C10.7478 5.34893 10.9654 5.28802 11.1611 5.25757C11.3981 5.22103 11.6333 5.20885 11.8588 5.22712C12.2903 5.25757 12.6853 5.34893 13.0378 5.48291C13.6577 5.73261 14.1579 6.12238 14.5311 6.67659C14.3731 6.77403 14.2272 6.88731 14.0905 7.01155C13.7945 7.27343 13.5435 7.58403 13.3429 7.92813C13.0816 8.39707 12.9479 8.92692 12.9515 9.46286C12.9607 10.1224 13.1278 10.7022 13.462 11.2047C13.6972 11.5701 14.0115 11.8831 14.3943 12.1401C14.5827 12.268 14.748 12.3563 14.9048 12.4142C14.8319 12.6425 14.7517 12.8648 14.6587 13.0841C14.4478 13.5756 14.1968 14.0463 13.899 14.4909C13.6365 14.8746 13.4298 15.1608 13.273 15.3496C13.0287 15.642 12.7929 15.8612 12.5559 16.0177C12.2946 16.1913 11.9876 16.2833 11.6734 16.2833C11.4607 16.2924 11.248 16.265 11.045 16.2059C10.8688 16.1481 10.695 16.0829 10.5248 16.0092C10.3467 15.9276 10.1626 15.8582 9.97478 15.8021C9.74384 15.7412 9.50681 15.712 9.26736 15.7126C9.02426 15.7126 8.78724 15.7431 8.56237 15.8009C8.37397 15.8545 8.19164 15.9203 8.01114 15.9989C7.75589 16.1054 7.58876 16.1755 7.49152 16.2059C7.29461 16.2644 7.09283 16.2997 6.88984 16.3125C6.57382 16.3125 6.27966 16.2211 5.98673 16.0384L5.99463 16.0305ZM10.1601 4.78802C9.74687 4.99509 9.35427 5.08278 8.96105 5.05355C8.90028 4.66013 8.96105 4.25574 9.12515 3.81298C9.27101 3.43539 9.46549 3.09434 9.7329 2.78983C10.0125 2.47314 10.3467 2.21126 10.7235 2.02246C11.1246 1.81539 11.5075 1.70577 11.8722 1.6875C11.9208 2.10163 11.8722 2.50968 11.7202 2.94817C11.5817 3.33794 11.375 3.69727 11.1125 4.02005C10.8481 4.33674 10.5199 4.59861 10.1486 4.78741L10.1601 4.78802Z" fill="#27273F"/>
    </svg>
)
const FacebookIcon  = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.0393 2.25H2.96074C2.77634 2.26245 2.6027 2.34133 2.47202 2.47202C2.34133 2.6027 2.26245 2.77634 2.25 2.96074V15.0393C2.25104 15.2274 2.32626 15.4076 2.45932 15.5407C2.59238 15.6737 2.77256 15.749 2.96074 15.75H9.42644V10.4921H7.72068V8.50288H9.49712V7.01074C9.45883 6.65289 9.49993 6.291 9.6175 5.95086C9.73506 5.61071 9.9262 5.30068 10.1773 5.04284C10.4284 4.78501 10.7332 4.58572 11.0701 4.45918C11.407 4.33264 11.7677 4.28195 12.1264 4.31074C12.8372 4.31074 13.4764 4.38141 13.6893 4.38141V6.22932H12.6236C11.7707 6.22932 11.6285 6.65576 11.6285 7.22435V8.50288H13.6178L13.3335 10.5636H11.5579V15.75H15.0393C15.2274 15.749 15.4076 15.6737 15.5407 15.5407C15.6737 15.4076 15.749 15.2274 15.75 15.0393V2.96074C15.7375 2.77634 15.6587 2.6027 15.528 2.47202C15.3973 2.34133 15.2237 2.26245 15.0393 2.25V2.25Z" fill="#407AEA"/>
    </svg>
)