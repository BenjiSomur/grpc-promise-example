import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonRpcComponent } from './boton-rpc.component';

describe('BotonRpcComponent', () => {
  let component: BotonRpcComponent;
  let fixture: ComponentFixture<BotonRpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonRpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonRpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
