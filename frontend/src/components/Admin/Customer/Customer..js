import React, { useState, useEffect } from "react";
import { Table, Button, notification } from "antd";
import axios from "axios";
import moment from "moment";

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

const AllProducts = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      await fetch("/api/auth/getUser")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoader(!loader);
        });
    })();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/auth/deleteUser/${id}`);
      notification.info({
        title: "Delete Form",
        message: "Successfully Delete Customer",
        placement: "top",
      });
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const filterData = data.filter((el) => el.type === "user");


  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => a.username.length - b.username.length,
      sortDirections: ["descend"],
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      sorter: (a, b) => a.contactNo.length - b.contactNo.length,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: "Date of Birth",
      render: (record) => (
        <div className="flex">
          <div>{moment(record.dateOfBirth).format("YYYY/MM/DD")}</div>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Action",
      render: (record) => (
        <div className="flex">
          <div>
            <Button
              style={{ background: "red", color: "white" }}
              onClick={() => deleteHandler(record._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ),
      width: 120,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filterData}
      onChange={onChange}
      loading={loader}
      sticky
    />
  );
};

export default AllProducts;
