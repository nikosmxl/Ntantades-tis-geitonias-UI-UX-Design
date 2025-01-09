import StyledSelect from "../StyledSelect/StyledSelect";
import MultiDropdownMenu from "../MultiDropdownMenu/MultiDropdownMenu"
import s from "./DropdownAreasStyle.module.css"

const DropdownAreas = ({areas, setAreas}) => {
    const cityOptions = [
        { value: "ΔΗΜΟΣ ΠΕΙΡΑΙΩΣ", label: "ΔΗΜΟΣ ΠΕΙΡΑΙΩΣ" },
        { value: "ΔΗΜΟΣ ΚΑΛΛΙΘΕΑΣ", label: "ΔΗΜΟΣ ΚΑΛΛΙΘΕΑΣ" },
        { value: "ΔΗΜΟΣ ΑΧΑΡΝΕΣ", label: "ΔΗΜΟΣ ΑΧΑΡΝΕΣ" },
    ];
    
    const cityNeighborhoods = {
        "ΔΗΜΟΣ ΠΕΙΡΑΙΩΣ": [
          { value: "Καμίνια", label: "Καμίνια" },
          { value: "Καλλίπολη", label: "Καλλίπολη" },
          { value: "Αγία Σοφία", label: "Αγία Σοφία" },
          { value: "Πειραϊκή", label: "Πειραϊκή" },
          { value: "Καστέλλα", label: "Καστέλλα" },
          { value: "Μανιάτικα", label: "Μανιάτικα" },
          { value: "Νέο Φάληρο", label: "Νέο Φάληρο" },
          { value: "Τερψιθέα", label: "Τερψιθέα" },
          { value: "Ταμπούρια", label: "Ταμπούρια" },
          { value: "Προφήτης Ηλίας", label: "Προφήτης Ηλίας" },
        ],
        "ΔΗΜΟΣ ΚΑΛΛΙΘΕΑΣ": [
          { value: "Τζιτζιφιές", label: "Τζιτζιφιές" },
          { value: "Αγία Ελεούσα", label: "Αγία Ελεούσα" },
          { value: "Ιππόδρομος", label: "Ιππόδρομος" },
          { value: "Χαροκόπου", label: "Χαροκόπου" },
          { value: "Μεταμόρφωση", label: "Μεταμόρφωση" },
          { value: "Λόφος Φιλαρέτου", label: "Λόφος Φιλαρέτου" },
        ],
        "ΔΗΜΟΣ ΑΧΑΡΝΕΣ": [
          { value: "Ολυμπιακό Χωριό", label: "Ολυμπιακό Χωριό" },
          { value: "Χαραυγή", label: "Χαραυγή" },
          { value: "Βαρυμπόμπη", label: "Βαρυμπόμπη" },
          { value: "Λαθέα", label: "Λαθέα" },
          { value: "Παλαιό Μενίδι", label: "Παλαιό Μενίδι" },
          { value: "Άγιος Πέτρος", label: "Άγιος Πέτρος" },
          { value: "Τατόι", label: "Τατόι" },
        ],
    };

    const handleCityChange = (index, selectedCity) => {
        const updatedAreas = [...areas];
        updatedAreas[index].city = selectedCity;
        updatedAreas[index].neighborhoods = []; // Reset τις γειτονιές όταν αλλάζει η πόλη
        setAreas(updatedAreas);
    };

    const handleNeighborhoodsChange = (index, selectedNeighborhoods) => {
        const updatedAreas = [...areas];
        updatedAreas[index].neighborhoods = selectedNeighborhoods;
        setAreas(updatedAreas);
    };

    const addArea = () => {
        if (
            areas.every(
                (area) => area.city !== null && area.neighborhoods.length > 0
            )
            &&
            areas.length < 3
        ) {
            setAreas([...areas, { city: null, neighborhoods: [] }]);
        }
    };

    const removeArea = () => {
        if (areas.length > 1) {
            setAreas(areas.slice(0, -1)); // Αφαιρεί το τελευταίο στοιχείο
        }
    };

    const getAvailableCityOptions = () => {
        const selectedCities = areas
            .map((area) => area.city?.value)
            .filter(Boolean); // Αφαίρεση null ή undefined
        return cityOptions.filter(
            (option) => !selectedCities.includes(option.value)
        );
    };

    return(
        <div className={s.dropdown_area_container}>
            <div className={s.areas}>
                {areas.map((area, index) => (
                    <div key={index} className={s.area_column}>
                        <div className={s.city_select}>
                            <StyledSelect
                                placeholder="Επιλέξτε Δήμο..."
                                options={getAvailableCityOptions()}
                                value={area.city}
                                onChange={(selectedOption) =>
                                    handleCityChange(index, selectedOption)
                                }
                            />
                        </div>
                        { area.city &&
                            <div className={s.neighborhoods_select}>
                                <MultiDropdownMenu
                                    options={
                                        area.city ? cityNeighborhoods[area.city.value] : []
                                    }
                                    selectedOptions={area.neighborhoods}
                                    setSelectedOptions={(selectedOptions) =>
                                        handleNeighborhoodsChange(index, selectedOptions)
                                    }
                                    placeholder="Επιλέξτε Γειτονιές..."
                                />
                            </div>
                        }
                    </div>
                ))}
            </div>
            <div className={s.actions}>
                <button onClick={removeArea} className={`${s.button} ${s.remove}`}>
                    Αφαίρεση Περιοχής
                </button>
                <button onClick={addArea} className={`${s.button} ${s.add}`}>
                    Προσθήκη Περιοχής
                </button>
            </div>
        </div>
    );
};

export default DropdownAreas;
