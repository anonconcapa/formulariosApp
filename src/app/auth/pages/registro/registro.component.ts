import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  // TODO: Temporal



  miFormulario : FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)] ],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator] ],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider] ],
    password: ['', [Validators.required, Validators.minLength(6)  ] ],
    password2: ['', [Validators.required  ] ]
  },
  {
    validators:[ this.validatorService.camposIguales('password','password2')]
  })

  get emailErrorsMsg():string{
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required){return 'El email es obligatorio'}
    else if (errors?.pattern){return 'Debes escribir un email valido la puta que te re mil pario'}
    else if(errors?.emailTomado){return 'Este email ya esta en uso'}
    return '' ;
  }

  constructor(private fb: FormBuilder,
              private validatorService :ValidatorService,
              private emailValidator : EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre:'Fernando Herrera',
      email:'test1@test.com',
      username:'her_85',
      password:'123456',
      password2:'123456'
    })
  }

  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid
          && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

}
