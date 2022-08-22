package com.cg.DrugsInfoService.repository;

import com.cg.DrugsInfoService.models.DrugsData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrugsRepository extends JpaRepository<DrugsData,String> {
}
