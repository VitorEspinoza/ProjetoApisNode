class UserService {
     AddUser(){
        var user;

        user.name = (document.getElementById("name") as HTMLInputElement).value;
        user.cpf = (document.getElementById("cpf") as HTMLInputElement).value;
        user.birthDate = new Date((document.getElementById("birthdate") as HTMLInputElement).value);
        user.email = (document.getElementById("email") as HTMLInputElement).value;
        user.password = (document.getElementById("password") as HTMLInputElement).value;
        user.address = (document.getElementById("addres") as HTMLInputElement).value;
        user.number = (document.getElementById("number") as HTMLInputElement).value;
        user.complement = (document.getElementById("complement") as HTMLInputElement).value;
        user.city = (document.getElementById("city") as HTMLInputElement).value;
        user.state = (document.getElementById("state") as HTMLInputElement).value;
        user.country = (document.getElementById("country") as HTMLInputElement).value;
        user.zipCode = (document.getElementById("zipCode") as HTMLInputElement).value;
  
        var error = isValidCPF(user.cpf);
        
        error = validEmail.test(user.email);
        
        error = CalculateAge(user.birthDate);
        
        if(error == false){
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
            if (typeof cpf !== 'string') return false
            cpf = cpf.replace(/[^\d]+/g, '')
            if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
            cpf = cpf.split('')
            const validator = cpf
                .filter((digit, index, array) => index >= array.length - 2 && digit)
                .map( el => +el )
            const toValidate = pop => cpf
                .filter((digit, index, array) => index < array.length - pop && digit)
                .map(el => +el)
            const rest = (count, pop) => (toValidate(pop)
                .reduce((soma, el, i) => soma + el * (count - i), 0) * 10) % 11 % 10
            return !(rest(10,2) !== validator[0] || rest(11,1) !== validator[1])
        }
        
        function CalculateAge(date) {
            const DayBirthday = date.getDay();
            const monthBirthday = date.getMonth(); 
            const yearBirthday = date.getFullYear();
        
            let actualYear = new Date().getFullYear();
            let actualMonth = new Date().getMonth();
            let actualDay = new Date().getDate();
            
            var diferenceYears = actualYear - yearBirthday;
        
            if( new Date(actualYear, actualMonth + 1, actualDay) < 
                new Date(actualYear, monthBirthday, DayBirthday))
                {
                    diferenceYears--;  
                }   
            
                if (diferenceYears >= 18)
                    return true
        
                return false
        }
    }
    GetUsers() {
      
        const id = (document.getElementById("buscarPorId") as HTMLInputElement).value;
        const page = (document.getElementById("buscarPorPagina") as HTMLInputElement).value;
        console.log(id);
        console.log(page);
        console.log('http://localhost:3000/api/v1/users/?page=' + page)
        if (id != '') {
            console.log("ENTROU NO DO ID")
            fetch('http://localhost:3000/api/v1/users/' + id)
            .then(res => res.json())
            .then(data => {
            
            console.log(data);
        })
        }
        else if (page != '') {
            console.log("ENTROU NO DO PAGE")
            fetch('http://localhost:3000/api/v1/users/?page=' + page)
            .then(res => res.json())
            .then(data => {
            console.log(data);
        })
        }
        else {
            console.log("ENTROU NO DO Q FALTA")
            fetch('http://localhost:3000/api/v1/users/')
            .then(res => res.json())
            .then(data => {
            console.clear();
            console.log(data);
        });
        } 
        
    }
}

                