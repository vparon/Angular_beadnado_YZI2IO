import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeDetalilsComponent } from './joke-detalils.component';

describe('JokeDetalilsComponent', () => {
  let component: JokeDetalilsComponent;
  let fixture: ComponentFixture<JokeDetalilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeDetalilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeDetalilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
