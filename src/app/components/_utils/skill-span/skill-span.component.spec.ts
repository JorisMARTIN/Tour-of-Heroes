import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSpanComponent } from './skill-span.component';

describe('SkillSpanComponent', () => {
  let component: SkillSpanComponent;
  let fixture: ComponentFixture<SkillSpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillSpanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
