import {Input, FormInpoutLabal, Group} from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInpoutLabal
          shrink={otherProps.value.length}>
          {label}
        </FormInpoutLabal>
      )}
    </Group>
  );
};

export default FormInput;