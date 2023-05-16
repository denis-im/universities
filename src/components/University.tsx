import React from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const University = (props: Props) => {
  const { uni } = useParams();

  return (
    <div>
      <h6>University</h6>
      {uni}
    </div>
  );
};

export default University;
