import type { IUserRepository } from "@app/contracts/repositories/user-repository.js";
import { User } from "@app/entities/user.js";
import { MongoUserMapper } from "../mappers/mongo-user-mapper.js";
import { UserModel } from "../schemas/user-schema.js";

export class MongoUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findOne({ id }).lean();

    if (!user) {
      return null;
    }

    return MongoUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).lean();

    if (!user) {
      return null;
    }

    return MongoUserMapper.toDomain(user);
  }

  async create(data: User): Promise<User> {
    const created = new UserModel(data);
    const saved = await created.save();

    return MongoUserMapper.toDomain(saved);
  }

  async update(user: User): Promise<User> {
    const updated = await UserModel.findOneAndUpdate(
      { id: user.id },
      {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    ).lean();

    return MongoUserMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await UserModel.findOneAndDelete({ id });
  }
}
