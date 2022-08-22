package com.cg.DrugsInfoService.services;

import com.cg.DrugsInfoService.models.DrugsData;

import java.util.List;
import java.util.Optional;

public interface DrugService {
    DrugsData saveDrugsData(DrugsData drugsData);
    public List<DrugsData> getAllDrugsData();
    public Optional<DrugsData> findDrugsById(String drugId);

    // Optional<DrugsData> getDrugsById(String drugId);

    //    DrugsData updateDrugsData(DrugsData drugsData, String drugId);
    void deleteDrugsData(String drugId);
}
