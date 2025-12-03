import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState(0);
  const [txResult, setTxResult] = useState(null);

  return (
    <AppContext.Provider
      value={{
        product,
        setProduct,
        amount,
        setAmount,
        txResult,
        setTxResult
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);