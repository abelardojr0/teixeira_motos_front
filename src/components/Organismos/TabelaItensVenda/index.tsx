import { Produto } from "../../../utils/type";
import { RemoverButton, Tabela, TabelaContainer } from "./style";

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
    <TabelaContainer>
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
    </TabelaContainer>
  );
};
