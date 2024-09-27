import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeOrganizationComponent } from './ne-organization.component';

describe('NeOrganizationComponent', () => {
  let component: NeOrganizationComponent;
  let fixture: ComponentFixture<NeOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
