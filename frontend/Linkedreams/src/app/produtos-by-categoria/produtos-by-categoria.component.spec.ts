import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosByCategoriaComponent } from './produtos-by-categoria.component';

describe('ProdutosByCategoriaComponent', () => {
  let component: ProdutosByCategoriaComponent;
  let fixture: ComponentFixture<ProdutosByCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosByCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosByCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
