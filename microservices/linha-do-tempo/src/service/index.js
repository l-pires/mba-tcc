import { readFileSync } from 'fs';


export default class LinhaDoTempoService {

  getMarcos() {
    return JSON.parse(readFileSync('./data/linha-do-tempo.json', 'utf-8'));
  }
}
