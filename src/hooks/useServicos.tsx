import { useCallback, useState } from "react";
import api from "../services";
import { messageError, messageSuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { Servico } from "../utils/type";

export const useServicos = () => {
  const [loading, setLoading] = useState(false);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [servico, setServico] = useState<Servico | null>(null);
  const navigate = useNavigate();

  const cadastrarServico = async (novo: Servico) => {
    setLoading(true);
    try {
      const { data } = await api.post("/servicos", novo);
      messageSuccess("Serviço cadastrado com sucesso!");
      navigate("/servicos");
      return data;
    } catch (err: any) {
      messageError("Erro ao cadastrar serviço.");
      return err.response?.data;
    } finally {
      setLoading(false);
    }
  };

  const buscarServicos = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/servicos");
      const nova_data: Servico[] = [];
      data.forEach((element: any) => {
        element.type = "Serviço";
        nova_data.push(element);
      });
      setServicos(data);
    } catch (err) {
      messageError("Erro ao carregar serviços.");
    } finally {
      setLoading(false);
    }
  }, []);

  const buscarServico = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/servicos/${id}`);
      setServico(data);
    } catch (err) {
      messageError("Erro ao buscar serviço.");
    } finally {
      setLoading(false);
    }
  };

  const atualizarServico = async (id: string, servicoData: Servico) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/servicos/${id}`, servicoData);
      messageSuccess("Serviço atualizado com sucesso!");
      navigate("/servicos");
      return data;
    } catch (err) {
      messageError("Erro ao atualizar serviço.");
    } finally {
      setLoading(false);
    }
  };

  const deletarServico = async (id: string | undefined) => {
    try {
      await api.delete(`/servicos/${id}`);
      setServicos((prev) => prev.filter((s) => s.id !== Number(id)));
      messageSuccess("Serviço deletado.");
    } catch (err) {
      messageError("Erro ao deletar serviço.");
    }
  };

  return {
    cadastrarServico,
    buscarServicos,
    buscarServico,
    atualizarServico,
    deletarServico,
    servico,
    servicos,
    loading,
  };
};
