import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinContainerComponent } from './coin-container.component';

describe('CoinContainerComponent', () => {
  let component: CoinContainerComponent;
  let fixture: ComponentFixture<CoinContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
