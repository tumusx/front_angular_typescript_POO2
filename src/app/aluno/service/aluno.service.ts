import { Injectable } from '@angular/core';
import {BackendApiService} from '../../back-end.api';

@Injectable({
  providedIn: 'root'
})
export class AlunoService extends BackendApiService{
  // tslint:disable-next-line:ban-types
  protected endPoint(): String {
    return 'alunos';
  }

}
