import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserList } from './user-list';
import { UsersService } from '../../services/users.service';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserList],
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

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
