import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let userServiceMock: Partial<UserService>;

  beforeEach(async () => {
    
    userServiceMock = {
      obterUsuarios: () => of() // Mock do método obterUsuarios
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule], // Add HttpClientTestingModule here
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('deve chamar obterUsuarios do UserService ao inicializar', () => {
    // Chama o ngOnInit manualmente
    component.ngOnInit();
  });

});
