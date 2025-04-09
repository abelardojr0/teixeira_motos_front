import { useCallback, useState } from 'react';
import api from '../services';
import { messageError, messageSuccess } from '../utils/toast';
import { useNavigate } from 'react-router-dom';
import { Cliente } from '../utils/type';

export const useClientes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const navigate = useNavigate();

  const cadastrarCliente = async (novoCliente: Cliente) => {
    setLoading(true);
    try {
      const { data } = await api.post('/clientes', novoCliente);
      messageSuccess('Cliente cadastrado com sucesso!');
      navigate('/clientes');
      return data;
    } catch (error: any) {
      messageError('Erro ao cadastrar cliente. Tente novamente.');
      return error.response?.data;
    } finally {
      setLoading(false);
    }
  };

  const buscarClientes = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/clientes');
      setClientes(data);
    } catch (error: any) {
      messageError('Erro ao carregar clientes. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  const buscarCliente = async (id: string | undefined) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/clientes/${id}`);
      setCliente(data);
    } catch (error: any) {
      messageError('Erro ao carregar cliente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const atualizarCliente = async (id: string, clienteData: Cliente) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/clientes/${id}`, clienteData);
      messageSuccess('Cliente atualizado com sucesso!');
      navigate('/clientes');
      return data;
    } catch (error: any) {
      messageError('Erro ao atualizar cliente. Tente novamente.');
      return error.response?.data;
    } finally {
      setLoading(false);
    }
  };

  const deletarCliente = async (id: string | undefined) => {
    try {
      const { data } = await api.delete(`/clientes/${id}`);
      messageSuccess('Cliente excluído com sucesso!');
      setClientes((prevClientes) =>
        prevClientes.filter((cliente) => cliente.id !== id),
      );
      return data;
    } catch (error: any) {
      messageError('Erro ao excluir cliente. Tente novamente.');
      return error.response?.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    cadastrarCliente,
    buscarClientes,
    buscarCliente,
    atualizarCliente,
    deletarCliente,
    cliente,
    clientes,
    loading,
  };
};
