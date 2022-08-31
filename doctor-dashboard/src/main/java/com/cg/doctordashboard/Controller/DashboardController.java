package com.cg.doctordashboard.Controller;

import com.cg.doctordashboard.Model.DrugsData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/dash")
public class DashboardController {

    @Autowired
    RestTemplate restTemplate;

    @RequestMapping("/{drugsname}")
    public DrugsData getDrugsData(@PathVariable("drugsname") String drugsname) {

        return restTemplate.getForObject("http://Drugs-Info-Service/drugs/drugsname/" + drugsname, DrugsData.class);
    }

    @RequestMapping("/all")
    public DrugsData[] getAllDrugsData() {
        ResponseEntity<DrugsData[]> response =
                restTemplate.getForEntity("http://Drugs-Info-Service/drugs/", DrugsData[].class);
        DrugsData[] drugsData = response.getBody();
        return (drugsData);
    }

    @PostMapping("/save")
    public ResponseEntity<DrugsData> saveDrugs(@RequestBody DrugsData drugsData) {

        //drugsData.setDrugId(sequenceGeneratorService.getSequenceNumber(DrugsData.SEQUENCE_NAME));
        //DrugsData savedDrugsData = drugService.saveDrugsData(drugsData);
        DrugsData drugsData1 = new DrugsData(drugsData.getDrugId(), drugsData.getDrugName(), drugsData.getDrugPrice(), drugsData.getDrugQuantity(), drugsData.getExpiryDate());
        DrugsData response =
                restTemplate.postForObject("http://Drugs-Info-Service/drugs/save", drugsData1, DrugsData.class);


        //DrugsData[] drugsData = response.getBody();
        return ResponseEntity.ok(response);
        //return (drugsData);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteDrugsData(@PathVariable("id") int drugId) throws Exception {

        if(drugId != 0){
        restTemplate.delete("http://Drugs-Info-Service/drugs/delete/" + drugId);
        return "Deleted Succesfully";
        }
        else{
            throw new Exception("No Id Found");
           // return "No Id found";
        }

    }

//    @PutMapping("/update/{id}")
//    public ResponseEntity<DrugsData> updateDrugsData(@RequestBody DrugsData drugsData,
//                                                     @PathVariable("id") int drugId) {
//        DrugsData drugsData1 = new DrugsData(drugsData.getDrugId(),
//                drugsData.getDrugName(), drugsData.getDrugPrice(), drugsData.getDrugQuantity(), drugsData.getExpiryDate());
//
//        //String URI_Update="http://Drugs-Info-Service/drugs/update/drugId"
//        DrugsData response = restTemplate.put
//                ("http://Drugs-Info-Service/drugs/update/" + drugId, drugsData1,DrugsData.class);
//        return ResponseEntity.ok(response);
//    }
    @PutMapping("/update/{id}")
    public DrugsData updateDrugsData(@RequestBody DrugsData drugsData,
                                                     @PathVariable("id") int drugId) {
        RequestEntity<DrugsData> request = RequestEntity
                .put("http://Drugs-Info-Service/drugs/update/"+drugId)
                .accept(MediaType.APPLICATION_JSON)
                .body(drugsData);
        ResponseEntity<DrugsData> response = restTemplate.exchange(request,DrugsData.class);
        DrugsData drugsData1=response.getBody();
        return drugsData1;
    }
}



