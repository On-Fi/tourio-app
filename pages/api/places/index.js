import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  // the HTTP method "GET" to retrieve data from our server
  // the request is here so that the data from the server gets on the http://localhost:3000/ page 
  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);

  // the HTTP method "PUT" to update/edit data on our server
  // the request is here so that can be created and gets schown on the http://localhost:3000/ page 
  } else if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);

      response.status(201).json({ status: "Place added" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
