import ksuid from "ksuid";
export class User {
  id: string;
  externalId?: string | undefined;
  email: string;
  password: string;
  name: string;
  createdAt: Date;

  constructor(props: User.Atributes) {
    this.id = props?.id ?? ksuid.randomSync().string;
    this.externalId = props?.externalId ?? undefined;
    this.email = props.email;
    this.password = props.password;
    this.name = props.name;
    this.createdAt = props.createdAt ?? new Date();
  }
}

export namespace User {
  export type Atributes = {
    id?: string;
    externalId?: string | undefined;
    email: string;
    name: string;
    password: string;
    createdAt?: Date;
  };
}
