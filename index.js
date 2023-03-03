import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store"; // Added 6.3
import Navigo from "navigo"; // Added 6.3
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = new Navigo("/");

function render(st = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(st)}
    ${Nav(store.Links)}
    ${Main(st)}
    ${Footer()}
  `;
  // afterRender(st);
  router.updatePageLinks();
}

render();

router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    // Add a switch case statement to handle multiple routes
    switch (view) {
      case "Map":
        axios
          .get(
            `https://pro.openweathermap.org/data/2.5/forecast/daily?lat=38.627003&lon=-90.199402&cnt=16&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=imperial`
          )
          .then((response) => {
            //     console.log(`store.map.weather[${i}] =  response.data.weather[i]`);
            // }
            // store.Map.weather = {};
            // store.Map.forecast = response.data.list;
            let list = response.data.list;
            let safety = [];
            for (let i = 0; i < list.length; i++) {
              safety.push({
                temp: list[i].temp.day,
                precipitation: list[i].pop,
                descriptions: list[i].weather[0].description,
                speeds: list[i].speed,
                icons: list[i].weather[0].icon,
              });
            }
            console.log(safety);

            store.Map.safety = safety;
            store.Map.weather.city = response.data.city.name;

            console.log(list);

            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        break;
      default:
        done();
    }
  },
});

router.on("/", () => render(store.Home)).resolve();

router
  .on({
    "/": () => render(),
    ":view": (params) => {
      let view = capitalize(params.data.view);
      render(store[view]);
    },
  })
  .resolve();
