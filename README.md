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