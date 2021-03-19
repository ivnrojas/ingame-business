import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionModifyComponent } from './mission-modify.component';

describe('MissionModifyComponent', () => {
  let component: MissionModifyComponent;
  let fixture: ComponentFixture<MissionModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
