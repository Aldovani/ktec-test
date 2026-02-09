import { User } from "@app/entities/user.js";

export class MongoUserMapper {
  static toDomain(raw: any): User {
    return new User({
      id: raw.id,
      email: raw.email,
      name: raw.name,
      password: raw.password,
      createdAt: raw.createdAt,
    });
  }
}
