import { MongoClient, Db, Collection, ObjectId } from "mongodb"
import connect from "./connect";
import setupTestData from "./setupTestData"


/** 
 * CREATE OPERATIONS
 */
 
/*   
  // Create collection and document
  const users = db.collection("users")
  await users.insertOne({
    name: "Sue",
    age: 26,
    status: "pending"
  })  
  // All documents in the collection
  const all = await users.find({}).toArray()
  console.log(all);
  // Timestamp on the first document searching on the id object
  const first: any = all[0]
  console.log(new ObjectId(first._id).getTimestamp())

  // From mongoDB site tutorial
  const canvas = await collection.insertOne(
    { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
 ) */

 /* const canvasAll = await collection.find({}).toArray()
  console.log(canvasAll); */

 /* console.log(await collection.find( { item: "canvas" } ).toArray());
  
 
 await collection.insertMany([
  { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
  { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
  { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
])

const testMany = await collection.find( {} ).toArray();

console.log(testMany);
 */

(async function Tester() {
    const client = await connect();
    const db = client.db("day1ex1")
    const collection = db.collection("inventory")
    const status = await setupTestData(collection)

    //Add your play-around code here

    // insert one record
    await collection.insertOne(
        { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
    )

    // insert multible records
    await collection.insertMany([
        { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
        { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
        { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
    ])
// Close connection
    client.close()
})()
