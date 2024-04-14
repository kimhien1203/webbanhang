import { useGetOrdersQuery } from "../../store/services";
// bootstrap
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import OtherBanner from "../../Shared/OtherBanner";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  const { data, isLoading, isSuccess } = useGetOrdersQuery();

  let content;

  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    const renderOrders = data.map((order) => {
      const { _id, user, address, status, delivery, total } = order;

      return (
        <tr key={_id}>
          <td className="td-wrap">
            <p>{_id}</p>
          </td>
          <td className="td-wrap">
            <p>{user._id}</p>
          </td>
          <td>{user.userName}</td>
          <td>{address}</td>
          <td>
            {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}
          </td>
          <td>{delivery}</td>
          <td>{status}</td>
          <td>
            <Link className="btn bg-black text-white" to={`/order/${_id}`}>
              View
            </Link>
          </td>
        </tr>
      );
    });

    content = <tbody>{renderOrders}</tbody>;
  }

  return (
    <>
      <OtherBanner bigTitle={"HISTORY"} smallTitle={"HISTORY"} />
      <Container className="py-4">
        <h5 className="py-3">ORDER HISTORY</h5>
        <Row className="flex-nowrap">
          <Table id="cartTable" striped className="align-middle">
            <thead className="text-uppercase">
              <tr>
                <th style={{ width: "70px" }}>ID Order</th>
                <th style={{ width: "70px" }}>ID User</th>
                <th>Name</th>
                <th>Address</th>
                <th>Toal</th>
                <th>Delivery</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            {content}
          </Table>
        </Row>
      </Container>
    </>
  );
}