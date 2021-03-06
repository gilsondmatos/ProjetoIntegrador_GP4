import { Produto } from "./Produto"

export class User {
   public id: number
	public nome_completo: string
	public tipo: string
	public email: string
	public senha: string
    public produto: Produto[]
}
