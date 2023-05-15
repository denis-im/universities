import React from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  // code: string;
};

const Universities = (props: Props) => {
  const { code } = useParams();

  return (
    <div>
      <h3>Universities</h3>
      {code}
    </div>
  );
};

export default Universities;
