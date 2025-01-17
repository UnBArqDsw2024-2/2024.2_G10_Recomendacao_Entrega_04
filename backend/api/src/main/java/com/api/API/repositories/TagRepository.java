package com.api.API.repositories;

import com.api.API.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface TagRepository extends JpaRepository<Tag, Integer> {
}
