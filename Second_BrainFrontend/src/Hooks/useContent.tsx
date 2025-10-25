import axios from "axios";
import { useEffect, useState } from "react";
import { Backend_URL } from "../config";

export function useContent() {
  const [content, setContent] = useState([]);

  async function fetchContent() {
    try {
      const response = await axios.get(`${Backend_URL}/api/v1/content`, {
      headers:{
        authorization:localStorage.getItem("token")
      },
      });
      setContent(response.data.content || []);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }

  useEffect(() => {
    fetchContent(); 
    const interval = setInterval(fetchContent, 5000); 
    return () => clearInterval(interval);
  }, []);

  return content;
}
