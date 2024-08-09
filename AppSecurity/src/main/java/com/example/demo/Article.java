package com.example.demo;



import com.fasterxml.jackson.annotation.JsonProperty;

public class Article {
    private String abstractText; // 'abstract' è una parola riservata, quindi usa 'abstractText'
    private String webUrl;
    private String imageUrl;

    // Getters e Setters
    public String getAbstractText() {
        return abstractText;
    }

    public void setAbstractText(String abstractText) {
        this.abstractText = abstractText;
    }

    public String getWebUrl() {
        return webUrl;
    }

    public void setWebUrl(String webUrl) {
        this.webUrl = webUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
