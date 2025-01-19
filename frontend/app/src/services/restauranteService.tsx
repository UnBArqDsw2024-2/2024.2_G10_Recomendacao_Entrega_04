import axios from 'axios';

interface Restaurante {
    idRestaurante: number;
    nomeRestaurante: string;
    endereco: string;
    idCliente: number;
    idFuncionario: number;
}
  
export const restauranteService = {
    async listar(): Promise<Restaurante[]> {
      try {
        const response = await axios.get<Restaurante[]>(`http://localhost:8080/restaurante/getAllRestaurantes`);
        return response.data;
      } catch (error) {
        console.error('Erro ao listar restaurantes:', error);
        throw error;
      }
    },

};
