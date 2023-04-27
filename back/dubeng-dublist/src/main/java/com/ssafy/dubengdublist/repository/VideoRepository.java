package com.ssafy.dubengdublist.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.dubengdublist.dto.community.CommunitySearchRes;
import com.ssafy.dubengdublist.dto.contents.ContentsDetailRes;
import com.ssafy.dubengdublist.dto.contents.ContentsRecommendRes;
import com.ssafy.dubengdublist.entity.Script;
import com.ssafy.dubengdublist.entity.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Integer>, VideoRepositoryCustom {


    // member가 찜한 스토어 목록
    @Query("select new com.ssafy.dubengdublist.dto.contents.ContentsRecommendRes(v.id, v.title, v.thumbnail) from Video v where v.langType = :langType")
    Slice<ContentsRecommendRes> findAllByLangType(@Param("langType")String langType, Pageable pageable);

}
