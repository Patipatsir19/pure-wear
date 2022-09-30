import { InputHTMLAttributes, FC } from 'react';

import {Input, FormInputLabal, Group} from './form-input.styles';

type FormInputProps = {label: string}& InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabal
          shrink={Boolean(otherProps.value && 
          typeof otherProps.value == 'string' && 
          otherProps.value.length)}>
          {label}
        </FormInputLabal>
      )}
    </Group>
  );
};

export default FormInput;