export class User {
    constructor(
        public name: string, 
        public cpf: string,
        public  birthdate: Date, 
        public  email: string, 
        public  password: string, 
        public  address: string, 
        public  number: string, 
        public  complement: string, 
        public  city: string, 
        public  state: string, 
        public  country: string, 
        public  zipcode: string, 
    ) {}
  
}