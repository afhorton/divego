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

  console.log("getting", animalMultiSelection)

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

// const styles = StyleSheet.create({
//   tagBody:{
//     flexDirection: "row",
//     borderWidth: 1,
//     borderRadius: 10,
//     borderColor: "gold",
//     backgroundColor: "white",
//     height: 25,
//     marginRight: 5,
//     marginBottom: 5,
//   },
//   animalTag:{
//     flexDirection: "row",
//     marginTop: 1,
//     marginLeft: 3
//   },
//   xButton:{
//     marginTop: 1,
//     marginRight: 3,
//     marginBottom: 4
//   }
// });

export default AnimalTag;
