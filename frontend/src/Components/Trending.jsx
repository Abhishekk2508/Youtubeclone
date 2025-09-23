import Navbar from "./Navbar";
import LeftPanel from "./LeftPanel";
import trendingImg from "../img/trending.jpg";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import nothing from "../img/nothing.png";

function Trending() {
  const backendURL = "http://localhost:3000";
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [menuClicked, setMenuClicked] = useState(() => {
    const menu = localStorage.getItem("menuClicked");
    return menu ? JSON.parse(menu) : false;
  });
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });
  const User = useSelector((state) => state.user.user);
  const { user } = User;

  document.title = "Trending - YouTube";

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = theme ? "#0f0f0f" : "#f9f9f9";
  }, [theme]);

  useEffect(() => {
    const toggleMenu = () => setMenuClicked((prev) => !prev);
    const menuButton = document.querySelector(".menu");
    const menuLightButton = document.querySelector(".menu-light");

    if (menuButton) menuButton.addEventListener("click", toggleMenu);
    if (menuLightButton) menuLightButton.addEventListener("click", toggleMenu);

    return () => {
      if (menuButton) menuButton.removeEventListener("click", toggleMenu);
      if (menuLightButton) menuLightButton.removeEventListener("click", toggleMenu);
    };
  }, []);

  const updateViews = async (id) => {
    try {
      await fetch(`${backendURL}/updateview/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getTrending = async () => {
      try {
        const response = await fetch(`${backendURL}/getvideos`);
        const data = await response.json();

        let publicVideos = [];
        if (data.videoData && data.videoData.length > 0) {
          publicVideos = data.videoData.flatMap((user) =>
            user.VideoData.filter((v) => v.visibility === "Public").map((v) => ({
              videoid: v._id?.$oid || v._id,
              Title: v.Title,
              videoURL: v.videoURL || "",
              thumbnailURL: v.thumbnailURL,
              uploader: v.uploader,
              videoLength: parseInt(v.videoLength?.$numberInt || v.videoLength || 0),
              views: parseInt(v.views?.$numberInt || v.views || 0),
              uploaded_date: v.uploaded_date,
              Description: v.Description,
            }))
          );
        }

        const demoVideos = [
          {
            videoid: "demo1",
            Title: "Demo Video 1",
            videoURL: "https://www.w3schools.com/html/mov_bbb.mp4",
            thumbnailURL: "https://www.w3schools.com/html/pic_trulli.jpg", 
            uploader: "Demo Channel 1",
            videoLength: 120,
            views: 1000,
            uploaded_date: "2025-09-20",
            Description: "This is a demo video description.",
          },
          {
            videoid: "demo2",
            Title: "Demo Video 2",
            videoURL: "https://www.w3schools.com/html/movie.mp4",
            thumbnailURL: "https://www.w3schools.com/html/img_girl.jpg",
            uploader: "Demo Channel 2",
            videoLength: 95,
            views: 500,
            uploaded_date: "2025-09-21",
            Description: "Another demo video for testing.",
          },
          {
            videoid: "demo3",
            Title: "Demo Video 3",
            videoURL: "https://www.w3schools.com/html/movie.mp4",
            thumbnailURL: "https://www.w3schools.com/html/img_chania.jpg",
            uploader: "Demo Channel 3",
            videoLength: 95,
            views: 500,
            uploaded_date: "2025-09-21",
            Description: "Another demo video for testing.",
          },
          {
            videoid: "demo4",
            Title: "Demo Video 4",
            videoURL: "https://youtu.be/GfZVc2Cl7TA?si=cs6qGInnYaug6nco",
            thumbnailURL: "https://img.youtube.com/vi/GfZVc2Cl7TA/maxresdefault.jpg",
            uploader: "Demo Channel 4",
            videoLength: 120,
            views: 1000,
            uploaded_date: "2025-09-20",
            Description: "This is a demo video description.",
          },
          {
            videoid: "demo5",
            Title: "Demo Video 5",
            videoURL: "https://www.w3schools.com/html/movie.mp4",
            thumbnailURL: "https://picsum.photos/id/1045/400/225",
            uploader: "Demo Channel 5",
            videoLength: 95,
            views: 500,
            uploaded_date: "2025-09-21",
            Description: "Another demo video for testing.",
          },
          {
            videoid: "demo6",
            Title: "Demo Video 6",
            videoURL: "https://www.w3schools.com/html/movie.mp4",
            thumbnailURL: "https://picsum.photos/id/1011/400/225",
            uploader: "Demo Channel 6",
            videoLength: 95,
            views: 500,
            uploaded_date: "2025-09-21",
            Description: "Another demo video for testing.",
          },

          {
            videoid: "demo7",
            Title: "Demo Video 7",
            videoURL: "https://www.w3schools.com/html/movie.mp4",
            thumbnailURL: "https://picsum.photos/id/1045/400/225", // desert
            uploader: "Demo Channel 4",
            videoLength: 90,
            views: 300,
            uploaded_date: "2025-09-22",
            Description: "Extra demo video with unique thumbnail.",
          },
          {
            videoid: "demo8",
            Title: "Demo Video 8",
            videoURL: "https://www.w3schools.com/html/movie.mp4",
            thumbnailURL: "https://picsum.photos/id/1050/400/225", // beach
            uploader: "Demo Channel 5",
            videoLength: 110,
            views: 700,
            uploaded_date: "2025-09-22",
            Description: "Extra demo video with unique thumbnail.",
          },

          {
            videoid: "demo9",
            Title: "Demo Video 9",
            videoURL: "https://www.w3schools.com/html/movie.mp4",
            thumbnailURL: "https://picsum.photos/id/1060/400/225", // lake
            uploader: "Demo Channel 6",
            videoLength: 105,
            views: 450,
            uploaded_date: "2025-09-22",
            Description: "Extra demo video with unique thumbnail.",
          },
          {
            videoid: "demo10",
            Title: "Demo Video 10",
            videoURL: "https://www.w3schools.com/html/movie.mp4",
            thumbnailURL: "https://picsum.photos/id/1070/400/225", // hills
            uploader: "Demo Channel 7",
            videoLength: 130,
            views: 900,
            uploaded_date: "2025-09-22",
            Description: "Extra demo video with unique thumbnail.",
          },
        ];

        const allVideos = publicVideos.length > 0 ? publicVideos : demoVideos;
        allVideos.sort((a, b) => b.views - a.views);

        setTrendingVideos(allVideos);
      } catch (error) {
        console.log("Error fetching trending:", error.message);
        setTrendingVideos([]);
      }
    };

    getTrending();
  }, []);

  if (trendingVideos.length === 0) {
    return (
      <>
        <Navbar />
        <LeftPanel />
        <div className="searched-content">
          <img src={nothing} alt="no results" className="nothing-found" />
          <p style={{ color: theme ? "#fff" : "#333" }}>
            No videos are currently trending!
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <LeftPanel />

      {/* Responsive CSS */}
      <style>{`
        .grid-videos {
          display: grid;
          gap: 16px;
          padding: 16px;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        .trending-video-wrapper {
          display: flex;
          flex-direction: column;
        }

        .trending-video-card {
          display: flex;
          flex-direction: column;
        }

        .trending-thumbnail {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          border-radius: 12px;
        }

        .trending-duration {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 2px 5px;
          border-radius: 3px;
          font-size: 12px;
        }

        .trending-video-texts {
          padding: 8px 0;
        }

        .trend-channel-name {
          display: flex;
          align-items: center;
          color: ${theme ? "#ccc" : "#333"};
        }

        .trend-channel-extras {
          display: flex;
          gap: 8px;
          font-size: 12px;
          color: ${theme ? "#aaa" : "#666"};
        }

        .trending-title {
          font-weight: bold;
          margin: 4px 0;
          font-size: 14px;
          color: ${theme ? "#fff" : "#1a1a1a"};
        }

        .trending-desc {
          color: ${theme ? "#ccc" : "#333"};
        }

        @media(max-width: 768px) {
          .grid-videos {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          }
          .trending-title {
            font-size: 13px;
          }
        }

        @media(max-width: 480px) {
          .grid-videos {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
          .trending-title {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="main-trending-section2">
        <div className="trending-top">
          <img src={trendingImg} alt="trending" className="trendingIMG" />
          <p style={{ color: theme ? "white" : "#1a1a1a" }}>Trending</p>
        </div>
        <hr className={theme ? "seperate seperate-three" : "seperate seperate-three seperate-light"} />

        <div className="trending-videos-section grid-videos">
          {trendingVideos.map((video, index) => (
            <div className="trending-video-wrapper" key={video.videoid}>
              <SkeletonTheme baseColor={theme ? "#353535" : "#aaaaaa"} highlightColor={theme ? "#444" : "#b6b6b6"}>
                <div
                  className="trending-video-data sk-trending-data"
                  style={loading ? { display: "flex" } : { display: "none" }}
                >
                  <Skeleton count={1} width={250} height={141} style={{ borderRadius: "12px" }} />
                  <div className="trending-video-texts sk-video-trend">
                    <Skeleton count={1} width={150} height={20} />
                    <Skeleton count={1} width={400} height={25} />
                    <Skeleton count={1} width={220} height={15} />
                  </div>
                </div>
              </SkeletonTheme>

              <div className="trending-video-card" style={loading ? { display: "none" } : { display: "flex", flexDirection: "column" }}>
                <video src={video.videoURL} controls poster={video.thumbnailURL} className="trending-thumbnail" />
                <p className="trending-duration">
                  {Math.floor(video.videoLength / 60)}:{(Math.round(video.videoLength % 60) < 10 ? "0" : "") + Math.round(video.videoLength % 60)}
                </p>
                <div className="trending-video-texts">
                  <p className={theme ? "trending-batch" : "trending-batch-light"} style={{ color: theme ? "#ccc" : "#666" }}>
                    TRENDING #{index + 1}
                  </p>
                  <p className="trending-title">{video.Title}</p>
                  <div className="trending-oneliner">
                    <div className="trend-channel-name">
                      <p className="t-channelname">{video.uploader}</p>
                      <Tooltip TransitionComponent={Zoom} title="Verified" placement="top">
                        <CheckCircleIcon fontSize="100px" style={{ color: "rgb(138, 138, 138)", marginLeft: "6px" }} />
                      </Tooltip>
                    </div>
                    <div className="trend-channel-extras">
                      <p className="t-views">
                        {video.views >= 1e9
                          ? `${(video.views / 1e9).toFixed(1)}B`
                          : video.views >= 1e6
                            ? `${(video.views / 1e6).toFixed(1)}M`
                            : video.views >= 1e3
                              ? `${(video.views / 1e3).toFixed(1)}K`
                              : video.views} views
                      </p>
                      <p className="t-uploaded-date">
                        &#x2022; {Math.floor((new Date() - new Date(video.uploaded_date)) / 86400000)} days ago
                      </p>
                    </div>
                  </div>
                  <p className="trending-desc">
                    {video.Description.length <= 140 ? video.Description : `${video.Description.slice(0, 80)}...`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Trending;
