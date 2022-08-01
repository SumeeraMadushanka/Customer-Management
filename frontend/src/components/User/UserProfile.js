import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Spin,
  notification,
  DatePicker,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FileDoneOutlined, ContactsOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";

const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [contactNo, setContactno] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateofBirth] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const id = localStorage.getItem("id");

  useEffect(() => {
    (async () => {
      await axios
        .get(`/api/auth/getUserID/${id}`)
        .then((res) => {
          form.setFieldsValue({
            username: res.data.username,
            contactNo: res.data.contactNo,
            address: res.data.address,
            email: res.data.email,
          });
          setUsername(res.data.username);
          setContactno(res.data.contactNo);
          setAddress(res.data.address);
          setDateofBirth(res.data.dateOfBirth);
          setEmail(res.data.email);
        })
        .catch((err) => alert(err));
    })();
  }, []);

  const handleChange = (value) => {
    //handle the date picker value
    setDateofBirth(value);
  };

  const updateHandler = async (placement) => {
    // create handler for saving data to the db

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        //use axios API
        `/api/auth/updateUser/${id}`,
        {
          username,
          contactNo,
          address,
          dateOfBirth,
        },
        config
      );

      setTimeout(() => {
        //set a time out
        setConfirmLoading(true);
        notification.info({
          message: `Notification`,
          description: "Successfully Update details..",
          placement: "top",
        });
        setVisible(false);
      }, 2000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 2000);
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const [form] = Form.useForm();

  return (
    <>
      <Button
        className="w-20"
        onClick={() =>
          showModal(
            `/user-dashboard/${localStorage.getItem("username")}/profile/${id}`
          )
        }
      >
        Profile
      </Button>

      <Modal
        style={{ width: 500 }}
        title="My Account Details"
        visible={visible}
        onOk={() => {
          updateHandler();
          handleOk();
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {loader === false ? (
          <center>
            <Spin style={{ marginTop: "150px" }} />
          </center>
        ) : (
          <div className=" mt-20 -translate-x-36">
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              onFinish={() => updateHandler("top")}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{ width: "140%" }}
                  placeholder="Enter Username"
                  prefix={<FileDoneOutlined className="site-form-item-icon" />}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </Form.Item>
              <Form.Item
                name="contactNo"
                label="Contact No"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{ width: "140%" }}
                  placeholder="Enter Contact No"
                  prefix={<ContactsOutlined className="site-form-item-icon" />}
                  onChange={(e) => setContactno(e.target.value)}
                  value={contactNo}
                  type="number"
                />
              </Form.Item>
              <Form.Item
                name="dateOfBirth"
                label="Date of Birth"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "330px" }}
                  defaultValue={moment(Date(dateOfBirth))}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                  },
                ]}
                initialValue={address}
              >
                <TextArea
                  style={{ width: "450px" }}
                  placeholder="Enter Address"
                  onChange={(e) => setAddress(e.target.value)}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{ width: "140%" }}
                  prefix={<FileDoneOutlined className="site-form-item-icon" />}
                  disabled
                  type="email"
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserProfile;
