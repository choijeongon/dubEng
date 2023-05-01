package com.ssafy.dubengdublist.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
public class User extends Time{

    @Id
    private String id;
    private String email;
    private String nickname;
    private Boolean isActive;
    private String profileImage;
    private Boolean isPublic;
    private String roleType;
    private String description;
    private String landName;
    private Long recordCount;
    private Long IsVoted;
    private Long totalRecTime;

    public void updateDubKingUser(Long IsVoted){
        this.IsVoted = IsVoted + 1;
    }

}
