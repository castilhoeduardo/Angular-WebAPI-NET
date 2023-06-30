import { Component, OnInit, TemplateRef } from '@angular/core';
import { Professor } from '../models/Professor';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProfessorService } from './professor.service';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  public modalRef: BsModalRef;
  public professorForm: FormGroup;
  public titulo = 'Professores';
  public professorSelecionado: Professor;
  public textSimple: string;
  public modo: 'post';

  public professores: Professor[];

  constructor(private fb: FormBuilder, 
              private modalService: BsModalService,
              private professorService: ProfessorService) {
                this.criarForm() 
              } 

   openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
   }

  ngOnInit() {
    this.carregarProfessores();
  }

  criarForm() {
  this.professorForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
    });
  }

  salvarProfesssor(professor: Professor){
    (professor.id === 0) ? this.modo = 'post' : 'put';

    this.professorService[this.modo](professor).subscribe(
      (retorno: Professor) => {
        console.log(retorno);
        this.carregarProfessores();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  professorSubmit() {
    this.salvarProfesssor(this.professorForm.value);
  }

  professorSelect(professor: Professor) {
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  professorNovo() {
    this.professorSelecionado = new Professor();
    this.professorForm.patchValue(this.professorSelecionado);
  }

  carregarProfessores() {
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => {
        this.professores = professores;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  voltar() {
    this.professorSelecionado = null;
  }

}
