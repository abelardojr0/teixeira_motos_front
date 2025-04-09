import { useCallback, useState } from "react";
import api from "../services";
import { messageError, messageSuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { Produto } from "../utils/type";

export const useProdutos = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produto, setProduto] = useState<Produto | null>(null);
  const navigate = useNavigate();

  const cadastrarProduto = async (novoProduto: Produto) => {
    setLoading(true);
    try {
      const { data } = await api.post("/produtos", novoProduto);
      messageSuccess("Produto cadastrado com sucesso!");
      navigate("/produtos");
      return data;
    } catch (error: any) {
      messageError("Erro ao cadastrar produto. Tente novamente.");
      return error.response?.data;
    } finally {
      setLoading(false);
    }
  };

  const buscarProdutos = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/produtos");
      const nova_data: Produto[] = [];
      data.forEach((element: any) => {
        element.type = "Produto";
        nova_data.push(element);
      });
      setProdutos(nova_data);
    } catch (error: any) {
      messageError("Erro ao carregar produtos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  const buscarProduto = async (id: string | undefined) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/produtos/${id}`);
      setProduto(data);
    } catch (error: any) {
      messageError("Erro ao carregar produto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const atualizarProduto = async (id: string, produtoData: Produto) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/produtos/${id}`, produtoData);
      messageSuccess("Produto atualizado com sucesso!");
      navigate("/produtos");
      return data;
    } catch (error: any) {
      messageError("Erro ao atualizar produto. Tente novamente.");
      return error.response?.data;
    } finally {
      setLoading(false);
    }
  };

  const deletarProduto = async (id: string | undefined) => {
    try {
      const { data } = await api.delete(`/produtos/${id}`);
      messageSuccess("Produto excluído com sucesso!");
      setProdutos((prevProdutos) =>
        prevProdutos.filter((produto) => produto.id !== id)
      );
      return data;
    } catch (error: any) {
      messageError("Erro ao excluir produto. Tente novamente.");
      return error.response?.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    cadastrarProduto,
    buscarProdutos,
    buscarProduto,
    atualizarProduto,
    deletarProduto,
    produto,
    produtos,
    loading,
  };
};
