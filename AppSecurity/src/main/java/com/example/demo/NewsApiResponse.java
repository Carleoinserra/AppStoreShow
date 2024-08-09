package com.example.demo;


import java.util.ArrayList;
import java.util.List;



import java.util.ArrayList;

public class NewsApiResponse {
    public ArrayList<Article> docs;

    public ArrayList<Article> getDocs() {
        return docs;
    }

    public void setDocs(ArrayList<Article> docs) {
        this.docs = docs;
    }

    @Override
    public String toString() {
        return "NewsApiResponse{" +
                "docs=" + docs +
                '}';
    }
}


