import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import LeftPanel from "./LeftPanel";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import nothing from "../img/nothing.png";

function HomeVideos() {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });
  const User = useSelector((state) => state.user.user);
  const { user } = User;

  document.title = "Home - YouTube";

  useEffect(() => {
    document.body.style.backgroundColor = theme ? "#0f0f0f" : "#f9f9f9";
    setTimeout(() => setLoading(false), 1000);
  }, [theme]);

  useEffect(() => {
    const demoVideos = [
      {
        videoid: "demo1",
        Title: "Big Buck Bunny",
        videoURL: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnailURL: "https://img.youtube.com/vi/YE7VzlLtp-4/maxresdefault.jpg",
        uploader: "Demo Channel 1",
        videoLength: 596,
        views: 12000,
        uploaded_date: "2025-09-20",
      },
      {
        videoid: "demo2",
        Title: "Sintel Trailer",
        videoURL: "https://www.w3schools.com/html/movie.mp4",
        thumbnailURL: "https://www.w3schools.com/html/img_girl.jpg",
        uploader: "Demo Channel 2",
        videoLength: 888,
        views: 9500,
        uploaded_date: "2025-09-21",
      },
      {
        videoid: "demo3",
        Title: "YouTube Video Example",
        videoURL: "https://www.youtube.com/embed/GfZVc2Cl7TA",
        thumbnailURL: "https://www.w3schools.com/html/img_girl.jpg",
        uploader: "Demo Channel 3",
        videoLength: 300,
        views: 15000,
        uploaded_date: "2025-09-18",
      },
      {
        videoid: "demo4",
        Title: "Another Demo Video",
        videoURL: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnailURL: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        uploader: "Demo Channel 4",
        videoLength: 213,
        views: 20000,
        uploaded_date: "2025-09-15",
      },

      {
        videoid: "demo5",
        Title: "Sintel Trailer",
        videoURL: "https://www.w3schools.com/html/movie.mp4",
        thumbnailURL: "https://www.w3schools.com/html/img_girl.jpg",
        uploader: "Demo Channel 5",
        videoLength: 888,
        views: 9500,
        uploaded_date: "2025-09-21",
      },

      {
        videoid: "demo6",
        Title: "Sintel Trailer",
        videoURL: "https://www.w3schools.com/html/movie.mp4",
        thumbnailURL: "https://www.w3schools.com/html/img_girl.jpg",
        uploader: "Demo Channel 6",
        videoLength: 888,
        views: 9500,
        uploaded_date: "2025-09-21",
      },
   
    ];
    setVideos(demoVideos);
  }, []);

  if (videos.length === 0) {
    return (
      <>
        <Navbar />
        <LeftPanel />
        <div
          className="searched-content"
          style={{ marginTop: "80px", marginLeft: "240px" }}
        >
          <img src={nothing} alt="no results" className="nothing-found" />
          <p style={{ color: theme ? "#fff" : "#333" }}>No videos found!</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <LeftPanel />

      <style>{`
        .main-home-section {
          padding-top: 64px; /* navbar height */
          padding-left: 240px; /* left panel width */
          padding-right: 16px;
          padding-bottom: 16px;
          box-sizing: border-box;
          transition: padding 0.3s ease;
        }

        .grid-videos {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(2, 1fr);
        }

        .video-card {
          display: flex;
          flex-direction: column;
        }

        .video-thumbnail {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          border-radius: 12px;
        }

        .video-title {
          font-weight: bold;
          font-size: 14px;
          margin: 4px 0;
          color: ${theme ? "#fff" : "#1a1a1a"};
        }

        .video-uploader {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: ${theme ? "#ccc" : "#333"};
        }

        .video-views {
          font-size: 12px;
          color: ${theme ? "#aaa" : "#666"};
        }

        @media(max-width:1024px){
          .main-home-section {padding-left: 80px;}
        }

        @media(max-width:768px){
          .main-home-section {padding-left: 16px; padding-right: 16px;}
          .grid-videos {grid-template-columns: 1fr;}
          .video-title {font-size: 13px;}
        }

        @media(max-width:480px){
          .grid-videos {grid-template-columns: 1fr;}
          .video-title {font-size: 12px;}
        }
      `}</style>

      <div className="main-home-section">
        <div className="grid-videos">
          {videos.map((video) => (
            <div className="video-card" key={video.videoid}>
              {video.videoURL.includes("youtube.com/embed") ? (
                <iframe
                  width="100%"
                  height="180"
                  src={video.videoURL}
                  title={video.Title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-thumbnail"
                ></iframe>
              ) : (
                <video
                  src={video.videoURL}
                  controls
                  poster={video.thumbnailURL}
                  className="video-thumbnail"
                />
              )}
              <p className="video-title">{video.Title}</p>
              <div className="video-uploader">
                <span>{video.uploader}</span>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Verified"
                  placement="top"
                >
                  <CheckCircleIcon
                    fontSize="small"
                    style={{ color: "rgb(138, 138, 138)" }}
                  />
                </Tooltip>
              </div>
              <p className="video-views">
                {video.views >= 1e9
                  ? `${(video.views / 1e9).toFixed(1)}B`
                  : video.views >= 1e6
                  ? `${(video.views / 1e6).toFixed(1)}M`
                  : video.views >= 1e3
                  ? `${(video.views / 1e3).toFixed(1)}K`
                  : video.views}{" "}
                views •{" "}
                {Math.floor(
                  (new Date() - new Date(video.uploaded_date)) / 86400000
                )}{" "}
                days ago
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeVideos;
