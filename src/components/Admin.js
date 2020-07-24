import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom';
import Firestore from './Firestore';

const Admin = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      console.log('This user already exits');
      setUser(auth.currentUser);
    } else {
      console.log('This user doesnt exists');
      props.history.push('/login');
    }
  }, [props.history]);
  return (
    <div className='mt-5'>
      <h3 className='text-center'>Ruta Protegida</h3>
      {user && <Firestore user={user} />}
    </div>
  );
};

export default withRouter(Admin);
