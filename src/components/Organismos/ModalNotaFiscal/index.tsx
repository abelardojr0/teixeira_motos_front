import React, { useEffect } from "react";
import { Venda } from "../../../utils/type";
import { ButtonAtom } from "../../Atoms/ButtonAtom";
import {
  ButtomClose,
  HeaderNota,
  Modal,
  Overlay,
  TabelaNota,
  TotalNota,
} from "./style";
import logo from "../../../assets/logo.png";

interface ModalNotaFiscalProps {
  venda: Venda;
  onClose: () => void;
}

export const ModalNotaFiscal: React.FC<ModalNotaFiscalProps> = ({
  venda,
  onClose,
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const enviarWhatsApp = () => {
    const telefone = venda.cliente.telefone.replace(/\D/g, "");
    const dataFormatada = new Date(venda.createdAt!).toLocaleString();

    let mensagem = `🧾 *Informativo*%0A`;
    mensagem += `Cliente: *${venda.cliente.nome}*%0A`;
    mensagem += `Data: ${dataFormatada}%0A`;
    mensagem += `%0A*Itens:*%0A`;

    venda.ItemVendas?.forEach((item) => {
      const nome = item.Produto?.nome || item.Servico?.nome || "Item";
      const qtd = item.quantidade;
      const unit = Number(item.preco_unitario).toFixed(2);
      const total = (item.quantidade * Number(item.preco_unitario)).toFixed(2);
      mensagem += `- ${nome} (x${qtd}) - R$ ${unit} = R$ ${total}%0A`;
    });

    mensagem += `%0A*Total Geral:* R$ ${Number(venda.total).toFixed(2)}`;

    const url = `https://wa.me/55${telefone}?text=${mensagem}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    console.log(venda);
  }, [venda]);

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <HeaderNota>
          <img src={logo} alt="" />
          <span>CNPJ: 58.770.803/0001-05</span>
          <span>Rua Nova Vida, 08A - Arianópolis</span>
          <span>Nota Não Fiscal Eletrônica</span>
        </HeaderNota>

        <hr />

        <p>
          <strong>Cliente:</strong> {venda.cliente.nome}
        </p>
        <p>
          <strong>Data:</strong> {new Date(venda.createdAt!).toLocaleString()}
        </p>

        <TabelaNota>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qtd</th>
              <th>Unit.</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {venda.ItemVendas?.flatMap((item, i) => {
              const rows = [];

              // Produto (se existir)
              if (item.Produto) {
                rows.push(
                  <tr key={`${i}-produto`}>
                    <td>{item.Produto.nome}</td>
                    <td>{item.quantidade}</td>
                    <td>R$ {Number(item.preco_unitario).toFixed(2)}</td>
                    <td>
                      <strong>
                        R${" "}
                        {(
                          item.quantidade * Number(item.preco_unitario)
                        ).toFixed(2)}
                      </strong>
                    </td>
                  </tr>
                );
              }

              // Serviço (se existir)
              if (item.Servico) {
                rows.push(
                  <tr key={`${i}-servico`}>
                    <td>{item.Servico.nome}</td>
                    <td>{item.quantidade}</td>
                    <td>R$ {Number(item.Servico.preco).toFixed(2)}</td>
                    <td>
                      <strong>
                        R${" "}
                        {(item.quantidade * Number(item.Servico.preco)).toFixed(
                          2
                        )}
                      </strong>
                    </td>
                  </tr>
                );
              }

              return rows;
            })}
          </tbody>
        </TabelaNota>

        <TotalNota>
          <strong>Total Geral: R$ {Number(venda.total).toFixed(2)}</strong>
        </TotalNota>

        <ButtomClose onClick={onClose}>x</ButtomClose>

        {venda.cliente.telefone && (
          <ButtonAtom fullWidth onClick={enviarWhatsApp}>
            Enviar por WhatsApp
          </ButtonAtom>
        )}
      </Modal>
    </Overlay>
  );
};
