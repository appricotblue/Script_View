import { useTheme } from '@emotion/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import CheckCircle from '@assets/images/CheckCircle.svg';
import { Link } from 'react-router-dom';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const PricingPlans = () => {
    const { palette } = useTheme();
    const [subscriptionPlans, SetSubscriptionPlans] = useState([
        {
            name: 'Monthly Plan',
            features: [
                'Elit at pharetra donec dictumst blandit bibendum sapien turpis at.',
                'Felis ut quisque ut in velit mauris.',
                'Lacus et id massa sit quis scelerisque lacus enim libero.',
                'Arcu velit eu pretium pellentesque quis amet justo.',
            ],
            price: 300,
            period: 'Per Month',
        },
        {
            name: 'Yearly Plan',
            features: [
                'Elit at pharetra donec dictumst blandit bibendum sapien turpis at.',
                'Felis ut quisque ut in velit mauris.',
                'Lacus et id massa sit quis scelerisque lacus enim libero.',
                'Arcu velit eu pretium pellentesque quis amet justo.',
            ],
            price: 2000,
            period: 'Per Year',
        },
        {
            name: 'Free Demo',
            features: [
                'Elit at pharetra donec dictumst blandit bibendum sapien turpis at.',
                'Felis ut quisque ut in velit mauris.',
                'Lacus et id massa sit quis scelerisque lacus enim libero.',
                'Arcu velit eu pretium pellentesque quis amet justo.',
            ],
            price: 0,
            period: ' ',
        },
    ]);
    const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0]);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    return (
        <Box
            sx={{
                backgroundColor: palette.primary.main,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{}}>
                <Box sx={{ marginBottom: '30px' }}>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: '#fff',
                            fontSize: '36px',
                            fontWeight: '700',
                        }}
                    >
                        Pricing Plans
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        width: 'min-content',
                        gap: '50px',
                        marginInline: 'auto',
                    }}
                >
                    {subscriptionPlans.map((plan, index) => (
                        <Box
                            key={index}
                            sx={{
                                height: '411px',
                                width: '250px',
                                backgroundColor: '#C5AC57',
                                textAlign: 'center',
                                marginInline: 'auto',
                            }}
                        >
                            <Typography
                                sx={{ fontWeight: '600', fontSize: '20px', padding: '5px' }}
                            >
                                {plan.name}
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor: '#434343',
                                    height: '89.8%',
                                    margin: '1px',
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Box
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.699)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '15px',
                                        width: '95%',
                                        justifyContent: 'space-evenly',
                                        alignItems: 'center',
                                        marginInline: 'auto',
                                        marginBlock: 'auto',
                                    }}
                                >
                                    {plan.features.map((feature, featureIndex) => (
                                        <Box
                                            key={featureIndex}
                                            sx={{ display: 'flex', gap: '10px' }}
                                        >
                                            <Box
                                                sx={{ marginBottom: 'auto' }}
                                                width="20px"
                                                component="img"
                                                src={CheckCircle}
                                            />
                                            <Typography sx={{ textAlign: 'start', color: '' }}>
                                                {feature}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        alignItems: 'center',
                                        marginTop: 'auto',
                                        paddingBottom: '20px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-around',
                                            backgroundColor: '#393939',
                                            width: 'max-content',
                                            paddingInline: '20px',
                                            paddingBlock: '5px',
                                            borderRadius: '4px',
                                            color: 'rgba(255, 255, 255, 0.699)',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '26px',
                                                fontWeight: '700',
                                                height: '35px',
                                            }}
                                        >
                                            ₹{plan.price}
                                        </Typography>
                                        <Typography style={{ fontSize: '10px', fontWeight: '300' }}>
                                            {plan.period}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Button
                                            sx={{
                                                width: '144px',
                                                background:
                                                    'linear-gradient(93.69deg, #C5AC57 10.11%, #C5AC57 46.89%, #E1D5AB 85.01%)',
                                            }}
                                            onClick={() => handlePlanSelect(plan)}
                                        >
                                            Subscribe Now
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: 'rgba(255, 255, 255, 0.699)',
                        marginTop: '40px',
                        fontSize: '20px',
                        fontWeight: '700',
                    }}
                >
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}> <CaretLeft />Back To Login</Link>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>Skip For Now <CaretRight /></Link>
                </Box>
            </Box>
        </Box>
    );
};

export default PricingPlans;
