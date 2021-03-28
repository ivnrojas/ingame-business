import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespectComponent } from './respect.component';

describe('RespectComponent', () => {
  let component: RespectComponent;
  let fixture: ComponentFixture<RespectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
