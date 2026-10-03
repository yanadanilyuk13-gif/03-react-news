import { useState } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import type { Article } from "../types/article";
import ArticleList from "./ArticleList";

interface ArticlesHttpResponse {
  hits: Article[];
}

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);

  const handleSubmit = async (topic: string) => {
    const response = await axios.get<ArticlesHttpResponse>(
      `https://hn.algolia.com/api/v1/search?query=${topic}`,
    );
    setArticles(response.data.hits);
  };

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
}
