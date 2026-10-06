const [, , method, route, ...arg] = process.argv;
const URL = "https://dummyjson.com";
if (method !== undefined && route !== undefined) {
  switch (method.toUpperCase()) {
    case "GET":
      const responseProduct = await fetch(`${URL}/${route}`);
      const products = await responseProduct.json();
      console.log(products);
      break;

    case "POST":
      if (arg.length === 3) {
        const [title, price, category] = arg;
        const numeroPrice = Number(price);

        if (Number.isNaN(numeroPrice)) {
          console.log("El precio debe ser un número");
          break;
        }
        const responseNewProduct = await fetch(`${URL}/products/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            price: numeroPrice,
            category,
          }),
        });
        const product = await responseNewProduct.json();
        console.log(product);
      } else {
        console.log("El POST necesita 3 argumentos(titulo,precio,categoria)");
      }
      break;

    case "DELETE":
      const responseDeleted = await fetch(`${URL}/${route}`, {
        method: "DELETE",
      });
      const deleted = await responseDeleted.json();
      console.log(deleted);
      break;

    default:
      console.log("No se ingreso el metodo correcto");
      break;
  }
} else {
  console.log("No se ingreso el metodo o la ruta");
}
