import { Injectable } from '@angular/core';
import {BackendApiService} from '../../back-end.api';

@Injectable({
  providedIn: 'root'
})
export class AlunoService extends BackendApiService{
  protected endPoint(): String {
    return 'alunos';
  }

}
