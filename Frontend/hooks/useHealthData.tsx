import { Pedometer } from 'expo-sensors';
import { useEffect, useState } from 'react';

const useHealthData = (date: Date) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    let subscription: { remove: () => void } | null = null;

    const startPedometer = async () => {
      const available = await Pedometer.isAvailableAsync();
      setIsAvailable(available);
      if (!available) {
        console.log('Pedometer not available');
        return;
      }
      
      
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const { steps } = await Pedometer.getStepCountAsync(startOfDay, endOfDay);
      setSteps(steps || 0);
      setDistance((steps || 0) * 0.762); 

     
      subscription = Pedometer.watchStepCount((result) => {
        setSteps((prevSteps) => prevSteps + result.steps);
        setDistance((prevDistance) => prevDistance + result.steps * 0.762);
      });
    };

    startPedometer();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [date]);

  return {
    isAvailable,
    steps,
    distance,
  };
};

export default useHealthData;
