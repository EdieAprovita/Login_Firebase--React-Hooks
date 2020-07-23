import React, { useState, useCallback } from 'react';
import { auth, db } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [esRegistro, setEsRegistro] = useState(true);

  const procesData = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Enter your email');
      return;
    }
    if (!password.trim()) {
      setError('Enter your password');
      return;
    }
    if (password.length < 6) {
      setError('Password needs to be longer than 5 characters');
      return;
    }

    setError(null);

    if (esRegistro) {
      registrar();
    } else {
      login();
    }
  };

  const login = useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      console.log(res.user);
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/user-not-found') setError(error.message);
      if (error.code === 'auth/wrong-password') setError(error.message);
    }
  }, [email, password]);
  const registrar = useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      await db.collection('users').doc(res.user.email).set({
        email: res.user.email,
        uid: res.user.uid,
      });

      setEmail('');
      setPassword('');
      setError(null);
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/invalid-email') setError(error.message);
      if (error.code === 'auth/email-already-in-use') setError(error.message);
    }
  }, [email, password]);

  return (
    <div className='mt-5'>
      <h3 className='text-center'>
        {esRegistro ? 'Signup ' : 'Login account'}
      </h3>
      <hr />
      <div className='row justify-content-center'>
        <div className='col-12 col-sm-8 col-md-6 col-xl-4'>
          <form onSubmit={procesData}>
            {error && <div className='alert alert-danger'>{error}</div>}
            <input
              type='email'
              className='form-control mb-2'
              placeholder='Enter your Email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type='password'
              className='form-control mb-2'
              placeholder='Enter you password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className='btn btn-lg btn-dark btn-block' type='submit'>
              {esRegistro ? 'Register' : 'Access'}
            </button>
            <button
              className='btn btn-sm btn-info btn-block'
              type='button'
              onClick={() => setEsRegistro(!esRegistro)}
            >
              {esRegistro
                ? 'Already have an account?'
                : 'Don´t have an account?'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
