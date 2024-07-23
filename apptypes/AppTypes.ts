export interface User {
  email: string;
  password: string;
}

export interface Master {
  masterType: string;
  downloadStatus: boolean;
}

export interface HeaderParams {
  username: string;
  password: string;
}

export interface TestUser {
  id: number;
  name: string;
  age: number;
}
