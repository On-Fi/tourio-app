import dbConnect from "@/db/connect.js";
import Place from "@/db/models/Place.js";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;


  // early return if the id ist not available
  if (!id) {
    return;
  }

  // the HTTP method "GET" to retrieve data from our server
  // the request is here so that the data from the server gets on the http://localhost:3000/places/${id} page 
  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(place);
  }

  // the HTTP method "PUT" to update/edit data on our server
  // the request is here so that the edit button on the http://localhost:3000/places/${id} page works
  if (request.method === "PUT") {
    const placeData = request.body;
    await Place.findByIdAndUpdate(id, placeData);

    response.status(200).json({ status: "Place updated!" });
  }

  // the HTTP method "DELETE" to delete data on our server
  // the request is here so that the delete button on the http://localhost:3000/places/${id} page works
  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: "Place deleted" });
  }
}
