import React from "react";

export default function NewsItem({ title, description, imageUrl, newsUrl }) {
  const defaultImg = "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG5ld3xlbnwwfHx8fDE2OTYxNTQ1MjA&ixlib=rb-4.0.3&q=80&w=400";

  const truncate = (text = "", limit = 120) =>
    text?.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <div className="card my-3 shadow-sm rounded">
      <img
        src={imageUrl || defaultImg}
        className="card-img-top"
        alt="News"
        style={{ height: "191px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{truncate(title, 70)}</h5>
        <p className="card-text text-muted">{truncate(description, 140)}</p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-dark"
        >
          Read more
        </a>
      </div>
    </div>
  );
}
