import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LTareasComponent } from './l-tareas.component';

describe('LTareasComponent', () => {
  let component: LTareasComponent;
  let fixture: ComponentFixture<LTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LTareasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
