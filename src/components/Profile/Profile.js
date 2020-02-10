import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';
import NavBar from '../Shared/NavBar';

export default function Profile(props) {
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser, onHandleLogout } = props;

  useEffect(() => {
    setIsLoading(false);
  }, [currentUser]);

  return (
    <div>
      {isLoading && !currentUser
        ? (
          <div>
            <Spinner animation="border" role="status" className="isLoadingSpinner" />
            <div>
              Loading Please Wait...
            </div>
          </div>
        )
        : (
          <div>
            <NavBar />
            {currentUser ? `Hi ${currentUser.username}` : null}
            <div>
              <Button onClick={() => onHandleLogout()}>Logout</Button>
            </div>
          </div>
        )}
    </div>
  );
}
