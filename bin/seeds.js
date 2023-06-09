//Require Mongoose
const mongoose = require("mongoose");

// Require Book Model
const Beach = require("../models/Beach.model.js");

const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost/DidYouGoToTheBeachThisWeekend";

const beaches = [
  {
    name: "Praia da Ursa",
    description:
      "A Praia da Ursa é uma praia que se localiza perto do Cabo da Roca no concelho de Sintra, Portugal. Dada a proximidade ao cabo, é a praia mais ocidental da Europa. Foi considerada pelo Guia Michelin uma das praias mais bonitas do mundo. ",
    location: {
      lat: 38.790609,
      lng: -9.492303,
    },
    rating: 5,
  },
  {
    name: "Praia do Portinho da Arrábida",
    description:
      "Praia de areia e seixos com águas cristalinas para banhos e paddleboard, acessível por uma estrada de montanha.",
    location: {
      lat: 38.476852,
      lng: -8.984073,
    },
    rating: 5,
  },
  {
    name: "Praia de Monte Gordo",
    description:
      "O ambiente é do mais quente, seco e luminoso que se encontra no Algarve, e o mar é conhecido pela sua tranquilidade e calidez.Nas pequenas dunas que ainda se vão formando no setor mais movimentado da praia, só o cardo-marítimo, com os seus espinhos, resiste ao pisoteio constante. Nas extremas da praia, as dunas elevam-se e é possível apreciar a rica vegetação dunar ao longo dos passadiços sobrelevados que dão acesso ao areal.",
    location: {
      lat: 37.17755,
      lng: -7.451275,
    },
    rating: 4,
  },
  {
    name: "Praia da Salema",
    description:
      "Salema é uma localidade piscatória da freguesia de Budens, município de Vila do Bispo, Algarve, em Portugal. A povoação apresenta marcas visíveis da sua ligação às artes da pesca, com ruelas sinuosas entre casas tradicionais pintadas de um branco.",
    location: {
      lat: 37.0652222,
      lng: -8.824244444444444,
    },
    rating: 4,
  },
  {
    name: "Praia das Furnas",
    description:
      "Localiza-se na margem sul do Mira, tendo como cenário de fundo as praias da Franquia e do Farol e parte de Vila Nova de Milfontes.A partir de Vila Nova de Milfontes são dois os itinerários possíveis: pela ponte ou através de uma embarcação que, durante os meses de verão, assegura a ligação entre as duas margens.Oferece excelentes condições para os desportos náuticos.",
    location: {
      lat: 37.715361,
      lng: -8.786165,
    },
    rating: 4,
  },
  {
    name: "Praia da Pedra Alta",
    description:
      "A Praia da Pedra Alta tem uma beleza paisagistica singular. O areal encontra-se envolvido pela zona dunar existente, que se encontra protegida por passadiços de madeira.",
    location: {
      lat: 41.629063,
      lng: -8.82164,
    },
    rating: 4,
  },
  {
    name: "Praia da Baía",
    description:
      "Praia popular para surf e banhos, com bares e cafés em frente ao mar e vistas tranquilas do pôr do sol.",
    location: {
      lat: 41.007852,
      lng: -8.646319,
    },
    rating: 4,
  },
  {
    name: "Praia do Matadouro",
    description:
      "A praia do Matadouro situa-se perto Parque Campismo da Ericeira. É uma praia segura onde se formam muitas lagoas para as crianças bricarem e faz uma grande piscina na maré baixa.",
    location: {
      lat: 38.975616,
      lng: -9.420324,
    },
    rating: 4,
  },
];

async function insertBeaches() {
  try {
    let db = await mongoose.connect(MONGO_URI);
    // Feedback about the connection
    console.log(`Connected to Mongo Database: ${db.connections[0].name}`);
    // Create new documents inside books collection
    let beachesCreated = await Beach.create(beaches);
    // Feeback regarding to books creation
    console.log(`Created ${beachesCreated.length} beaches!`);
    // Closing the connection
    await mongoose.connection.close();
  } catch (error) {
    console.log("An error occurred while connecting to Db", error);
  }
}

insertBeaches();
