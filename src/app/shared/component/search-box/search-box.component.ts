import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  //la suscripción del debounce no se elimina cuando se destruye el componente
  ngOnDestroy(): void {
    //this.debouncer.unsubscribe()
    //en angular common se cancela la suscripción de forma automatica
    this.debouncerSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        //espera un segundo para la siguiente oetición
        debounceTime(300)
      )
      .subscribe(value => {
        this.ondebounce.emit(value)
    })
  }
  //es un tipo especial de observable
  private debouncer : Subject<string> = new Subject<string>()
  private debouncerSubscription?: Subscription;

  @Input()
  placeholder : string = '';

  @Input()
  initialValue: string = '';

  @Output()
  onValue : EventEmitter<string> = new EventEmitter()

  @Output()
  ondebounce = new EventEmitter<string>()

  emitValue(value : string){
    this.onValue.emit(value)
  }

  //debounce
  onkeyPress(searchTerm: string){
    //se ejecuta el evento del observable para que llame el suscribe
    this.debouncer.next(searchTerm)
  }
}


