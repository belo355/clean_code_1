Escopo
  ```sh
Tudo começa com a CRIAÇÃO DA CONTA, que pode ser feita pelo PASSAGEIRO ou pelo MOTORISTA ou ambos. 
É necessário informar o NOME, EMAIL, CPF, SENHA e a PLACA DO CARRO, caso seja o motorista. 
Não será permitido que o mesmo email tenha mais de uma conta, não existe restrição em relação ao CPF.
Após a CRIAÇÃO DA CONTA e o PASSAGEIRO pode SOLICITAR UMA CORRIDA informando a origem e o destino, que são coordenadas com latitude e longitude. 
Ao solicitar o passageiro não é cobrado e nem o valor da corrida é exibido já que ele será calculado apenas depois que a corrida for finalizada.
A CORRIDA ficará com o status de SOLICITADA e deve ser retornado o IDENTIFICADOR da corrida. Caso o PASSAGEIRO já tenha uma corrida não CONCLUÍDA, 
não deve ser possível SOLICITAR UMA CORRIDA.
Um MOTORISTA pode ACEITAR A CORRIDA que terá seu status modificado para ACEITA e o PASSAGEIRO fica no aguardo do MOTORISTA que aceitou a corrida. 
Após ACEITAR A CORRIDA o MOTORISTA não poderá aceitar qualquer outra corrida. Não deve ser possível ACEITAR UMA CORRIDA que não estiver com o status SOLICITADA.
Após o PASSAGEIRO entrar no carro o MOTORISTA deve INICIAR A CORRIDA, que terá seu status modificado para EM ANDAMENTO. 
Durante a CORRIDA, a cada minuto, é feita uma ATUALIZAÇÃO DA POSIÇÃO, registrando cada latitude e longitude do trajeto da CORRIDA.
Chegando ao destino o MOTORISTA deve ENCERRAR A CORRIDA, que agora terá o status de CONCLUÍDA. Com a lista de POSIÇÕES o valor da 
corrida deve ser calculado por meio da soma da distância entre cada uma delas, seguindo a seguinte tabela de preço:
    Dia normal entre 8 e 22 horas = R$2,10 por km
    Dia normal entre 22 e 8 horas = R$3,90 por km
    Domingo entre 8 e 22 horas = R$2,90 por km
    Domingo entre 22 e 8 horas = R$5,00 por km
  ```

Requisitos :
  ```sh
* nodejs 16+
* typescript jest @types/jest ts-node ts-jes
* npx tsc --init
  ```

Configs 
  ```sh
  tsconfig.json
    {
        "compilerOptions": {
        "incremental": true,
        "target": "es2016",
        "module": "commonjs",
        "outDir": "./dist",
        "strict": true,
        "esModuleInterop": true
        },
        "include": [
            "src",
            "test"
        ]
    }
  ```

Modelo de dados : 
  ```sh
create table account (
  account_id uuid,
  name text,
  email text,
  cpf text,
  car_plate text,
  is_passenger boolean,
  is_driver boolean,
  password text,
  password_algorithm text,
  salt text
);

create table ride (
  ride_id uuid,
  passenger_id uuid,
  driver_id uuid,
  status text,
  fare numeric,
  distance numeric,
  from_lat numeric,
  from_long numeric,
  to_lat numeric,
  to_long numeric,
  date timestamp
);

create table position (
  position_id uuid primary key,
  ride_id uuid,
  lat numeric,
  long numeric,
  date timestamp
);
  ```

Execucao dos testes 
  ```sh
  npx jest --watchAll 
  npx jest --watchAll --coverage
  ```