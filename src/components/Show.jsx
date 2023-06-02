import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const Show = (props) => {
  const { id, title, summary, imageUrl, language } = props;
  const navigate = useNavigate();

  const careString = (text) => {
    let regex = /<p>|<b>|<\/p>|<\/b>/gi;

    const subText = text.replaceAll(regex, " ").replaceAll("\\s+", " ").trim();
    return subText.substring(0, 99);
  };

  return (
    <div
      className="my-5 mx-auto"
      style={{ width: "20rem", height: "40rem", cursor: "pointer" }}
    >
      <div
        className="card"
        onClick={() => {
          navigate(`/booking/${id}`);
        }}
      >
        <img src={imageUrl.medium} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{careString(summary)} ..... </p>
          <p className="card-text">
            <small className="text-muted">
              Language:
              {language}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};
Show.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  summary: PropTypes.string,
  imageUrl: PropTypes.string,
  language: PropTypes.string,
};

export default Show;
