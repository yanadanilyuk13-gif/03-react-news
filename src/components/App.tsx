import { useState } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import type { Article } from "../types/article";
import ArticleList from "./ArticleList";
import { RotatingLines } from "react-loader-spinner";
import { fetchArticles } from "../services/articleService";

export function Example() {
  return (
    <RotatingLines
      visible={true}
      height="36"
      width="36"
      color="grey"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  const handleSubmit = async (topic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await fetchArticles(topic);
      setArticles(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
      {isLoading && <Example />}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
}
