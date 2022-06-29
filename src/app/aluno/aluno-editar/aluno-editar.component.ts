import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AlunoModel} from '../aluno.model';
import {AlunoService} from '../service/aluno.service';

@Component({
  selector: 'app-aluno-editar',
  templateUrl: './aluno-editar.component.html',
  styleUrls: ['./aluno-editar.component.css']
})
export class AlunoEditarComponent implements OnInit {

  aluno: AlunoModel = new AlunoModel();
  selected = new Date();

  constructor(private alunoService: AlunoService,
              private router: Router,
              private rotaAtiva: ActivatedRoute,
              public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getAluno(this.rotaAtiva.snapshot.paramMap.get('id'));
  }

  getAluno(id) {
    this.alunoService.getEntidade(id)
      .subscribe(
        dado => {
          this.aluno = dado;

          this.selected = new Date(this.aluno.dtNascimento);
          this.converterStringToDate();
          console.log(dado);
        },
        error => {
          console.log(error);
        }
      )
  }

  private converterStringToDate() {
    let s = this.aluno.dtNascimento;
    let [dia, mes, ano] = s.split(/[\/: ]/).map(v => parseInt(v));
    this.selected = new Date(ano, mes - 1, dia);
  }

  private convertDate() {
    this.aluno.dtNascimento = this.datepipe.transform(this.selected, 'dd/MM/yyyy');
  }

  atualizar() {
    this.convertDate();
    this.alunoService.updateEntidate(this.aluno.idAluno, this.aluno)
      .subscribe(
        dado => {
          this.alunoService.openSnackBar('Aluno atualizado !');
          this.router.navigate(['/alunos']);
          console.log(dado);
        },
        error => {
          console.log(error);
        })
  }

  cancelar() {
    this.router.navigate(['/alunos']);
  }
}
