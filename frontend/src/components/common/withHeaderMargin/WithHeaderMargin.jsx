import { VITE_BASE_URL } from '@/constants';
import { Alert, Box } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const WithHeaderMargin = ({ children }) => {

  const calculateRemainingTime = (subscription) => {
    if (!subscription || !subscription.type || !subscription.expirationDate) {
      return null;
    }

    const expirationDate = new Date(subscription.expirationDate);
    const currentDate = new Date();
    const timeDifference = expirationDate - currentDate;

    switch (subscription.type) {
      case 'Yearly':
      case 'Monthly':
        // Calculate 7 days before expiration
        const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        const expiryDate7DaysBefore = new Date(expirationDate - sevenDaysInMilliseconds);
        const daysRemaining7DaysBefore = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

        if (daysRemaining7DaysBefore < 8) {
          return {
            text: 'days remaining',
            value: daysRemaining7DaysBefore,
          };
        }

      case 'Days':
        // Calculate 1 day before expiration
        const oneDayInMilliseconds = 1 * 24 * 60 * 60 * 1000;
        const expiryDate1DayBefore = new Date(expirationDate - oneDayInMilliseconds);
        const daysRemaining1DayBefore = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

        if (daysRemaining1DayBefore < 3) {
          return {
            text: 'days remaining',
            value: daysRemaining1DayBefore,
          };
        }

      case 'Hourly':
        // Calculate 2 hours before expiration
        const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
        const expiryDate2HoursBefore = new Date(expirationDate - twoHoursInMilliseconds);
        const hoursRemaining2HoursBefore = Math.floor(timeDifference / (60 * 60 * 1000));

        if (hoursRemaining2HoursBefore < 3) {
          return {
            text: 'hours remaining',
            value: hoursRemaining2HoursBefore,
          };
        }

      default:
        return null;
    }
  };


  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)
  const [alertData, setAlertData] = useState(null)

  const userId = localStorage.getItem("userId")

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${VITE_BASE_URL}/auth/userinfo/${userId}`);
      setUser(response.data);
      setLoading(true)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    if (loading) {
      const subscription = {
        type: user.subscription.type,
        expirationDate: user.subscription.expirationDate,
      };
      const expiryHours = calculateRemainingTime(subscription)
      setAlertData(expiryHours)
    }
  }, [loading]);

  console.log(alertData);

  if (alertData != null && loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: '20px', paddingTop: '20px' }}>
        <Box sx={{ width: '50%', marginInline: 'auto' }}>
          <Alert severity="error" sx={{ border: '#6d0202 1.5px solid' }}>
            {alertData.value} {alertData.text} Before Plan Expiration, <Link to={'/subscribe'}>Upgrade Plan to countinue</Link>
          </Alert>
        </Box>
        <Box>
          {children}
        </Box>
      </Box>
    )
  }
  else {
    return (
      <Box marginTop="4.5rem">
        {children}
      </Box>
    )
  }

};

WithHeaderMargin.propTypes = { children: PropTypes.node.isRequired };

export default WithHeaderMargin;
