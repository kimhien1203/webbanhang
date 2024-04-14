import { useParams } from "react-router-dom";
import { useGetSingleOrderQuery } from "../../store/services";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import OtherBanner from "../../Shared/OtherBanner";

export default function OrderDetail() {
  const { orderId } = useParams();
  const { data, isLoading, isSuccess } = useGetSingleOrderQuery(orderId);

  let orderContent;
  let cartContent;

  if (isLoading) {
    orderContent = <h1>Loading...</h1>;
    cartContent = <h1>Loading...</h1>;
  } else if (isSuccess) {
    const { address, user, total, items } = data;

    const renderOrders = items.map((itemDetail) => {
      const { item, quantity } = itemDetail;

      return (
        <tr key={item._id}>
          <td>
            <img
              className="img-table"
              src={item.img1}
              alt={`${item.name}.jpg`}
            />
          </td>
          <td>{item.name}</td>
          <td>
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
              " VND"}
          </td>
          <td>{quantity}</td>
        </tr>
      );
    });

    cartContent = <tbody>{renderOrders}</tbody>;
    orderContent = (
      <>
        <p>Full Name : {user.userName}</p>
        <p>Address : {address}</p>
        <p>
          Total :{" "}
          {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}
        </p>
      </>
    );
  }

  console.log("orderId:", orderId);
  return (
    <>
      <OtherBanner bigTitle={"HISTORY"} smallTitle={"HISTORY"} />
      <Container className="py-4">
        <h5 className="py-3">Information Order</h5>
        <Row>{orderContent}</Row>
        <Row className="flex-nowrap">
          <Table id="cartTable" striped className="align-middle">
            <thead className="text-uppercase">
              <tr>
                <th>Image</th>
                <th>Name</th>

                <th>Price</th>
                <th>Count</th>
              </tr>
            </thead>
            {cartContent}
          </Table>
        </Row>
      </Container>
    </>
  );
}