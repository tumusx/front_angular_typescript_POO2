import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {AlunoService} from '../service/aluno.service';
import {AlunoModel} from '../aluno.model';
// @ts-ignore

@Component({
  selector: 'app-alunos',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunosComponent implements OnInit {

  aluno: AlunoModel = new AlunoModel();

  alunoDataSource: MatTableDataSource<AlunoModel>;
  displayedAlunos: String[] = ['idaluno', 'nome', 'sexo', 'dt_nasc', 'update', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alunoService: AlunoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAlunoList();
  }

  getAlunoList() {
    this.alunoService.getEntidadeList()
      .subscribe(
        dados => {
          this.alunoDataSource = new MatTableDataSource<AlunoModel>(dados);
          this.alunoDataSource.paginator = this.paginator;
          this.alunoDataSource.sort = this.sort;
        },
        error => console.log(error)
      );
  }

  filtrarAlunos(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.alunoDataSource.filter = valor;
  }

  deletarAluno(delaluno: AlunoModel){
    this.alunoService.deleteEntidade(delaluno.idAluno)
      .subscribe(
        dados => {
          this.alunoService.openSnackBar('Aluno excluído !');
          this.getAlunoList();
        }
      );
  }

  navigateToAlunoNovo() {
    this.router.navigate(['/aluno-novo']);
  }

  navigateToAlunoEditar(aluno: AlunoModel) {
    this.router.navigate([`/aluno-editar/${aluno.idAluno}`]);
  }

}
