import { signup } from "../src/main";
import { requestRide } from "../src/ride";

test("Deve criar uma corrida para passageiro disponivel", async function() {
  const inputSignup = {
    name: "Ana Beatriz", 
    email: `Ana.bea${Math.random()}@gmail.com`, 
    cpf: "00000030007", 
    isPassenger: true, 
    password: "123456"
  };   
  const inputPassenger = {
    passengerId: "e8747b55-2c37-4028-a210-a918b143ed95", 
    fromLat: "", 
    fromLong: "", 
    toLat: "", 
    toLong: ""
  } 
  const outputSignup = await signup(inputSignup); 
  const outputRide = await requestRide(outputSignup.accountId); 
  expect(outputRide).toBeDefined(); 
}); 


