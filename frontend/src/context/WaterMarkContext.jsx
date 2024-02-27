import { createContext, useContext, useState } from 'react';

const WaterMarkContext = createContext();

export const WaterMarkProvider = ({ children }) => {
    const [waterMark, setWatermark] = useState('Script View');

    //   const setWaterMarkValue = (value) => {
    //     setWatermark(value);
    //   };

    return (
        <WaterMarkContext.Provider value={{ waterMark, setWatermark }}>
            {children}
        </WaterMarkContext.Provider>
    );
};

export const useWatermarkContent = () => {
    const context = useContext(WaterMarkContext);
    if (!context) {
        throw new Error('error in Water Mark provider');
    }

    return context;
};