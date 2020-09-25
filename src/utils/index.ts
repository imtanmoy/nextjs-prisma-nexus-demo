import { FieldData } from 'rc-field-form/es/interface';

const createFieldsError = (errs: Record<string, string>): FieldData[] => {
  const tempErrors: FieldData[] = [];

  Object.keys(errs).forEach((property) => {
    if (errs[property]) {
      tempErrors.push({
        name: property,
        errors: [errs[property]],
      });
    }
  });
  return tempErrors;
};
export default createFieldsError;
