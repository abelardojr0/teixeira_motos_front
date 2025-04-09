import {
  BoxInputMoleculeStyled,
  InputAtomStyled,
  LabelAtomStyled,
  ErrorText,
} from "./style";

interface BoxInputMoleculeProps {
  htmlFor: string;
  children: string;
  type: string;
  id: string;
  placeholder?: string;
  value?: any;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange?: (e: any) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onInputClearError?: () => void;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  fullWidth?: boolean;
}

export const BoxInputMolecule = ({
  children,
  error,
  errorMessage,
  onInputClearError,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  step,
  fullWidth,
  ...props
}: BoxInputMoleculeProps) => {
  const handleChange = (e: any) => {
    if (onInputClearError) onInputClearError();
    if (onChange) onChange(e);
  };

  return (
    <BoxInputMoleculeStyled fullWidth={fullWidth}>
      <LabelAtomStyled htmlFor={props.htmlFor}>{children}</LabelAtomStyled>
      <InputAtomStyled
        {...props}
        error={error}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoComplete="off"
        step={step} // Passando o step para o InputAtomStyled
      />
      {error && errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </BoxInputMoleculeStyled>
  );
};
