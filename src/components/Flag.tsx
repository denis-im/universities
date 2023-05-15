import React from "react";
import ReactCountryFlag from "react-country-flag";

type Props = {
  code: string;
  country: string;
};

const Flag: React.FC<Props> = ({ code, country }) => {
  return (
    <ReactCountryFlag
      className="emojiFlag"
      countryCode={code}
      style={{
        fontSize: "2em",
        lineHeight: "2em",
      }}
      aria-label={country}
      svg
    />
  );
};

export default Flag;
