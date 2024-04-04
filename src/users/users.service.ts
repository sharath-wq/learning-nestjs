import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'admin',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'user',
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      role: 'user',
    },
    {
      id: 5,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'admin',
    },
    {
      id: 6,
      name: 'Michael Wilson',
      email: 'michael.wilson@example.com',
      role: 'user',
    },
    {
      id: 7,
      name: 'Sophia Taylor',
      email: 'sophia.taylor@example.com',
      role: 'user',
    },
    {
      id: 8,
      name: 'William Anderson',
      email: 'william.anderson@example.com',
      role: 'admin',
    },
    {
      id: 9,
      name: 'Olivia Martinez',
      email: 'olivia.martinez@example.com',
      role: 'user',
    },
    {
      id: 10,
      name: 'James Thompson',
      email: 'james.thompson@example.com',
      role: 'user',
    },
  ];

  findAll(role?: 'user' | 'admin') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (!rolesArray.length)
        throw new NotFoundException('User role not found');

      return rolesArray;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateOne(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
        };
      }

      return user;
    });

    return this.findOne(id);
  }

  deleteOne(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
