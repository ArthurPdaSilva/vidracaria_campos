import { Status } from '../types';

const statusDictionary: { [key in Status]: string } = {
  ORCADO: 'Orçado',
  CONTRATADO_A_VISTA: 'Contratado à vista',
  CONTRATADO_A_PRAZO: 'Contratado a prazo',
  FINALIZADO: 'Finalizado',
};

export const converterStatus(status: Status): string {
  return statusDictionary[status];
}
