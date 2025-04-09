import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../../../contexts/AuthProvider';
import { ContainerAuth, FormStyled } from '../../../utils/globalStyles';
import { BoxInputMolecule } from '../../../components/Molecules/BoxInputMolecule';
import { ButtonAtom } from '../../../components/Atoms/ButtonAtom';
import { messageError } from '../../../utils/toast';
import { loginSchema } from '../../../schemas/login';

export const Login = () => {
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const { email, password } = data;

      const { data: responseData } = await auth.signin(email, password);
      if (!responseData) {
        setError('email', {
          type: 'server',
          message: 'Credenciais inválidas',
        });
        return;
      }
    } catch (error) {
      messageError('Erro ao fazer login');
      console.error(error);
    }
  };

  return (
    <ContainerAuth>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <BoxInputMolecule
          type="email"
          htmlFor="email"
          id="email"
          children="Email"
          {...register('email')}
          error={!!errors.email}
          errorMessage={errors.email?.message as string | undefined}
        />
        <BoxInputMolecule
          type="password"
          htmlFor="password"
          id="password"
          children="Senha"
          {...register('password')}
          error={!!errors.password}
          errorMessage={errors.password?.message as string | undefined}
        />
        <ButtonAtom disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </ButtonAtom>
      </FormStyled>
    </ContainerAuth>
  );
};
