import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "My first book",
    price: 450,
    description: "My first book",
  },
  {
    id: "p2",
    title: "My second book",
    price: 299,
    description: "My second book",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            price={product.price}
            id={product.id}
            key={product.id}
            title={product.title}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
