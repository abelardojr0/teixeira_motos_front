import { z } from 'zod';

export const registerSchema = z
  .object({
    nome: z
      .string()
      .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/\d/, 'A senha deve conter pelo menos um número')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'A senha deve conter pelo menos um caractere especial',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
