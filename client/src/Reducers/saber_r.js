import { PEGA_SABERES, ERRO_SABER, ATUALIZA_CURTIDAS, DELETAR_SABER } from '../actions/types';

const estadoInicial = {
  saberes: [],
  saber: null,
  loading: true,
  error: {},
};

export default function (estado = estadoInicial, action) {
  const { type, payload } = action;

  switch (type) {
    case PEGA_SABERES:
      return {
        ...estado,
        saberes: payload,
        loading: false,
      };
      case DELETAR_SABER:
      return {
        ...estado,
        saberes: estado.saberes.filter(saber=> saber._id !==payload),
        //acha o saber que foi deletado e remove ele da UI
        loading: false,
      };
    case ATUALIZA_CURTIDAS:
      return {
        ...estado,
        saberes: estado.saberes.map((saber) =>
          saber._id === payload.id? {
                //acha o saber certo
                ...saber, //retorna o saber - post, daqui da pra fazer a inscrição com a id do saber
                curtidas: payload.curtidas, // atualiza a curtida com o payload
              }
            : saber),
         //se não for o post certo, retorna ele normalmente
        loading: false,
      };
    //   case ATUALIZA_INSCRIÇÃO:
    //     return {
    //       ...estado,
    //       saberes: estado.saberes.map((saber) =>
    //         saber._id === payload.id? {
    //               //acha o saber certo
    //               ...saber, //retorna o saber - post, daqui da pra fazer a inscrição com a id do saber
    //               perfil.meta: payload.curtidas, // atualiza a curtida com o payload
    //             }:saber)
    //           inscricao : saber,
    //           perfil:{}
    //        //se não for o post certo, retorna ele normalmente
    //       loading: false,
    //     };
    case ERRO_SABER:
      return {
        ...estado,
        error: payload,
        loading: false,
      };
    default:
      return estado;
  }
}
