import { ButtonAtomStyled } from "./style";

interface ButtonAtomProps {
  children: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: any) => void;
}
export const ButtonSecundaryAtom = ({
  children,
  type,
  ...props
}: ButtonAtomProps) => {
  return (
    <ButtonAtomStyled type="button" {...props}>
      {children}
    </ButtonAtomStyled>
  );
};
