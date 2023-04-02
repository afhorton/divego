import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./animalTag.css";

const AnimalTag = (props) => {
  const { animalMultiSelection, setAnimalMultiSelection, animalName } = props;

  const handleClearTag = async (text) => {
    if (animalMultiSelection && animalMultiSelection.includes(text)) {
      setAnimalMultiSelection(
        animalMultiSelection.filter((item) => item !== text)
      );
    }
  };

  return (
    <div className="tagBody" onClick={() => handleClearTag(animalName)}>
        <p
          style={{
            color: "#355D71",
            fontFamily: "Permanent Marker",
            fontSize: 12,
            marginRight: 10,
            marginLeft: 2,
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          {animalName}
        </p>
        <div className="xButton">
          <HighlightOffIcon
            sx={{ color: "gray", height: "14px", width: "14px" }}
          ></HighlightOffIcon>
        </div>
    </div>
  );
};

export default AnimalTag;
