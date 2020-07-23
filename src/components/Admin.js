import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom';

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
  }, []);
  return (
    <div>
      <h2>Ruta Protegida</h2>
    </div>
  );
};

export default withRouter(Admin);
