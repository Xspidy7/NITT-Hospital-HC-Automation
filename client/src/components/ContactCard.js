import React from "react";
import { Card } from "antd";

const ContactCard = (props) => {
  const { Meta } = Card;
  return (
    <div className="col-lg-4 col-sm-6 my-5">
      <Card
        hoverable
        style={{
          width: 250,
        }}
        cover={
          <img
            alt="example"
            src={props.imageUrl}
            // style={{height: 200, width: "auto"}}
          />
        }
      >
        <div className="text-center" style={{fontSize: "2rem", fontFamily: "montserrat-bold, sans-serif"}}>
          <Meta
            title={props.name}
          />
        </div>
      </Card>
    </div>
  );
};

export default ContactCard;
