import { Categoria } from "./Categoria"
import { User } from "./User"

export class Produto {

	public id: number
	public nome: string
	public preco: number
	public descricao: string
	public imagem: string
	public status: boolean
  public categoria: Categoria
	public usuario: User
}
