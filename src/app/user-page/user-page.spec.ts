import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPage } from './user-page';
import { UsersService } from '../../services/users.service';

describe('UserPage', () => {
  let component: UserPage;
  let fixture: ComponentFixture<UserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPage],
      providers: [
        {
          provide: UsersService,
          useValue: {
            users: () => [],
            filterUsers: () => undefined,
            fetchUsers: () => undefined,
            deleteUser: () => undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
