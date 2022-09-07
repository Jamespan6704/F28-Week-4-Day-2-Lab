let house = require("./db.json");
let globalID = 4;

module.exports = {
  getHouses: (req, res) => {
    res.status(200).send(house);
  },
  deleteHouse: (req, res) => {
    let index = house.findIndex((elem) => elem.id === +req.params.id);
    house.splice(index, 1);
    res.status(200).send(house);
  },
  createHouse: (req, res) => {
    const { address, price, imageURL } = req.body;
    let newHouse = {
      id: globalId,
      address,
      price,
      imageURL,
    };
    house.push(newHouse);
    res.status(200).send(house);
    globalID++;
  },
  updateHouse: (req, res) => {
    let { id } = req.params;
    let { type } = req.body;
    let index = house.findIndex((element) => element.id === +req.params.id);

    if (house[index].price <= 10000 && type === "minus") {
      house[index].price = 0;
      res.status(200).send(house);
    } else if (type === "plus") {
      house[index].price += 10000;
      res.status(200).send(house);
    } else if (type === "minus") {
      house[index].price -= 10000;
      res.status(200).send(house);
    } else {
      res.status(400);
    }
  },
};
