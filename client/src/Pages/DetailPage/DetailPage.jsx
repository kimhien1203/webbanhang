import { useEffect, useState } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
// shared component
import ProductList from "../../Shared/ProductList";
import { useUpdateCartMutation } from "../../store/services";
import { toast } from "react-toastify";

export default function DetailPage() {
  const [updateCart] = useUpdateCartMutation();
  // react-router-doom
  const data = useRouteLoaderData("root");
  // redux

  const {
    _id,
    category,
    img1,
    img2,
    img3,
    img4,
    long_desc,
    name,
    price,
    short_desc,
  } = useLoaderData();

  const [currentImg, setCurrentImg] = useState(img1);

  // make sure the first img get re-render if user chose related item
  useEffect(() => {
    setCurrentImg(img1);
  }, [img1]);

  const [quantity, setQuantity] = useState(1);

  // add cart hanlder
  const addCart = async (_id, quantity) => {
    try {
      const response = await updateCart({
        _id: _id,
        newQuantity: quantity,
      }).unwrap();

      if (response.error) throw new Error(response.error);

      toast.success("Added to cart");
    } catch (error) {
      console.log("error:", error);
    }
  };

  // modify long-desc
  const modifiedDesc = long_desc.replace(/\s*•\s*/g, "\n");
  const descArray = modifiedDesc.split("\n");

  return (
    <>
      <Container>
        <Row id="detail-container" className="flex-nowrap">
          <Col className="d-flex flex-column preview-wrapper" md="2" xl="2">
            <img
              onClick={() => setCurrentImg(img4)}
              className="preview-img"
              src={img4}
              alt=""
            />
            <img
              onClick={() => setCurrentImg(img3)}
              className="preview-img"
              src={img3}
              alt=""
            />
            <img
              onClick={() => setCurrentImg(img2)}
              className="preview-img"
              src={img2}
              alt=""
            />
            <img
              onClick={() => setCurrentImg(img1)}
              className="preview-img"
              src={img1}
              alt=""
            />
          </Col>
          <Col md="4" xl="4">
            <img className="img-fluid" src={currentImg} alt="" />
          </Col>
          <Col className="ps-3 d-flex flex-column justify-content-evenly">
            <h2>{name}</h2>
            <p className="fs-4">
              {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
            <p>{short_desc}</p>

            <h4>
              CATEGORY: <span className="opacity-75 fw-normal">{category}</span>
            </h4>
            <div className="d-flex align-items-center">
              <label
                className="d-flex align-items-center border-1"
                style={{ border: "1px solid black", padding: "4px 12px" }}
                htmlFor="quantity"
              >
                <input
                  className="border-0"
                  type="text"
                  readOnly={true}
                  name="quantity"
                  id="quantity"
                  placeholder={"QUANTITY"}
                />
                <div className="px-3 d-flex align-items-center">
                  <i
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity((prevState) => prevState - 1);
                      }
                    }}
                    className="fa-solid fa-chevron-left"
                  ></i>
                  <p className="px-2">{quantity ? quantity : 1}</p>
                  <i
                    onClick={() => {
                      setQuantity((prevState) => prevState + 1);
                    }}
                    className="fa-solid fa-chevron-right"
                  ></i>
                </div>
              </label>
              <button
                style={{ border: "none", borderRadius: "0px" }}
                className="btn bg-dark text-white"
                onClick={() => addCart(_id, quantity)}
              >
                Add to cart
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <p className="p-1 px-3 bg-dark text-white d-inline-block w-auto">
            DESCRIPTION
          </p>
          <h4 className="text-uppercase mt-2">product description</h4>
          <div className="w-50">
            {descArray.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>

          <h4 className="text-uppercase mt-2">related products</h4>
          <ProductList data={data} cate={category} />
        </Row>
      </Container>
    </>
  );
}