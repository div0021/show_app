import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

const BookingPage = () => {
  const { id } = useParams();
  const [showData, setShowData] = useState({});

  const getData = async () => {
    let url = `https://api.tvmaze.com/shows/${id}`;
    const data = await fetch(url);
    const parseData = await data.json();
    setShowData((prev) => {
      return {
        ...prev,
        ...parseData,
      };
    });
  };
  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, []);
  const [details, setdetails] = useState({
    name: "",
    email: "",
    date: "",
    timing: "",
    price: "",
  });
  const [appear, setAppear] = useState(false);
  const [display, setDisplay] = useState(false);
  const ref = useRef(null);

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setdetails((pre) => {
      return {
        ...pre,
        [key]: value,
      };
    });
    setAppear(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, schedule, timing, price, checkbox } = e.target;

    if (
      !name.value ||
      !email.value ||
      !schedule.value ||
      !timing.value ||
      !price.value
    ) {
      setAppear(true);
    } else {
      setdetails({
        name: "",
        email: "",
        date: "",
        timing: "",
        price: "",
      });
      setDisplay(false);
      setAppear(false);
      if (checkbox.checked) {
        const userDetails = JSON.stringify(details);
        localStorage.setItem("userDetails", userDetails);
      } else {
        if (localStorage.getItem("userDetails")) {
          localStorage.removeItem("userDetails");
        }
      }

      setTimeout(() => ref.current.click(), 1000);
    }
  };
  const careString = (text) => {
    let regex = /<p>|<b>|<\/p>|<\/b>/gi;

    const subText = text.replaceAll(regex, " ").replaceAll("\\s+", " ").trim();
    return subText;
  };
  return (
    <>
      {JSON.stringify(showData).length > 5 && (
        <div>
          <h1
            className="text-center"
            style={{ margin: "50px 0px", marginTop: "90px" }}
          >
            {showData.name}
          </h1>
          <div className="container" style={{ marginBottom: "50px" }}>
            <div className="row justify-content-evenly">
              <div className="col-md-6 col-lg-4 col-sm-12">
                <img
                  src={showData.image.original}
                  className="card-img-top"
                  alt="..."
                  style={{ borderRadius: "10px" }}
                />
              </div>

              <div className="col-md-6 col-lg-4 col-sm-12">
                <p style={{ fontSize: "18px" }}>
                  {careString(showData.summary)}
                </p>
                <div
                  className="container"
                  style={{
                    backgroundColor: "#f7f7f7",
                    borderRadius: "10px",
                    paddingTop: "16px",
                    paddingLeft: "2rem",
                  }}
                >
                  <h3>Show Info</h3>
                  <dl className="row">
                    <dt className="col-sm-4">Genres</dt>
                    <dd className="col-sm-8">
                      {showData.genres.map((el, index, array) => {
                        if (index !== array.length - 1) {
                          return <span key={index}>{el} | </span>;
                        } else {
                          return <span key={index}> {el}</span>;
                        }
                      })}
                    </dd>

                    <dt className="col-sm-4">Show Type</dt>
                    <dd className="col-sm-8">
                      <p>{showData.type}</p>
                    </dd>

                    <dt className="col-sm-4">Network</dt>
                    <dd className="col-sm-8">
                      {showData?.network?.name
                        ? showData.network.name
                        : "Currently Unavailable"}{" "}
                      ({showData.premiered.substring(0, 4)} -{" "}
                      {showData.ended ? showData.ended.substring(0, 4) : "now"})
                    </dd>

                    <dt className="col-sm-4 text-truncate">Status</dt>
                    <dd className="col-sm-8">{showData.status}</dd>

                    <dt className="col-sm-4">Offical site</dt>
                    <dd className="col-sm-8">
                      {showData?.network?.officialSite ? (
                        <a href={showData.network.officialSite}>
                          {showData.network.officialSite.substring(
                            8,
                            showData.network.officialSite.length - 1
                          )}
                        </a>
                      ) : (
                        <p>Currently Unavailable</p>
                      )}
                    </dd>
                    <dt className="col-sm-4">Episodes</dt>
                    <dd className="col-sm-8">
                      <p>
                        {showData.schedule.days.length > 0
                          ? showData.schedule.days[0]
                          : "none"}{" "}
                        at{" "}
                        {showData.schedule.time
                          ? showData.schedule.time
                          : "none"}{" "}
                        ({showData.runtime ? showData.runtime : "0"} min)
                      </p>
                    </dd>
                  </dl>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    data-bs-toggle="modal"
                    data-bs-target="#open_form"
                    onClick={() => {
                      setDisplay(true);
                      setAppear(false);
                      if (localStorage.getItem("userDetails")) {
                        const userDetails = JSON.parse(
                          localStorage.getItem("userDetails")
                        );
                        setdetails(userDetails);
                      }
                    }}
                  >
                    Book Ticket
                  </button>
                </div>

                <div
                  className="modal fade"
                  id="open_form"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          style={{ fontSize: "20px" }}
                          id="exampleModalLabel"
                        >
                          {showData.name}
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form id="booking1" onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="name" className="col-form-label">
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={details.name}
                              onChange={handleChange}
                              id="name"
                              placeholder="Enter your name..."
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                              Email address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={details.email}
                              onChange={handleChange}
                              aria-describedby="emailHelp"
                              placeholder="Enter your email..."
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="schedule"
                              className="col-form-label"
                            >
                              Schedule
                            </label>
                            <input
                              type="date"
                              name="date"
                              value={details.date}
                              onChange={handleChange}
                              className="form-control"
                              id="schedule"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="timing" className="col-form-label">
                              Timing
                            </label>
                            <select
                              className="form-select"
                              name="timing"
                              id="timing"
                              value={details.timing}
                              onChange={handleChange}
                              aria-label="Default select example"
                            >
                              <option defaultValue value="">
                                Select timing
                              </option>
                              <option value="11am">11AM</option>
                              <option value="3pm">3PM</option>
                              <option value="7pm">7PM</option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="price" className="col-form-label">
                              Price
                            </label>
                            <select
                              className="form-select"
                              name="price"
                              id="price"
                              value={details.price}
                              onChange={handleChange}
                              aria-label="Default select example"
                            >
                              <option defaultValue value="">
                                Select price
                              </option>
                              <option value="300">&#x20B9;300</option>
                              <option value="500">&#x20B9;500</option>
                            </select>
                          </div>

                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="flexCheckChecked"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckChecked"
                            >
                              Remember me
                            </label>
                          </div>
                          {appear && (
                            <div
                              id="emailHelp"
                              className="form-text text-danger"
                            >
                              All fields are required!
                            </div>
                          )}
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          id="complete"
                          form="booking1"
                          className="btn btn-primary"
                          data-bs-dismiss={!display ? "modal" : ""}
                          ref={ref}
                        >
                          Confirm Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingPage;
