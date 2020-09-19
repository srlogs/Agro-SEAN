import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifictionPageComponent } from './notifiction-page.component';

describe('NotifictionPageComponent', () => {
  let component: NotifictionPageComponent;
  let fixture: ComponentFixture<NotifictionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifictionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifictionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
