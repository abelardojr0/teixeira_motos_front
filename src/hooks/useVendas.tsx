import { useState } from "react";
import api from "../services";
import { messageSuccess, messageError } from "../utils/toast";
import { Venda } from "../utils/type";
import { useNavigate } from "react-router-dom";

export const useVendas = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const navigate = useNavigate();

  const listarVendas = async () => {
    try {
      const { data } = await api.get("/vendas");
      setVendas(data);
    } catch (err) {
      messageError("Erro ao carregar vendas.");
    }
  };

  const realizarVenda = async (vendaData: any) => {
    try {
      await api.post("/vendas", vendaData);
      navigate("/vendas");
      messageSuccess("Venda realizada com sucesso!");
    } catch (err) {
      messageError("Erro ao realizar venda.");
    }
  };

  const excluirVenda = async (id: number) => {
    try {
      await api.delete(`/vendas/${id}`);
      messageSuccess("Venda excluída com sucesso!");
    } catch (err) {
      messageError("Erro ao excluir venda.");
    }
  };

  return {
    vendas,
    listarVendas,
    realizarVenda,
    excluirVenda,
  };
};
