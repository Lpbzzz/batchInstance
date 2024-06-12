import { rulesRequest } from '@/services/form';
import { createContext, ReactNode } from 'react';
import { BatchRequest } from '../BatchValidate';
export const BatchValidatorContext = createContext<BatchRequest | null>(null);
export const BatchValidatorProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const batchRequest = new BatchRequest(rulesRequest, 2);
  return (
    <BatchValidatorContext.Provider value={batchRequest}>
      {children}
    </BatchValidatorContext.Provider>
  );
};
