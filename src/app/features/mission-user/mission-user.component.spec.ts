import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionUserComponent } from './mission-user.component';

describe('MissionUserComponent', () => {
  let component: MissionUserComponent;
  let fixture: ComponentFixture<MissionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
