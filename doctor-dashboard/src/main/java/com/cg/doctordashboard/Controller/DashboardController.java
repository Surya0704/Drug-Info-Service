package com.cg.doctordashboard.Controller;

import com.cg.doctordashboard.Model.DrugsData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/dash")
public class DashboardController {

    @Autowired
    RestTemplate restTemplate;

    @RequestMapping("/{drugsname}")
    public DrugsData getDrugsData(@PathVariable("drugsname")String drugsname) {

        return restTemplate.getForObject("http://Drugs-Info-Service/drugs/drugsname/" + drugsname, DrugsData.class);
    }

    @RequestMapping("/all")
    public DrugsData[] getAllDrugsData(){
        ResponseEntity<DrugsData[]> response =
                restTemplate.getForEntity("http://Drugs-Info-Service/drugs/", DrugsData[].class);
        DrugsData[] drugsData = response.getBody();
        return (drugsData);
    }
}
