import { Worker } from "@/types/Worker"
import { api } from '../axiosConfig'
import { CustomError } from "@/types/Error";
import { Product } from "@/types/Product";

// export type RegisterProduct= {
//       nome: string;
//       login: string;
//       password: string
//       classificacao: string;
//       cargo: string;  
//       role?: string;
//       dataNascimento: string,    
// }

interface IAuth {
   data: Product
}

// interface ErrorResponse {
//    response: {
//      data?: {
//        errors?: {
//          default?: string;
//        };
//      };
//    };
//  }

const registerProduct = async (productData: Product): Promise<IAuth> => {
   try {
      const { data } = await api.post('/produtos', productData);

      if (data) {
         return data;
      }

      throw new Error('Erro ao cadastrar produto.');
   } catch (error: any) {

      if (error.response?.status === 400) {
         const customError = {
            message: error.response.data,
            status: 400
         } as CustomError;
         throw customError;
      }

      throw { message: 'Erro ao cadastrar produto.' } as CustomError;
   }
};

const getAllProducts = async (): Promise<Product[]> => {


   try {
      const response = await api.get('/produtos');
      const data = response.data;


      if (data) {
         console.log("Data: " + data);
         return data;
      }

      return data

   } catch (error: any) {
      if (error.response?.status === 400) {
         const customError = {
            message: error.response.data,
            status: 400
         } as CustomError;
         throw customError;
      }

      throw { message: 'Erro ao listar produtos' } as CustomError;
   }
}

export const ProductService = {
   registerProduct, getAllProducts
}
