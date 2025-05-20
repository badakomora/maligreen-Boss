import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../AppConfig";

export const Dynamics = () => {
  // server states
  const [productionStock, setProductionStock] = useState(0);
  const [runningBalance, setRunningBalance] = useState(0);
  const [previousBalance, setPreviousBalance] = useState(0);

  useEffect(() => {
    fetchStock();
    fetchBalance();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await axios.get(`${serverUrl}production/metrics`);
      setProductionStock(response.data.stock);
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await axios.get(`${serverUrl}expense/currentBalance`);
      setRunningBalance(response.data.runningBalance);
      setPreviousBalance(response.data.previousbalance);
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  };

  return { productionStock, runningBalance, previousBalance };
};
