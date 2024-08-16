package com.example.recurringdepositservice.repository;

import com.example.recurringdepositservice.model.RecurringBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecurringBankRepository extends JpaRepository<RecurringBank, Long> {
}
