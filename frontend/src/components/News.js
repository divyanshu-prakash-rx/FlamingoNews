import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const categories = [
  "top","business", "crime", "domestic", "education", "entertainment", "environment",
  "food", "health", "lifestyle", "other", "politics", "science",
  "sports", "technology", "tourism", "world"
];

const API_KEY = "pub_8140526b74857bc8aeafa0102f3e3746ede92";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("top");
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (selectedCategory = category, page = null) => {
    setLoading(true);
    try {
      let url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en&category=${selectedCategory}`;
      if (page) url += `&page=${page}`;
  
      const res = await fetch(url);
      const data = await res.json();
  
      if (data.status === "success") {
        setArticles(data.results);  
        setNextPage(data.nextPage || null);
      } else {
        console.error("API error:", data.results?.message || "Unknown error");
        setArticles([]);
        setNextPage(null);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };
  
const handleNextPage = () => {
  if (nextPage) {
    fetchNews(category, nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

  useEffect(() => {
    fetchNews(category);
  }, [category]);



  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 " style={
        { color: "white", fontSize: "2rem", fontWeight: "bold" }
      }> {category.charAt(0).toUpperCase() + category.slice(1)} Headlines</h2>

      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${cat === category ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => {
              setCategory(cat);
              setNextPage(null);
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p className="text-center">Loading...</p>}

      <div className="row">
        {articles.map((article, index) => (
          <div className="col-md-4" key={article.article_id || index}>
            <NewsItem
              title={article.title}
              description={article.description}
              imageUrl={article.image_url}
              newsUrl={article.link}
            />
          </div>
        ))}
      </div>

      {nextPage && !loading && (
        <div className="text-center mt-4">
          <button className="btn btn-dark" onClick={handleNextPage}>
            Next Page
          </button>
        </div>
      )}
    </div>
  );
}
