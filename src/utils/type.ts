export interface User {
  id?: string | number;
  email: string;
  nome?: string;
  password?: string;
}

export interface Produto {
  id?: number;
  nome: string;
  descricao?: string;
  marca?: string;
  categoria?: string;
  estoque?: number;
  preco: number;
  custo?: number;
  createdAt?: string;
  updatedAt?: string;
  type?: string | undefined;
}

export interface ItemVenda {
  produto_id: number;
  quantidade: number;
  preco_unitario: number;
  Produto?: Produto;
  Servico?: Servico;
}

export interface Venda {
  id?: number;
  cliente: Cliente;
  total: number;
  createdAt?: string;
  ItemVendas?: ItemVenda[];
}

export interface Cliente {
  id?: number;
  nome: string;
  telefone: string;
  email?: string;
  cpf?: string;
  endereco?: string;
  observacoes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Servico {
  id?: number;
  nome: string;
  preco: number;
  observacoes?: string;
  type?: string | undefined;
}
