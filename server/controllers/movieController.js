import fetch from "node-fetch";

const movieController = {
  async fetchMovies(req, res) {
    try {
      const response = await fetch(process.env.URL, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error("HTTP error!: ");
      }
      const data = await response.json();
      res
        .status(200)
        .json({ data: data, message: "Fetch request Successful!" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error Catch" });
    }
  },
};

export default movieController;
