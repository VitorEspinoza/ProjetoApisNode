import { User } from "../models/user";

var name = (document.getElementById("name") as HTMLInputElement).value;
var cpf = (document.getElementById("cpf") as HTMLInputElement).value;
var birthdate = (document.getElementById("birthdate") as HTMLInputElement).value;
var email = (document.getElementById("email") as HTMLInputElement).value;
var password = (document.getElementById("password") as HTMLInputElement).value;
var addres = (document.getElementById("addres") as HTMLInputElement).value;
var number = (document.getElementById("number") as HTMLInputElement).value;
var complement = (document.getElementById("complement") as HTMLInputElement).value;
var city = (document.getElementById("city") as HTMLInputElement).value;
var state = (document.getElementById("state") as HTMLInputElement).value;
var country = (document.getElementById("country") as HTMLInputElement).value;
var zipCode = (document.getElementById("zipCode") as HTMLInputElement).value;



var error = isValidCPF(cpf);


error = validEmail.test(email);

if(error == false){

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
