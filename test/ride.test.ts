import { signup } from "../src/main";
import { getRide, requestRide } from "../src/ride";

test("Deve criar uma corrida para passageiro disponivel", async function() {
  const inputSignup = {
    name: "Ana Beatriz", 
    email: `Ana.bea${Math.random()}@gmail.com`, 
    cpf: "00000030007", 
    isPassenger: true, 
    password: "123456"
  };   
  const outputSignup = await signup(inputSignup); 
  const inputPassenger = {
    passengerId: outputSignup.accountId, 
    fromLat: 10, 
    fromLong: 10, 
    toLat: 20, 
    toLong: 20
  } 
  const outputRide = await requestRide(inputPassenger);
  const outputGetRide = await getRide(outputRide.rideId); 

  expect(outputRide).toBeDefined(); 
  expect(outputGetRide.ride_id).toBe(outputRide.rideId); 
  expect(outputGetRide.passenger_id).toBe(inputPassenger.passengerId); 
}); 

test("Nao deve criar uma corrida para um usuario do tipo motorista", async function() {
  const inputSignup = {
    name: "Ana Beatriz", 
    email: `Ana.bea${Math.random()}@gmail.com`, 
    cpf: "00000030007", 
    isPassenger: false, 
    password: "123456"
  };   
  const outputSignup = await signup(inputSignup); 
  const inputPassenger = {
    passengerId: outputSignup.accountId, 
    fromLat: 10, 
    fromLong: 10, 
    toLat: 20, 
    toLong: 20
  } 
  await expect(() => requestRide(inputPassenger)).rejects.toThrow(new Error("Passageiro motorista nao permitido criar corrida")); 
}); 

test("Nao deve criar uma corrida para um usuario nao cadastrado", async function() {
  const inputPassenger = {
    passengerId: "6b5cb7c2-1f9c-4038-8b44-7c36af1c10db", 
    fromLat: 10, 
    fromLong: 10, 
    toLat: 20, 
    toLong: 20
  } 
  await expect(() => requestRide(inputPassenger)).rejects.toThrow(new Error("Passageiro nao possui conta")); 
}); 

test("Nao deve criar uma nova corrida quando passageiro possuir outra em andamento", async function() {
  const inputSignup = {
    name: "Ana Beatriz", 
    email: `Ana.bea${Math.random()}@gmail.com`, 
    cpf: "00000030007", 
    isPassenger: true, 
    password: "123456"
  };   
  const outputSignup = await signup(inputSignup); 
  const inputPassenger = {
    passengerId: outputSignup.accountId, 
    fromLat: 10, 
    fromLong: 10, 
    toLat: 20, 
    toLong: 20
  } 
  await requestRide(inputPassenger);
  await expect(() => requestRide(inputPassenger)).rejects.toThrow(new Error("Passageiro possui corrida em andamento")); 
}); 




