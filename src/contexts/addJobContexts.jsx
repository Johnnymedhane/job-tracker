import { createContext, useContext, useState } from "react";
import { useJobs } from "./JobsContexts";


const AddJobContext = createContext();



function AddJobProvider({ children }) {

    const { niceToHaveCriteria } = useJobs();
    const rankList = niceToHaveCriteria.length; // Assuming this is the number of nice-to-have criteria

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [website, setWebsite] = useState("");
    const [connection, setConnection] = useState("");
    const [activityLog, setActivityLog] = useState("");
    const [selectedMustHave, setSelectedMustHave] = useState([]);
    const [rankedNiceToHave, setRankedNiceToHave] = useState([]); // Assuming 5 ranks for nice-to-have criteria
    const [isBlure, setIsBlure] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const handleMustHaveChange = (id) => {
        setSelectedMustHave((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleNiceToHaveChange = (newList) => {
        setRankedNiceToHave((prev) => {
            const updatedList = [ ...prev, newList].filter((item) => item !== ""); // Remove empty strings
            if (updatedList.length > rankList) {
                return updatedList.slice(-rankList); // Limit to the last 'rankList' items
            }
            return updatedList;
        });
        
        console.log("Ranked Nice to Have:", rankedNiceToHave);
    }// Limit to 5 ranks

    return (
        <AddJobContext.Provider value={{
            isBlure, setIsBlure,
            title, setTitle,
            company, setCompany,
            website, setWebsite,
            connection, setConnection,
            activityLog, setActivityLog,
            selectedMustHave, setSelectedMustHave,
            rankedNiceToHave, setRankedNiceToHave,
            successMessage, setSuccessMessage,
            handleMustHaveChange,
            handleNiceToHaveChange
        }}>
            {children}
        </AddJobContext.Provider>
    );
}

function useAddJobContext() {
    const context = useContext(AddJobContext);
    if (!context) {
        throw new Error("useAddJobContext must be used within an AddJobProvider");
    }
    return context;
}

export { AddJobProvider, useAddJobContext };