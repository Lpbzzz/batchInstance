import { BatchValidatorProvider } from '@/components/BatchValidate/batchContext';
import MyForm from './MyForm';

const RulesForm = () => {
  return (
    <BatchValidatorProvider>
      <MyForm />
    </BatchValidatorProvider>
  );
};
export default RulesForm;
