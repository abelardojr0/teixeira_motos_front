import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Layout } from "../layout";
import { NotFound } from "../pages/NotFound";
import { Produtos } from "../pages/Produtos/Dashboard";
import { ProdutoForm } from "../pages/Produtos/Form";
import { Vendas } from "../pages/Vendas/Dashboard";
import { VendaForm } from "../pages/Vendas/Form";
import { Clientes } from "../pages/Clientes/Dashboard";
import { ClienteForm } from "../pages/Clientes/Form";
import { Servicos } from "../pages/Servicos/Dashboard";
import { ServicoForm } from "../pages/Servicos/Form";
export const AppRoutesAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/form/:id?" element={<ProdutoForm />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/vendas/form/:id?" element={<VendaForm />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/form/:id?" element={<ClienteForm />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/servicos/form/:id?" element={<ServicoForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
