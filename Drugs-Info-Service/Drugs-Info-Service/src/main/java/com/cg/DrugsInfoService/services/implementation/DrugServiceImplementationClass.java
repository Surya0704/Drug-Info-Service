package com.cg.DrugsInfoService.services.implementation;

import com.cg.DrugsInfoService.models.DrugsData;
import com.cg.DrugsInfoService.repository.DrugsRepository;
import com.cg.DrugsInfoService.services.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DrugServiceImplementationClass implements DrugService {

    @Autowired
    DrugsRepository drugsRepository;

    @Override
    public DrugsData saveDrugsData(DrugsData drugsData) {
        return drugsRepository.save(drugsData);
    }

    @Override
    public List<DrugsData> getAllDrugsData() {
        return drugsRepository.findAll();
    }

    @Override
    public Optional<DrugsData> findDrugsById(String drugId) {
        return drugsRepository.findById(drugId);
    }

    @Override
    public void deleteDrugsData(String drugId) {
        drugsRepository.deleteById(drugId);

    }
}
