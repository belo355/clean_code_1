import pgp from "pg-promise";
import { getAccount } from "./main";
import crypto from "crypto";

export async function requestRide(input: any) : Promise<any> {
  const outputGetAccount = await getAccount(input.passengerId);
  if(!outputGetAccount) throw new Error("Passageiro nao possui conta");
  if(!outputGetAccount.is_passenger) throw new Error("Passageiro motorista nao permitido criar corrida");
  const hasRideinProgressOutPut = await hasRideInProgress(outputGetAccount.account_id); 
  if(hasRideinProgressOutPut) throw new Error("Passageiro possui corrida em andamento");
  const rideId = await generateRide(outputGetAccount); 
  return rideId; 
}

async function hasRideInProgress(passengerId: string) {
  const connection = pgp()("postgres://postgres:admin@localhost:5432/");
	const [ride] = await connection.query("select * from ride where passenger_id =$1 and status != 'completed' limit 1" , [passengerId] ); 
	await connection.$pool.end();
	return ride; 
}

async function generateRide(input: any) {
  const connection = pgp()("postgres://postgres:admin@localhost:5432/");
  try{
    const rideId = crypto.randomUUID();
    const today = new Date(Date.now());
    await connection.query("insert into ride (ride_id, passenger_id, driver_id, status, fare, distance, from_lat, from_long, to_lat, to_long, date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", 
    [rideId, input.account_id, 'e8747b55-2c37-4028-a210-a918b143ed95', 'requested', 0, 0, input.from_lat, input.from_long, input.to_lat, input.to_long, today]); 
    // idDriver inicialmente mockado 
    return {rideId} 
  } finally {
    await connection.$pool.end();
  } 
}

export async function getRide(passengerId: string) { 
	const connection = pgp()("postgres://postgres:admin@localhost:5432/");
	const [ride] = await connection.query("select * from ride where ride_id =$1", [passengerId]); 
	await connection.$pool.end();
	return ride; 
}


