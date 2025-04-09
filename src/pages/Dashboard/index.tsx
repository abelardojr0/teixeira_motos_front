import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonAtom } from "../../components/Atoms/ButtonAtom";
import api from "../../services";
import { TitlePage } from "../../utils/globalStyles";
import { ButtonGrid, CardGrid, Container, InfoCard } from "./style";

export function Dashboard() {
  const navigate = useNavigate();

  const [resumo, setResumo] = useState({
    totalVendasMes: 0,
    totalClientesMes: 0,
    vendasHoje: 0,
    valorHoje: 0,
    produtosBaixoEstoque: 0,
  });

  const [lucros, setLucros] = useState({
    lucroAnual: 0,
    lucroDiario: 0,
    lucroMensal: 0,
    lucroSemanal: 0,
  });

  const [dadosClientes, setDadosClientes] = useState({
    novosClientesMes: 0,
    clientesRecorrentes: 0,
    topClientesMes: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [resumoRes, lucrosRes, clientesRes] = await Promise.all([
          api.get("/dashboard/resumo"),
          api.get("/dashboard/lucros"),
          api.get("/dashboard/clientes"),
        ]);

        setResumo(resumoRes.data);
        setLucros(lucrosRes.data);
        setDadosClientes(clientesRes.data);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <Container>
      <TitlePage>Dashboard</TitlePage>
      {resumo && lucros && (
        <>
          <CardGrid>
            <InfoCard>
              <h3>🆕 Novos Clientes no Mês</h3>
              <span>{dadosClientes.novosClientesMes}</span>
            </InfoCard>

            <InfoCard>
              <h3>🏆 Top 3 Clientes do Mês</h3>
              <ul>
                {dadosClientes.topClientesMes.length === 0 && (
                  <li>Nenhum cliente ainda</li>
                )}
                {dadosClientes.topClientesMes.map((c: any) => (
                  <li key={c.id}>
                    {c.nome} — R$ {Number(c.total).toFixed(2)}
                  </li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard>
              <h3>🛒 Total de Vendas do Mês</h3>
              <span>R$ {resumo.totalVendasMes.toFixed(2)}</span>
            </InfoCard>

            <InfoCard>
              <h3>📦 Produtos com Estoque Baixo</h3>
              <span>{resumo.produtosBaixoEstoque}</span>
            </InfoCard>

            <InfoCard>
              <h3>👨‍🔧 Clientes Atendidos no Mês</h3>
              <span>{resumo.totalClientesMes}</span>
            </InfoCard>

            <InfoCard>
              <h3>🧾 Vendas Realizadas Hoje</h3>
              <span>
                {resumo.vendasHoje} vendas / R$ {resumo.valorHoje.toFixed(2)}
              </span>
            </InfoCard>
          </CardGrid>

          <CardGrid>
            <InfoCard>
              <h3>💰 Lucro Diário</h3>
              <span>R$ {lucros.lucroDiario.toFixed(2)}</span>
            </InfoCard>
            <InfoCard>
              <h3>📆 Lucro Semanal</h3>
              <span>R$ {lucros.lucroSemanal.toFixed(2)}</span>
            </InfoCard>
            <InfoCard>
              <h3>📅 Lucro Mensal</h3>
              <span>R$ {lucros.lucroMensal.toFixed(2)}</span>
            </InfoCard>
            <InfoCard>
              <h3>📈 Lucro Anual</h3>
              <span>R$ {lucros.lucroAnual.toFixed(2)}</span>
            </InfoCard>
          </CardGrid>

          <ButtonGrid>
            <ButtonAtom onClick={() => navigate("/vendas/form")}>
              ➕ Nova Venda
            </ButtonAtom>
            <ButtonAtom onClick={() => navigate("/produtos/form")}>
              📦 Novo Produto
            </ButtonAtom>
            <ButtonAtom onClick={() => navigate("/produtos")}>
              📋 Lista de Produtos
            </ButtonAtom>
            <ButtonAtom onClick={() => navigate("/vendas")}>
              📊 Relatório de Vendas
            </ButtonAtom>
            <ButtonAtom onClick={() => navigate("/clientes/form")}>
              👤 Novo Cliente
            </ButtonAtom>
            <ButtonAtom onClick={() => navigate("/clientes")}>
              📋 Lista de Clientes
            </ButtonAtom>
          </ButtonGrid>
        </>
      )}
    </Container>
  );
}
