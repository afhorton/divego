import "./siteSubmitter.css";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import AnchorIcon from "@mui/icons-material/Anchor";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import "./howToGuide.css";

const HowToGuide = (props) => {

  return (
    <div className="masterDiv">
      <div className="topRead">
        <div className="titleDiv">
          <h3>How to use DiveGo</h3>
        </div>

        <div className="mainBlurbDiv">
          <p>
            Welcome to DiveGo, this app is designed for divers who love to
            interact with animals<br></br>
            <br></br>
            The premise is simple, anchor icons show you the locations of dive
            sites and heat map dots show you where and at what time of year an
            animal has been spotted there in the past, with the dot intensity
            increasing with the more sightings in that month at a given location.<br></br>
            <br></br>
            Change the month by adjusting the month slider at the top of the
            page.<br></br>
            <br></br>
            Users submit photos of animals and dive sites they have seen/ been to
            and the app will capture the date that the photo was created and if the
            photo carries them, its GPS coordinates, if not an option is
            available to drop a pin at the location the photo was taken.
          </p>
        </div>
      </div>

      <div className="exploreDiv">
        <div className="leftE">
          <ExploreIcon></ExploreIcon>
        </div>

        <div className="rightE">
          <p>
            Click this icon to change the map to another location, type in the
            name of the city or town closest to where you want to search, hit
            enter and it will take you there.
          </p>
        </div>
      </div>

      <div className="animalDiv">
        <div className="leftA">
          <SearchIcon></SearchIcon>
        </div>

        <div className="rightA">
          <p>
            Click this icon to change what sea creature you are looking for, 
            this list is made up of creatures that already exist in the system, 
            so add new ones with your own photos to expand the list!
          </p>
        </div>
      </div>

      <div className="diveSiteDiv">
        <div className="leftD">
          <AnchorIcon></AnchorIcon>
        </div>

        <div className="rightD">
          <p>
            Click this icon to toggle the dive site anchors on and off, 
            this will allow you to see the heat dots more easily when needed.
          </p>
        </div>
      </div>

      <div className="photoDiv">
        <div className="leftP">
          <PhotoCameraIcon></PhotoCameraIcon>
        </div>

        <div className="rightP">
          <p>
            Click this icon to toggle the photo uploader window, 
            in this window you can upload photos of the animals you have seen, 
            the system will take the date the photo was taken as well as the GPS coordinates, 
            if they are part of the photo, if not click the red pin icon to the right of the fields to open another map page to drop a pin.
            Doing so will generate a set of GPS cooridnates for you photo.
          </p>
        </div>
      </div>

      <div className="addSiteDiv">
        <div className="leftDS">
          <AddLocationAltIcon></AddLocationAltIcon>
        </div>

        <div className="rightDS">
          <p>
            Click this icon to toggle the add dive site window, 
            in this window you can upload a photo from your dive site and it will pull the GPS coordinates, 
            all you need to do is add the site name.
          </p>
        </div>
      </div>



    </div>
  );
};

export default HowToGuide;
