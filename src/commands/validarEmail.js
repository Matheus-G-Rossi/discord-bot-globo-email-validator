const request = require("request");

const prefixCalcular = "+validarEmail";
let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// função pra testar se o email tem cadastro ou não
function validarEmail(message) {
        const args = message.content.slice(prefixCalcular.length).trim().split(' ');
        let email = args[0];
        console.log(email);
        const requestOptions = {
            uri: `http://login.globo.com/api/v1/usuarios/${email}`,
            method: 'GET',
        };
        if (args.length !== 1) {
            return message.channel.send("Comando usado de maneira errada. Segue o exemplo de utilização: +validarEmail {email}. Exemplo +validarEmail joao@gmail.com");
        }
    
        else if (!email.match(regex)) {
            return message.channel.send("Endereço de email inválido!");
        }
        else{
                request(requestOptions, (error, response) => {
                    if (error) {
                        return message.channel.send(error);
                    } else if (response.statusCode === 404) {
                        return message.channel.send("> :x: `Email sem cadastro na globo`");
                    } else if (response.statusCode === 200) {
                        return message.channel.send("> :white_check_mark:  `Email com cadastro na globo`");
                    }
                });}
        
}

module.exports = { validarEmail };