import { useEffect, useState } from "react";
import Show from "../components/Show";

const HomePage = () => {
  const [shows, setShows] = useState([]);

  const getData = async () => {
    let url = "https://api.tvmaze.com/search/shows?q=all";
    const data = await fetch(url);
    const parseData = await data.json();
    setShows(parseData);
  };
  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        Latest Shows
      </h1>

      <div className="container">
        <div className="row justify-content-center">
          {shows.map((show) => (
            <div className="col-md-6 col-lg-4 col-sm-12" key={show.show.id}>
              <Show
                id={show.show.id}
                genres={show.show.genres}
                language={show.show.language}
                title={show.show.name}
                summary={show.show.summary}
                imageUrl={show.show.image}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
