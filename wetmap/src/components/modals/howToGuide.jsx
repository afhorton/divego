import "./siteSubmitter.css";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import AnchorIcon from "@mui/icons-material/Anchor";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import "./howToGuide.css";

const HowToGuide = (props) => {
  return (
    <div className="masterDiv">
      <div className="topRead">
        <div className="titleDiv">
          <h3>How to use Scuba SEAsons</h3>
        </div>

        <div className="mainBlurbDiv">
          <p>
            Welcome to Scuba SEAsons, this app is designed for divers who love to
            interact with animals
            <br></br><br></br>
            The anchor icons show you the locations of dive
            sites and heat map dots show you where an
            animal has been spotted there in the past. Heat dot intensity
            increasing with the more sightings in that location.
            <br></br><br></br>
            To see where specific creatures are pan the pictures carrousel at the top 
            and click on whichever you like. (one or multiple are possible) Please note 
            the photos do change based on where you have the map placed, and will update to 
            show you creatures available in that area. 
            <br></br><br></br>
            Clicking on an Anchor Icon will do one of two things. For grey icons 
            this represents a cluster of dive sites and will zoom in until the cluster will break apart.
            For the blue icons this is a dive site, a menu will pop up and show you all photos taken of creatures 
            at that site.
            <br></br><br></br>
            As you select sea creature the heatmap will update to show you roughly where the sea 
            creatures have been spotted (around a dive site normally). Additionally, there is a chart 
            at the bottom that appears and shows you in what month these sea creatues were spotted in 
            these locations.
            <br></br><br></br>
            Add your own dive sites and sea creature sitghting photos to help improve the app!
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
          <TravelExploreIcon></TravelExploreIcon>
        </div>

        <div className="rightA">
          <p>
            Click this icon to open the dive site search tool, the list of dive
            sites is limited to the area of the map you have on screen, moving
            the map will change the dive site list, start typing the name of the
            dive site you are looking for and the autocomplete will filter to
            your site, Select a dive site of your choice and the map will pan
            and zoom the the dive site and temporarily place yellow icon to
            indicate which site you have selected The yellow icon is to help
            find your specific site in more congested diving areas
          </p>
        </div>
      </div>

      <div className="diveSiteDiv">
        <div className="leftD">
          <AnchorIcon></AnchorIcon>
        </div>

        <div className="rightD">
          <p>
            Click this icon to toggle the dive site anchors on and off, this
            will allow you to see the heat dots more easily when needed.
          </p>
        </div>
      </div>

      <div className="photoDiv">
        <div className="leftP">
          <PhotoCameraIcon></PhotoCameraIcon>
        </div>

        <div className="rightP">
          <p>
            Click this icon to toggle the photo uploader window, in this window
            you can upload photos of the animals you have seen, the system will
            take the date the photo was taken as well as the GPS coordinates, if
            they are part of the photo, if not click the red pin icon to the
            right of the fields to open another map page to drop a pin. Doing so
            will generate a set of GPS cooridnates for you photo.
          </p>
        </div>
      </div>

      <div className="addSiteDiv">
        <div className="leftDS">
          <AddLocationAltIcon></AddLocationAltIcon>
        </div>

        <div className="rightDS">
          <p>
            Click this icon to toggle the add dive site window, in this window
            you can upload a photo from your dive site and it will pull the GPS
            coordinates, all you need to do is add the site name.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToGuide;
