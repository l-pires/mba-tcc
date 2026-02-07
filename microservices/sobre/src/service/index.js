import { readFileSync } from 'fs';


export default class SobreService {

  getSobre() {
    return JSON.parse(readFileSync('./data/sobre.json', 'utf-8'));
  }

  getIntro() {
    return JSON.parse(readFileSync('./data/intro.json', 'utf-8'));
  }

  getContexto() {
    return JSON.parse(readFileSync('./data/contexto.json', 'utf-8'));
  }

  getObjetivo() {
    return JSON.parse(readFileSync('./data/objetivo.json', 'utf-8'));
  }

  getEstrutura() {
    return JSON.parse(readFileSync('./data/estrutura.json', 'utf-8'));
  }
}
