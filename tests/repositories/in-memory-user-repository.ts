import type { IUserRepository } from "@app/contracts/repositories/user-repository.js";
import type { User } from "@app/entities/user.js";

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  constructor() { }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index !== -1) {
      this.users[index] = user;
      return this.users[index];
    }

    return user;
  }

  delete(id: string): Promise<void> {
    const index = this.users.findIndex((u) => u.id === id);

    if (index !== -1) {
      this.users.splice(index, 1);
    }

    return Promise.resolve();
  }
}
