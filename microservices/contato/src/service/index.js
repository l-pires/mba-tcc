import { readFileSync } from 'fs';


export default class ContatoService {

  getContatos() {
    return JSON.parse(readFileSync('./data/contatos.json', 'utf-8'));
  }

  getRepo() {
    return JSON.parse(readFileSync('./data/repo.json', 'utf-8'));
  }
}
