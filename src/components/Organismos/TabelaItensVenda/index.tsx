import styled from "styled-components";
import { Produto } from "../../../utils/type";

interface ItemVendaForm {
  produto_id: string;
  quantidade: string;
  tipo?: "Produto" | "Serviço";
}

interface TabelaItensVendaProps {
  itens: ItemVendaForm[];
  produtos: Produto[];
  onChangeQuantidade: (index: number, novaQuantidade: string) => void;
  onRemoverItem: (index: number) => void;
}

export const TabelaItensVenda: React.FC<TabelaItensVendaProps> = ({
  itens,
  produtos,
  onChangeQuantidade,
  onRemoverItem,
}) => {
  return (
    <Tabela>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantidade</th>
          <th>Preço Unit.</th>
          <th>Subtotal</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {itens.map((i, index) => {
          const item = produtos.find(
            (p) => p.id === Number(i.produto_id) && p.type === i.tipo
          );

          const preco = item?.preco || 0;
          const qtd = Number(i.quantidade);
          const subtotal = preco * qtd;

          return (
            <tr key={index}>
              <td>{item?.nome || "—"}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={i.quantidade}
                  onChange={(e) => onChangeQuantidade(index, e.target.value)}
                />
              </td>
              <td>R$ {Number(preco).toFixed(2)}</td>
              <td>R$ {Number(subtotal).toFixed(2)}</td>
              <td>
                <RemoverButton
                  type="button"
                  onClick={() => onRemoverItem(index)}
                >
                  Remover
                </RemoverButton>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Tabela>
  );
};

const Tabela = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  font-size: 0.9rem;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px 12px;
    text-align: left;
  }

  th {
    background-color: #f8f8f8;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #fafafa;
  }

  input[type="number"] {
    width: 60px;
    padding: 4px;
  }
`;

const RemoverButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;
