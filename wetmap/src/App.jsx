import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MapPage from "./components/MapPage";
import AuthenticationPage from "./components/authenticationPage";
import LoadingScreen from "./LoadingScreen";
import AdminPage from "./components/adminComponents/adminPage";
import "./App.css";
import { MasterContext } from "./components/contexts/masterContext";
import { SliderContext } from "./components/contexts/sliderContext";
import { AnimalContext } from "./components/contexts/animalContext";
import { ZoomContext } from "./components/contexts/mapZoomContext";
import { CoordsContext } from "./components/contexts/mapCoordsContext";
import { PinSpotContext } from "./components/contexts/pinSpotContext";
import { PinContext } from "./components/contexts/pinContext";
import { PicModalContext } from "./components/contexts/picModalContext";
import { JumpContext } from "./components/contexts/jumpContext";
import { DiveSitesContext } from "./components/contexts/diveSitesContext";
import { AdminContext } from "./components/contexts/adminContext";
import { PictureContext } from "./components/contexts/pictureContext";
import { GeoCoderContext } from "./components/contexts/geoCoderContext";
import { AnimalRevealContext } from "./components/contexts/animalRevealContext";
import { SelectedDiveSiteContext } from "./components/contexts/selectedDiveSiteContext";
import { SelectedPicContext } from "./components/contexts/selectPicContext";
import { LightBoxContext } from "./components/contexts/lightBoxContext";
import { SessionContext } from "./components/contexts/sessionContext";
import { sessionCheck, userCheck, sessionRefresh } from "./supabaseCalls/authenticateSupabaseCalls";

//DiveLocker

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [masterSwitch, setMasterSwitch] = useState(true);
  const [adminStat, setAdminStat] = useState(false);
  const [activeSession, setActiveSession] = useState(null);

  const d = new Date();
  const [sliderVal, setSliderVal] = useState(d.getMonth() + 1);
  const [animalVal, setAnimalVal] = useState("All");

  const [showGeoCoder, setShowGeoCoder] = useState(false);
  const [showAnimalSearch, setShowAnimalSearch] = useState(false);

  const [mapCoords, setMapCoords] = useState([49.316666, -123.066666]);
  const [dragPin, setDragPin] = useState({});

  useLayoutEffect(() => {
    window.onload = async function () {

      try {
        const valuless = await localStorage.getItem('token')
        const value = JSON.parse(valuless)
        if (value !== null){
          if(value.session.refresh_token){
            let newSession = await sessionRefresh(value.session.refresh_token)
            setActiveSession(newSession)
          }
        }
        let sessionID = await sessionCheck()
        await localStorage.removeItem('token')
      } catch(error) {
        console.log("no dice:", error)
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setMapCoords([position.coords.latitude, position.coords.longitude]);
            setAppIsReady(true);
          },
          function (error) {
            console.log("location permissions denied", error.message);
            setAppIsReady(true);
          },
          { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
        );
      } else {
        console.log("unsupported");
        setAppIsReady(true);
      }
    };
  }, []);

  const [mapZoom, setMapZoom] = useState(10);

  const [picModal, setPicModal] = useState(false);

  const [lightbox, setLightbox] = useState(false);
  const [selectedPic, setSelectedPic] = useState(null);

  const [jump, setJump] = useState(false);

  const [divesTog, setDivesTog] = useState(true);

  const [pin, setPin] = useState({
    PicFile: "",
    Animal: "",
    PicDate: "",
    Latitude: "",
    Longitude: "",
    UserId: ""
  });

  const [selectedDiveSite, setSelectedDiveSite] = useState({
    SiteName: "",
    Latitude: "",
    Longitude: "",
  });

  const [photoFile, setPhotoFile] = useState(null);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <LoadingScreen />;
  }

  return (
    <div className="App" onLoad={onLayoutRootView}>
      <LightBoxContext.Provider value={{lightbox, setLightbox}}>
        <SelectedPicContext.Provider value={{selectedPic, setSelectedPic}}>
          <SelectedDiveSiteContext.Provider
            value={{ selectedDiveSite, setSelectedDiveSite }}
          >
            <MasterContext.Provider value={{ masterSwitch, setMasterSwitch }}>
              <PinSpotContext.Provider value={{ dragPin, setDragPin }}>
                <AnimalRevealContext.Provider
                  value={{ showAnimalSearch, setShowAnimalSearch }}
                >
                  <GeoCoderContext.Provider
                    value={{ showGeoCoder, setShowGeoCoder }}
                  >
                    <PictureContext.Provider
                      value={{ photoFile, setPhotoFile }}
                    >
                      <AdminContext.Provider
                        value={{ adminStat, setAdminStat }}
                      >
                        <SliderContext.Provider
                          value={{ sliderVal, setSliderVal }}
                        >
                          <AnimalContext.Provider
                            value={{ animalVal, setAnimalVal }}
                          >
                            <ZoomContext.Provider
                              value={{ mapZoom, setMapZoom }}
                            >
                              <CoordsContext.Provider
                                value={{ mapCoords, setMapCoords }}
                              >
                                <PinContext.Provider value={{ pin, setPin }}>
                                  <PicModalContext.Provider
                                    value={{ picModal, setPicModal }}
                                  >
                                    <JumpContext.Provider
                                      value={{ jump, setJump }}
                                    >
                                      <DiveSitesContext.Provider
                                        value={{ divesTog, setDivesTog }}
                                      >
                                         <SessionContext.Provider
                                value={{ activeSession, setActiveSession }}
                                >
                                        <BrowserRouter>
                                          <Routes>
                                            <Route
                                              path="/"
                                              element={activeSession ? <MapPage/> : <AuthenticationPage/>}
                                            />
                                            <Route
                                              path="/admin"
                                              element={<AdminPage />}
                                            />
                                          </Routes>
                                        </BrowserRouter>

                                        </SessionContext.Provider>
                                      </DiveSitesContext.Provider>
                                    </JumpContext.Provider>
                                  </PicModalContext.Provider>
                                </PinContext.Provider>
                              </CoordsContext.Provider>
                            </ZoomContext.Provider>
                          </AnimalContext.Provider>
                        </SliderContext.Provider>
                      </AdminContext.Provider>
                    </PictureContext.Provider>
                  </GeoCoderContext.Provider>
                </AnimalRevealContext.Provider>
              </PinSpotContext.Provider>
            </MasterContext.Provider>
          </SelectedDiveSiteContext.Provider>
        </SelectedPicContext.Provider>
      </LightBoxContext.Provider>
    </div>
  );
}

export default App;
