// import { TestBed } from '@angular/core/testing';
// import { UserService } from './usuario.service';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { HttpClientModule } from '@angular/common/http';
// import { provideHttpClient } from '@angular/common/http';

// describe('UserService', () => {
//   let service: UserService;
//   let httpMock: HttpTestingController;

//   // URL base utilizada no serviço
//   const apiUrl = 'https://jsonplaceholder.typicode.com/';
//   const endpointUsuario = 'users/';

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [UserService],
//     });
//     service = TestBed.inject(UserService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     // Verifica se não há requisições HTTP pendentes após cada teste
//     httpMock.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should retrieve users (GET)', () => {
//     const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];

//     service.obterUsuarios().subscribe((users) => {
//       expect(users.length).toBe(2);
//       expect(users).toEqual(mockUsers);
//     });

//     const req = httpMock.expectOne(`${apiUrl}${endpointUsuario}`);
//     expect(req.request.method).toBe('GET');
//     req.flush(mockUsers);
//   });

//   it('should edit a user (PUT)', () => {
//     const updatedUser = { id: 1, name: 'John Smith' };

//     service.editarUsuario(1, updatedUser).subscribe((user) => {
//       expect(user).toEqual(updatedUser);
//     });

//     const req = httpMock.expectOne(`${apiUrl}${endpointUsuario}1`);
//     expect(req.request.method).toBe('PUT');
//     req.flush(updatedUser);
//   });

//   it('should delete a user (DELETE)', () => {
//     const userId = 1;

//     service.excluirUsuario(userId).subscribe((response) => {
//       expect(response).toBeNull();
//     });

//     const req = httpMock.expectOne(`${apiUrl}${endpointUsuario}1`);
//     expect(req.request.method).toBe('DELETE');
//     req.flush(null);
//   });

//   it('should add a new user (POST)', () => {
//     const newUser = { name: 'New User' };

//     service.adicionarUsuario(newUser).subscribe((user) => {
//       expect(user.name).toBe('New User');
//     });

//     const req = httpMock.expectOne(`${apiUrl}${endpointUsuario}`);
//     expect(req.request.method).toBe('POST');
//     req.flush({ ...newUser, id: 3 });
//   });
// });
