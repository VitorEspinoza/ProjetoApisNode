class User {
    constructor(name, cpf, birthDate, email, password, address, number, complement, city, state, country, zipCode) {
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.address = address;
        this.number = number;
        this.complement = complement;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zipCode = zipCode;
    }
}
class UserService {
    pegaDadosTela() {
        var name = document.getElementById("name").value;
        var cpf = document.getElementById("cpf").value;
        var birthDate = new Date(document.getElementById("birthdate").value);
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var address = document.getElementById("address").value;
        var number = document.getElementById("number").value;
        var complement = document.getElementById("complement").value;
        var city = document.getElementById("city").value;
        var state = document.getElementById("state").value;
        var country = document.getElementById("country").value;
        var zipCode = document.getElementById("zipCode").value;
        var user = new User(name, cpf, birthDate, email, password, address, number, complement, city, state, country, zipCode);
        return user;
    }
    isValidUser(user) {
        var error = false;
        var validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (validEmail.test(user.email) == false) {
            console.log("Email inválido");
            error = true;
        }
        if (this.isValidCPF(user.cpf) == false) {
            console.log("Cpf inválido");
            error = true;
        }
        if (this.CalculateAge(user.birthDate) == false) {
            console.log("Você tem que ser maior que 18 anos");
            error = true;
        }
        return !error;
    }
    AddUser() {
        var user = this.pegaDadosTela();
        if (this.isValidUser(user)) {
            fetch("http://localhost:3000/api/v1/user", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => console.log(json));
        }
        else {
            console.log("usuario inválido");
        }
    }
    GetUsers() {
        const id = document.getElementById("buscarPorId").value;
        const page = document.getElementById("buscarPorPagina").value;
        if (id != '') {
            fetch('http://localhost:3000/api/v1/users/' + id)
                .then(res => res.json())
                .then(data => {
                console.log(data);
            });
        }
        else if (page != '') {
            fetch('http://localhost:3000/api/v1/users/?page=' + page)
                .then(res => res.json())
                .then(data => {
                console.log(data);
            });
        }
        else {
            fetch('http://localhost:3000/api/v1/users/')
                .then(res => res.json())
                .then(data => {
                console.clear();
                console.log(data);
            });
        }
    }
    UpdateUser() {
        const id = document.getElementById("idUsuario").value;
        var user = this.pegaDadosTela();
        var error = false;
        var validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (user.email != '' && validEmail.test(user.email) == false) {
            console.log("Email inválido");
            error = true;
        }
        if (user.cpf != '' && this.isValidCPF(user.cpf) == false) {
            console.log("Cpf inválido");
            error = true;
        }
        if (user.birthDate.toString() != "Invalid Date" && this.CalculateAge(user.birthDate) == false) {
            console.log("Você tem que ser maior de idade");
            error = true;
        }
        if (error) {
            console.log("impossível alterar usuário");
        }
        else {
            fetch("http://localhost:3000/api/v1/users/" + id, {
                method: "PUT",
                body: JSON.stringify(user),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => console.log(json));
        }
    }
    DeleteUser() {
        const id = document.getElementById("idUsuario").value;
        fetch("http://localhost:3000/api/v1/users/" + id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        console.log("Usuário excluido com sucesso");
    }
    isValidCPF(cpf) {
        if (typeof cpf !== 'string')
            return false;
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/))
            return false;
        cpf = cpf.split('');
        const validator = cpf
            .filter((digit, index, array) => index >= array.length - 2 && digit)
            .map(el => +el);
        const toValidate = pop => cpf
            .filter((digit, index, array) => index < array.length - pop && digit)
            .map(el => +el);
        const rest = (count, pop) => (toValidate(pop)
            .reduce((soma, el, i) => soma + el * (count - i), 0) * 10) % 11 % 10;
        var result;
        result = !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
        return result;
    }
    CalculateAge(birthdate) {
        var actualDate = new Date;
        var result = false;
        var age = actualDate.getFullYear() - birthdate.getFullYear();
        if (new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()) <
            new Date(actualDate.getFullYear(), birthdate.getMonth(), birthdate.getDate()))
            age--;
        if (age >= 18) {
            result = true;
        }
        return result;
    }
}
