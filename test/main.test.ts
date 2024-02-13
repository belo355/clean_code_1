import { getAccount, signup } from "../src/main"

test.each([
  "00000030007", 
  "71428793860", //parametrizado 
  "87748248800"
])("Deve criar uma conta para o passageiro", async function (cpf: string) {
  const inputSignup = {
    name: "Ana Beatriz", 
    email: `Ana.bea${Math.random()}@gmail.com`, 
    cpf, 
    isPassenger: true, 
    password: "123456"
  }; 
  const outputSignup = await signup(inputSignup); 
  const outputGetAccount = await getAccount(outputSignup.accountId); 

  expect(outputSignup.accountId).toBeDefined(); 
  expect(outputGetAccount.name).toBe(inputSignup.name); 
  expect(outputGetAccount.email).toBe(inputSignup.email); 
}); 

test("Nao deve criar uma conta se o nome for invalido", async function () {
  const inputSignup = {
    name: "Ana", 
    email: `Ana.bea${Math.random()}@gmail.com`, 
    cpf: "00000030007", 
    isPassenger: true, 
    password: "123456"
  }; 
  await expect(() => signup(inputSignup)).rejects.toThrow(new Error("Invalid name")); 
}); 

test("Nao deve criar uma conta se o email for invalido", async function () {
  const inputSignup = {
    name: "Ana Beatriz", 
    email: `Ana.bea${Math.random()}gmail.com`, 
    cpf: "00000030007", 
    isPassenger: true, 
    password: "123456"
  }; 
  await expect(() => signup(inputSignup)).rejects.toThrow(new Error("Invalid email")); 
}); 

test.each([
  "", 
  undefined, 
  null, 
  "1111",
  "111111111", 
  "11111111111", 
  "111111111111111111"
])("Nao deve criar uma conta se o cpf for invalido", async function (cpf: any) {
  const inputSignup = {
    name: "Ana Beatriz", 
    email: `Ana.bea${Math.random()}@gmail.com`, 
    cpf,  
    isPassenger: true, 
    password: "123456"
  }; 
  await expect(() => signup(inputSignup)).rejects.toThrow(new Error("Invalid cpf")); 
}); 

test("Nao deve criar uma conta se o email for duplicado", async function () {
  const inputSignup = {
    name: "Ana Beatriz", 
    email: `Ana.bea${Math.random()}@gmail.com`, 
    cpf: "00000030007", 
    isPassenger: true, 
    password: "123456"
  }; 
  await signup(inputSignup); 
  await expect(() => signup(inputSignup)).rejects.toThrow(new Error("Duplicated account")); 
}); 

test("Deve criar uma conta para o motorista", async function () {
  const inputSignup = {
    name: "Ana Beatriz", 
    email: `Ana.bea${Math.random()}@gmail.com`, 
    cpf: "00000030007", 
    isPassenger: false,
    isDriver: true,  
    carPlate: "AAAA9999", 
    password: "123456"
  }; 
  const outputSignup = await signup(inputSignup); 
  const outputGetAccount = await getAccount(outputSignup.accountId); 

  expect(outputSignup.accountId).toBeDefined(); 
  expect(outputGetAccount.name).toBe(inputSignup.name); 
  expect(outputGetAccount.email).toBe(inputSignup.email); 
}); 

test("Nao deve criar uma conta para o motorista com a placa invalida", async function () {
  const inputSignup = {
    name: "Ana Beatriz", 
    email: `Ana.bea${Math.random()}@gmail.com`, 
    cpf: "00000030007", 
    isPassenger: false,
    isDriver: true,  
    carPlate: "AAAA999", 
    password: "123456"
  }; 
  await expect(() => signup(inputSignup)).rejects.toThrow(new Error("Invalid car plate")); 
});  