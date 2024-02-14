import pgp from "pg-promise";
import { getAccount } from "./main";
import crypto from "crypto";

export async function requestRide(accountId: string) {
  const outputGetAccount = await getAccount(accountId);
  if(!outputGetAccount.is_passenger) return false;  
  if(await hasRideInProgress(outputGetAccount.accountId)) return false; 
  const rideId = await generateRide(outputGetAccount); 
  return rideId; 
}

async function hasRideInProgress(passagerId: string) {
  const connection = pgp()("postgres://postgres:admin@localhost:5432/");
	const [ride] = await connection.query("select * from ride where passenger_id =$1 and status != 'completed'" , [passagerId]); 
	await connection.$pool.end();
	return ride; 
}

async function generateRide(input: any) {
  const connection = pgp()("postgres://postgres:admin@localhost:5432/");
  try{
    const rideId = crypto.randomUUID();
    const today = new Date(Date.now());
    await connection.query("insert into ride (ride_id, passenger_id, driver_id, status, fare, distance, from_lat, from_long, to_lat, to_long, date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", 
    [rideId, input.accountId, 'e8747b55-2c37-4028-a210-a918b143ed95', 'requested', 0, 0, input.from_lat, input.from_long, input.to_lat, input.to_long, today]); 
    // idDriver inicialmente mockado 
    return {rideId} 
  } finally {
    await connection.$pool.end();
  } 
}


