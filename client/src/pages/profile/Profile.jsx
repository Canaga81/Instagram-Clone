import "./profile.css";
import { Avatar, Button } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Post from "../../components/post/Post";

const Profile = () => {

  return (

    <div className="container">
      <div className="profile-page">
        <div className="profile-head">
          <div className="head-left">
            <Avatar
              src={"data:image/jpeg;base64,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"}
              sx={{ width: 150, height: 150 }}
            />
          </div>
          <div className="head-right">
            <div className="head-right-top">
              <span className="profile-page-username">LionelMessi</span>
              <div className="profile-page-buttons">
                <Button variant="contained" size="small">
                  Düzenle
                </Button>
                <button>
                  <SettingsOutlinedIcon />
                </button>
                <button>
                  <LogoutOutlinedIcon color="error" />
                </button>
              </div>
            </div>
            <div className="head-right-center">
              <div className="post-count">
                <b>1</b>
                <span>posts</span>
              </div>
              <div className="follower-count">
                <b>1</b>
                <span>followers</span>
              </div>
              <div className="following-count">
                <b>1</b>
                <span>followings</span>
              </div>
            </div>
            <div className="head-right-bottom">
              <b>Lionel Messi</b>
              <span>I am a footballer</span>
            </div>
          </div>
        </div>
        <div className="profile-body">
          <div className="profile-nav-tabs">
            <button className="active">
              <GridOnOutlinedIcon />
              <span>POSTS</span>
            </button>
            <button>
              <VideoLibraryOutlinedIcon />
              <span>VIDEOS</span>
            </button>
            <button>
              <BookmarkAddOutlinedIcon />
              <span>SAVE</span>
            </button>
            <button>
              <AccountBoxOutlinedIcon />
              <span>TAGGED</span>
            </button>
          </div>
          <div className="profile-post-grid">
            <div className="grid-post">
              <Post />
              <div className="like-icon-wrapper">
                <FavoriteIcon className="like-icon" />
                <b>1</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

}

export default Profile;