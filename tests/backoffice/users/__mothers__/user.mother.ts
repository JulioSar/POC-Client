import type { User } from "../../../../src/types";
import { faker, simpleFaker } from "@faker-js/faker";

export default class UserMother {
  private id: string;
  private name: string;
  private mail: string;
  private status: boolean;
  private profile_picture: string | undefined = undefined;

  constructor() {
    this.id = simpleFaker.string.uuid();
    this.name = faker.person.fullName();
    this.mail = faker.internet.email();
    this.status = true;
    this.profile_picture = faker.image.avatar();
  }

  withId(id: string): UserMother {
    this.id = id;
    return this;
  }

  withName(name: string): UserMother {
    this.name = name;
    return this;
  }

  withMail(mail: string): UserMother {
    this.mail = mail;
    return this;
  }

  withStatus(status: boolean): UserMother {
    this.status = status;
    return this;
  }

  withProfilePicture(profilePicture: string): UserMother {
    this.profile_picture = profilePicture;
    return this;
  }

  build(): User {
    return {
      id: this.id,
      name: this.name,
      mail: this.mail,
      status: this.status,
      profile_picture: this.profile_picture,
    };
  }

  static random(): User {
    return new UserMother().build();
  }
}
