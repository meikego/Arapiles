import React, {useEffect, useState} from "react";
import {Spin} from "antd";
import axios from "axios"
import PrimaryLayout from "../layouts/primaryLayout";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";

const Spinner = <LoadingOutlined className="page-spinner" spin />;

const Test = () => {
  const [data, setData] = useState(null);

  async function getImageData() {
    const res = await axios.get("http://localhost:1337/images/");
    setData(res["data"]);
  }

  useEffect(() => {
    getImageData();
  }, []);

  if(!data) {
    return(
      <PrimaryLayout>
        <Spin indicator={Spinner} />
      </PrimaryLayout>
    )
  } else {
    return(
      <PrimaryLayout>
        {
          data.map((image) => {
            return (
              <>
                <h1>{image.Title}</h1>
                <img alt={image.Title} src={process.env.GATSBY_FRONTEND_CMS_URI + image.Picture[0].formats.thumbnail.url}/>
                <p>{image.Picture[0].createdAt}</p>
              </>
            )
          })
        }
      </PrimaryLayout>
    )
  }
};

export default Test;
