import "../scss/source-card.scss";
import { FC } from "react";

interface SourceProps {
  source: string;
}

const SourceCard: FC<SourceProps> = ({ source }) => {
  return (
    <div className="source-card-wrapper">
      <div className="source-name">
        <p>{source.name}</p>
      </div>
      <div className="source-format">
        <p>Quality: {source.format}</p>
      </div>
      <div className="source-price">
        {source.price ? <p>{source.price}$</p> : <p>0$</p>}
      </div>
      <div className="source-link">
        <a href={source.web_url}>Link</a>
      </div>
    </div>
  );
};

export default SourceCard;
