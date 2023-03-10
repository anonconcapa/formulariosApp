import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre:['' , [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ], Validators.required)
  })

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);
  
  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  cartelRojo(algo:string){
    return this.miFormulario.controls[algo].invalid
            && this.miFormulario.controls[algo].touched;

  }

  agregarFavorito(){
    if(this.nuevoFavorito.invalid){return;}

    this.favoritosArr.push(new FormControl(this.nuevoFavorito.value, Validators.required));
    this.nuevoFavorito.reset();
  }

  guardar(){

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
    }

    console.log(this.miFormulario.value)
  }

  borrar(indice:number){
    this.favoritosArr.removeAt(indice);
  }

  asd(){}
}
