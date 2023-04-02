import "./photoMenu.css";

const handleDragStart = (e) => e.preventDefault();

const PhotoMenuListItem = (props) => {
  const { id, setAnimalVal, animalVal, name, photoURL } = props;

  const handleSelect = (name) => {
    if (animalVal.includes(name)) {
      setAnimalVal(animalVal.filter((item) => item !== name));
    } else {
      setAnimalVal([...animalVal, name]);
    }
  };

  return (
    <div key={id} className="pictureBoxA">
      <div
        className={animalVal.includes(name) ? "microsSelected" : "micros"}
      >
        <h4
          className={
            animalVal.includes(name)
              ? "animalLabelAreaSelected"
              : "animalLabelArea"
          }
        >
          {name}
        </h4>
      </div>
      <img
        src={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${photoURL}`}
        width="192px"
        height="108px"
        onDragStart={handleDragStart}
        onClick={() => handleSelect(name)}
        style={{
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          borderBottom: "1px grey solid",
          borderLeft: "1px grey solid",
          borderRight: "1px grey solid",
          objectFit: "cover"

        }}
      />
    </div>
  );
};

export default PhotoMenuListItem;
