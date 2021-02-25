import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoiadorComponent } from './apoiador.component';

describe('ApoiadorComponent', () => {
  let component: ApoiadorComponent;
  let fixture: ComponentFixture<ApoiadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApoiadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApoiadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
