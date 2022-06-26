class UserService {
    AddUser() {
        var user;
        user.name = document.getElementById("name").value;
        user.cpf = document.getElementById("cpf").value;
        user.birthDate = new Date(document.getElementById("birthdate").value);
        user.email = document.getElementById("email").value;
        user.password = document.getElementById("password").value;
        user.address = document.getElementById("addres").value;
        user.number = document.getElementById("number").value;
        user.complement = document.getElementById("complement").value;
        user.city = document.getElementById("city").value;
        user.state = document.getElementById("state").value;
        user.country = document.getElementById("country").value;
        user.zipCode = document.getElementById("zipCode").value;
        var error = isValidCPF(user.cpf);
        error = validEmail.test(user.email);
        error = CalculateAge(user.birthDate);
        if (error == false) {
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
        var validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        function isValidCPF(cpf) {
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
            return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
        }
        function CalculateAge(date) {
            const DayBirthday = date.getDay();
            const monthBirthday = date.getMonth();
            const yearBirthday = date.getFullYear();
            let actualYear = new Date().getFullYear();
            let actualMonth = new Date().getMonth();
            let actualDay = new Date().getDate();
            var diferenceYears = actualYear - yearBirthday;
            if (new Date(actualYear, actualMonth + 1, actualDay) <
                new Date(actualYear, monthBirthday, DayBirthday)) {
                diferenceYears--;
            }
            if (diferenceYears >= 18)
                return true;
            return false;
        }
    }
    GetUsers() {
        fetch('http://localhost:3000/api/v1/users/')
            .then(res => res.json())
            .then(data => {
            console.clear();
            console.log(data);
        });
    }
}
