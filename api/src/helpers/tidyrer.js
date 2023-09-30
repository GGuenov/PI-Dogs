const tidyrer = async (data) => {
  let siguienteId = 0;
  const response = data.map((dog) => {
    let [weightMin, weightMax] = dog.weight.imperial.split(" - ");
    let [heightMin, heightMax] = dog.height.imperial.split(" - ");
    let temperament = dog.hasOwnProperty("temperament")
      ? dog.temperament.split(", ")
      : [];

    const image = dog.hasOwnProperty("reference_image_id")
      ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}`
      : "Default image URL";

    const lifeSpan = dog.hasOwnProperty("life_span")
      ? dog.life_span
      : "Unknown lifespan";

    siguienteId++;
    return {
      id: siguienteId,
      name: dog.name,
      weightMin: Number(weightMin),
      weightMax: Number(weightMax),
      heightMin: Number(heightMin),
      heightMax: Number(heightMax),
      temperament: temperament,
      lifeSpan: lifeSpan,
      image: image,
      source: "API",
    };
  });
  return response;
};

module.exports = { tidyrer };
