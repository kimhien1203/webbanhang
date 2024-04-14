import { Link, useLoaderData, Form } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Hotel() {
  const prdData = useLoaderData();

  const [pageOffSet, setPageOffSet] = useState(0);
  // make 6 per page is default
  const itemsPerPage = 3;

  const endOffSet = pageOffSet + itemsPerPage;
  const currentItems = prdData.slice(pageOffSet, endOffSet);
  const pageCount = Math.ceil(prdData.length / itemsPerPage);

  // render hotel list
  const renderProductList = currentItems.map((item) => {
    return (
      <tr key={item._id}>
        <td>
          <p className="id-col">{item._id}</p>
        </td>
        <td>
          <p>{item.name}</p>
        </td>
        <td>
          <p className="type-col">
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
              " VND"}
          </p>
        </td>
        <td>
          <img className="img-table" src={item.img1} alt={item.name} />
          {/* <p>image_link</p> */}
        </td>
        <td>
          <p>{item.category}</p>
        </td>
        <td>
          <p>{item.count}</p>
        </td>
        <td>
          <Form
            method="DELETE"
            className="form-btn"
            action={`${item._id}/delete`}
          >
            <button type="submit" className="btn btn-del">
              Delete
            </button>
          </Form>
          <Link to={`${item._id}`} type="button" className="btn btn-edit">
            Edit
          </Link>
        </td>
      </tr>
    );
  });

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % prdData.length;

    setPageOffSet(newOffset);
  };

  return (
    <>
      <section id="render_data">
        <div className="header">
          <h3>Danh sách sản phẩm</h3>
          <Link className="btn btn-submit" to={"add"}>
            Thêm sp
          </Link>
        </div>
        <div className="table_container main-shadow">
          <table>
            <thead>
              <tr>
                {/* <th style={{ width: "100px" }}> */}
                <th>
                  <p>ID</p>
                </th>
                <th style={{ width: "250px" }}>
                  <p>Name</p>
                </th>
                <th style={{ width: "150px" }}>
                  <p>Price</p>
                </th>
                <th>
                  <p>Image</p>
                </th>
                {/* <th style={{ width: "150px" }}> */}
                <th>
                  <p>Category</p>
                </th>
                <th>
                  <p>Count</p>
                </th>
                <th>
                  <p>Action</p>
                </th>
              </tr>
            </thead>
            <tbody>{renderProductList}</tbody>
          </table>
          <div className="pagnigate-container">
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              previousLabel="< Prev"
              nextLabel="Next >"
            />
          </div>
        </div>
      </section>
    </>
  );
}