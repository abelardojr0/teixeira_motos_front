import {
  BoxInputMoleculeStyled,
  ErrorText,
  LabelAtomStyled,
} from "../BoxInputMolecule/style";
import { TextareaAtomStyled } from "./style";
interface BoxTextareaMoleculeProps {
  htmlFor: string;
  children: string;
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
  rows?: number;
  cols?: number;
  fullWidth?: boolean;
}

export const BoxTextareaMolecule = ({
  children,
  error,
  errorMessage,
  onInputClearError,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  rows = 4,
  cols,
  fullWidth,
  ...props
}: BoxTextareaMoleculeProps) => {
  const handleChange = (e: any) => {
    if (onInputClearError) onInputClearError();
    if (onChange) onChange(e);
  };

  return (
    <BoxInputMoleculeStyled fullWidth={fullWidth}>
      <LabelAtomStyled htmlFor={props.htmlFor}>{children}</LabelAtomStyled>
      <TextareaAtomStyled
        {...props}
        rows={rows}
        cols={cols}
        error={error}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoComplete="off"
      />
      {error && errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </BoxInputMoleculeStyled>
  );
};
