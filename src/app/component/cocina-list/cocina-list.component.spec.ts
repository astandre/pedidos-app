import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CocinaListComponent } from './cocina-list.component';

describe('CocinaListComponent', () => {
  let component: CocinaListComponent;
  let fixture: ComponentFixture<CocinaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CocinaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocinaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
