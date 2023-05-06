package com.ssafy.dubengdublist.dto.community;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.dubengdublist.dto.contents.ContentsScriptRes;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class CommunityDetailScriptRes {

    private Long id;
    private String title;
    private String thumbnail;
    private String videoPath;
    private ZonedDateTime createdDate;
    private Long recordCommentCount;
    private Long recordLikeCount;
    private String nickname;
    private Long recordId;
    private List<ContentsScriptRes> scriptList;


    @QueryProjection
    public CommunityDetailScriptRes(Long id, String title, String thumbnail,String videoPath, ZonedDateTime createdDate, Long recordCommentCount, Long recordLikeCount, String nickname,Long recordId, List<ContentsScriptRes> scriptList) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.videoPath = videoPath;
        this.recordCommentCount =recordCommentCount;
        this.recordLikeCount = recordLikeCount;
        this.nickname = nickname;
        this.createdDate = createdDate;
        this.recordId = recordId;
        this.scriptList = scriptList;
    }

}