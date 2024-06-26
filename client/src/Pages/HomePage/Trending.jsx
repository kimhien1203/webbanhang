import { useRouteLoaderData } from "react-router-dom";
import ProductList from "../../Shared/ProductList";
import Container from "react-bootstrap/Container";

// use for render trending section
export default function Trending() {
  const data = useRouteLoaderData("root");

  return (
    <Container className="py-5">
      <div className="d-flex align-items-start justify-content-center flex-column pb-5">
        <p className="opacity-75">MAKE THE HARD WAY</p>
        <p className="fs-2">TOP TRENDING PRODUCTS</p>
      </div>
      <ProductList data={data} cate={"trending"} />
    </Container>
  );
}