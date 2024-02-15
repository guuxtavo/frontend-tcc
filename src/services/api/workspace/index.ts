import { AvailableWorkspace } from '@/types/AvailableWorkspace';
import { api } from '../axiosConfig';
import { CustomError } from "@/types/Error";

interface IAuth {
   data: WorkspaceRegister;
}

type WorkspaceRegister = {
   numero: number;
   status?: string | undefined;
   funcionario_armador: number;
   funcionario_acenteiro: number;
   funcionario_encosteiro: number;
   funcionario_final: number;
}

const registerWorkspace = async (workspaceData: WorkspaceRegister): Promise<IAuth> => {
   try {
      const { data } = await api.post('/celulas', workspaceData);

      if (data) {
         console.log(data);
         return data;
      }

      throw new Error('Erro ao cadastrar célula.');
   } catch (error: any) {
      console.error(error);

      if (error.response?.status === 400) {
         const customError = {
            message: error.response.data,
            status: 400
         } as CustomError;
         throw customError;
      }

      throw { message: 'Erro ao cadastrar célula.' } as CustomError;
   }
};

const getAvailableWorkspace = async (): Promise<AvailableWorkspace> => {
   try {
      console.log("entrou no getAvailableWorkspace")
      const response = await api.get(`/celulas/disponivel`);
      const data = response.data;

      return data;
   } catch (error: any) {
      console.error(error);

      if (error.response?.status === 400) {
         const customError = {
            message: error.response.data,
            status: 400,
         } as CustomError;
         throw customError;
      }

      throw { message: 'Erro ao obter lista de funcionários.' } as CustomError;
   }
}

export const WorkspaceService = {
   registerWorkspace, getAvailableWorkspace
};