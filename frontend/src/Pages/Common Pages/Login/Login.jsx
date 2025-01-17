import React, { useState, useMemo } from 'react';
import s from './LoginStyle.module.css';
import Breadcrumbs from "../../../Components/Breadcrumbs/Breadcrumbs";
import { db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { getDocs, where, query, collection } from 'firebase/firestore';
import ErrorFields from '../../../Components/ErrorFields/ErrorFields';

const Login = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const usersCollectionRef = useMemo(() => collection(db, 'Users'), []);

  const handleLogin = async () => {
    try {
      const q = query(usersCollectionRef, where("email", "==", email));
      const userSnaps = await getDocs(q);

      if (userSnaps.docs.length === 0) {
        setErrorMessage('Ο χρήστης δεν βρέθηκε!');
        return;
      }
      const userData = userSnaps.docs[0].data();
      const isPasswordCorrect = userData.password === password;

      if (!isPasswordCorrect) {
        setErrorMessage('Λανθασμένος κωδικός!');
        return;
      }
      localStorage.setItem('user', JSON.stringify({...userData, id: userSnaps.docs[0].id}));
      navigate(`/${userData.role}/`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.breadcrumbs_container}>
        <Breadcrumbs
          breadcrumbItems={[
            { label: 'Αρχική Σελίδα', route: ''},
            { label: 'Σύνδεση με taxis', route: '.'},
          ]}
        />
      </div>
      
      <div className={s.step}>
        <h2 className={s.step_text}>Σύνδεση</h2>
        <hr />

        {errorMessage &&
          <ErrorFields
            error={errorMessage}
            width={'50%'}
            onXmarkClick={() => {setErrorMessage(null)}}
          />
        }

        <div className={s.login_form}>
          <div className={s.input_container}>
            <label>Email</label>
            <input
              placeholder='Email'
              value={email}
              type='email'
              onChange={(e) => setEmail(e.target.value.trim())}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div className={s.input_container}>
            <label>Κωδικός</label>
            <input
              placeholder='Κωδικός'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <button
            className={`${s.button} ${!email || !password ? s.disabled : ''}`}
            onClick={handleLogin}
            disabled={!email || !password}
          >Σύνδεση</button>
        </div>
      </div>
    </div>   
  );
};

export default Login;