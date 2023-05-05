package com.ssafy.dubengdublist.service;

import com.ssafy.dubengdublist.dto.community.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommunityService {

    public CommunityDubKingRes findDubKing(String langType, String userId);

    public Integer addDubKing(String userId, String votedId);

    public Page<CommunitySearchRes> findCommunitySearch(String langType, String title, Pageable pageable, List<Long> contentsSearch);

    public Page<CommunityDetailScriptRes> findCommunityDetail(String langType, Pageable pageable, Long recordId);

    public Page<CommunityCommentRes> findCommunityComment(Pageable pageable, Long recordId);

    public Integer addCommunityComment(String userId, Long recordId, CommunityDetailCommentReq communityDetailCommentReq);

    public Integer modifyCommunityComment(String userId, Long recordCommentId, CommunityDetailCommentReq communityDetailCommentReq);

    public Integer removeCommunityComment(String userId, Long recordCommentId, CommunityDetailCommentReq communityDetailCommentReq);

    public Integer addCommunityLike(String userId, Long recordId);

}
