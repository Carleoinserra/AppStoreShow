package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NewsdataService {

    private final RestTemplate restTemplate;

    @Autowired
    public NewsdataService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ArrayList<Article> getLatestNews() {
        String url = "http://localhost:8080/api/articles"; // Assicurati che questo sia l'URL corretto
        
        try {
            // Esegui la richiesta GET
            ResponseEntity<NewsApiResponse> responseEntity = restTemplate.getForEntity(url, NewsApiResponse.class);
            
            // Controlla lo stato della risposta
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                NewsApiResponse response = responseEntity.getBody();
                
                // Ritorna la lista degli articoli se presenti
                if (response != null && response.getDocs() != null) {
                    return new ArrayList<>(response.getDocs()); // Converti la lista in ArrayList
                } else {
                    System.out.println("No articles found.");
                    return new ArrayList<>(); // Ritorna un ArrayList vuoto se non ci sono articoli
                }
            } else {
                System.out.println("Error: " + responseEntity.getStatusCode());
                return new ArrayList<>(); // Ritorna un ArrayList vuoto in caso di errore
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>(); // Ritorna un ArrayList vuoto in caso di eccezione
        }
    }
}
