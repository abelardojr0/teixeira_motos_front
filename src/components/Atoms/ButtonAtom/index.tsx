import { ButtonAtomStyled } from "./style";
interface ButtonAtomProps {
  children: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  fullWidth?: boolean;
}

export const ButtonAtom = ({ children, ...props }: ButtonAtomProps) => {
  return <ButtonAtomStyled {...props}>{children}</ButtonAtomStyled>;
};
